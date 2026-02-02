"use client";
import { useEffect, useMemo } from "react";
import { useIntroHintDisplay } from "./lib/use-intro-hint-display";

import { buildNavLinks, config } from "./config";
import { Panels } from "./ui/Panels";
import { IntroHintDisplay } from "./ui/IntroHintDisplay";
// import { atom, computed, effect, onMount } from "nanostores";
import type { Segment } from "@/common/api/client";
import { persistentAtom } from '@nanostores/persistent'
import { useStore } from "@nanostores/react";
import { toast } from "sonner";
import { fromMediaQuery } from '@nanostores/media-query'
import { action, atom, computed, effect, isInit, peek, reatomBoolean, reatomMediaQuery, reset, withActions, withComputed, withConnectHook, withLocalStorage } from '@reatom/core'
import { reatomComponent, reatomFactoryComponent } from '@reatom/react'
import Link from "next/link";
import { isVisible } from "@testing-library/user-event/dist/cjs/utils/index.js";
import { sortedPanels, sortWithActiveItem } from "./lib/sorted";
import { getPanels, Panel } from "./configuration";
import { SelectedPanel } from "./ui/SelectedPanel";
import { DisclosurePanel } from "./ui/DisclosurePanel";

type HintKey = Segment | 'intro'

const INTRO_HINT_KEY = 'intro'
export type NavigationHintIntroKey = typeof INTRO_HINT_KEY;
export type NavigationHintKey = Segment | NavigationHintIntroKey;

export const selectedSegmentLayout = atom<Segment | null>(null);


type HintDisplayMode = 'overlay' | 'inline';

const getHintText = (segment: Segment | null): string => {
  return segment ? config.panels[segment].hint : config.introHint
}


const reatomNavigatinModel = () => {

  const expanded = atom<Segment | null>(null).extend((target) => ({
    reset: () => target.set(null),
    toggle: (newValue: Segment | null) => {
      if (newValue === target()) {
        target.set(null)
      } else {
        target.set(newValue)
      }
    }
  }))

  const isMobile = reatomMediaQuery('(max-width: 600px)');

  const isBeenInRootRoute = reatomBoolean(false)

  const seenHintsPersist = atom<NavigationHintKey[]>([]).extend(
    withActions((target) => ({
      exist: (value: NavigationHintKey) => target().includes(value),
      write: (newValue: NavigationHintKey) => target.set([...target(), newValue]),
      isEmpty: () => target().length === 0
    }),
    ), withLocalStorage('seenHints'));


  const isVisible = reatomBoolean(false)

  const displayMode = computed<HintDisplayMode>(() => {
    const isRootRouteAndMobile = isMobile() && !selectedSegmentLayout()
    return isRootRouteAndMobile
      ? 'inline'
      : 'overlay'
  }, 'hintDisplayMode')

  const text = computed(() => getHintText(selectedSegmentLayout()), 'hintText')



  effect(() => {

    const selectedSegment = selectedSegmentLayout()
    const isRootRoute = !selectedSegment
    const persistKey = selectedSegment ?? INTRO_HINT_KEY
    const isSeenHint = seenHintsPersist.exist(persistKey)

    if (!isRootRoute) {

      if (isSeenHint) {
        return isVisible.setFalse()
      }
      seenHintsPersist.write(persistKey)
      return isVisible.setTrue()

    } else {

      const isSeenAnySegment = !seenHintsPersist.isEmpty()

      if (peek(isBeenInRootRoute) && isSeenAnySegment) {
        seenHintsPersist.write(persistKey)
      }

      if (isSeenHint) {
        return isVisible.setFalse()
      }

      isVisible.setTrue()

      if (!peek(isBeenInRootRoute)) {
        isBeenInRootRoute.setTrue()
      }
    }

  })


  return {
    selectedSegmentLayout,
    hint: { isVisible, displayMode, text },
    expanded,
  }
}




export const Navigation = reatomComponent(() => {

  const { selectedSegmentLayout, hint, expanded } = useMemo(reatomNavigatinModel, []);

  const selectedSegment = selectedSegmentLayout()

  const inlineMode = hint.displayMode() === 'inline';
  const overlayMode = hint.displayMode() === 'overlay';
  const isVisible = hint.isVisible();
  const text = hint.text();

  console.log(expanded())

  const sortedPanels = sortWithActiveItem({
    items: getPanels(),
    isActive: (segment) => segment.name === selectedSegment,
    move: {
      when: true,
      then: "start",
      else: "end",
    },
  });

  useEffect(() => {
    if (!overlayMode || !isVisible) return
    const id = toast(text)
  }, [
    selectedSegment,
    overlayMode,
    text,
    isVisible
  ]);

  return (
    <div id="nav-wrap" className="relative">
      <nav ref={undefined} id="nav-root">
        <ul id="nav-list" data-testid="nav-list" className="flex flex-col">
          {sortedPanels.map((panel) => {
            const isSelected = selectedSegment === panel.name
            const isExpanded = expanded() === panel.name
            return (
              <li key={panel.name} id="nav-panel" data-segment={panel.name}>
                {isSelected ? (
                  <SelectedPanel
                    isMobileDevice={true}
                    isSelected={isSelected}
                    segmentName={panel.name}
                    links={buildNavLinks(panel.name, panel.categories)}
                  />
                ) : (
                  <DisclosurePanel
                    segmentName={panel.name}
                    isExpanded={isExpanded}
                    onToggle={() => expanded.toggle(panel.name)}
                    links={buildNavLinks(panel.name, panel.categories)}
                  />
                )}
              </li>
            )
          })}
        </ul>
      </nav>
      <IntroHintDisplay text={text} isShow={inlineMode && isVisible} />
    </div>
  );
})

