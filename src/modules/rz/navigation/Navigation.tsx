"use client";
import { useEffect, useState } from "react";
import { buildNavLinks, config } from "./config";

// import { atom, computed, effect, onMount } from "nanostores";
import type { Segment } from "@/common/api/client";
import { persistentAtom } from '@nanostores/persistent'

import { toast } from "sonner";
import { fromMediaQuery } from '@nanostores/media-query'


import { sortWithActiveItem } from "./lib/sorted";
import { getPanels, Panel } from "./configuration";
import { SelectedPanel } from "./ui/SelectedPanel";
import { DisclosurePanel } from "./ui/DisclosurePanel";
import { useSelectedLayoutSegment } from "next/navigation";



type HintKey = Segment | 'intro'
const INTRO_HINT_KEY = 'intro'
export type NavigationHintIntroKey = typeof INTRO_HINT_KEY;
export type NavigationHintKey = Segment | NavigationHintIntroKey;


type HintDisplayMode = 'overlay' | 'inline';

const getHintText = (segment: Segment | null): string => {
  return segment ? config.panels[segment].hint : config.introHint
}

export const $hint = persistentAtom<NavigationHintKey[]>('hint', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
})


export const Navigation = () => {

  const isMobile = fromMediaQuery('(max-width: 600px)')

  const selectedPanel = useSelectedLayoutSegment() as Segment | null
  const disclosure = useDisclosure()
  const hint = useNavigationHint(selectedPanel, isMobile.get())

  const sortedPanels = sortWithActiveItem({
    items: getPanels(),
    isActive: (segment) => segment.name === selectedPanel,
    move: {
      when: true,
      then: "start",
      else: "end",
    },
  });

  return (
    <div id="nav-wrap" className="relative">
      <nav ref={undefined} id="nav-root">
        <ul id="nav-list" data-testid="nav-list" className="flex flex-col">
          {sortedPanels.map((panel) => {
            const isSelected = selectedPanel === panel.name
            const isExpanded = opened === panel.name
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
                    onToggle={disclosure.toggle}
                    links={buildNavLinks(panel.name, panel.categories)}
                  />
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {hint.mode === 'inline' && hint.isVisible && (
        <InlineHint message={hint.message} />
      )}

      {hint.mode === 'overlay' && hint.isVisible && (
        <ToastHint message={hint.message} onClose={hint.close} />
      )}

    </div>
  );
}

export const ToastHint = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const id = toast(message, { onDismiss: onClose })
    return () => {
      toast.dismiss(id)
    }
  }, [message])

  return null
}

export const InlineHint = ({ message }: { message: string }) => {
  return (
    <div className={`absolute top-0 flex h-[120px] items-center right-0 w-[calc(100%-35px)]`}>
      <div className="flex items-center justify-center text-center px-3">
        <span className="grow font-bold text-xs">{message}</span>
      </div>
    </div>
  )
}



export const useNavigationHint = (
  selected: Segment | null,
  isMobile: boolean
) => {
  const [forcedVisible, setForcedVisible] = useState(false)

  const key: HintKey = selected ?? 'intro'

  const mode: HintDisplayMode =
    !selected && isMobile ? 'inline' : 'overlay'

  const message = getHintText(selected)

  const seen = $hint.get()

  const hasSeenThis = seen.includes(key)

  const hasSeenAnySegment = seen.some(k => k !== 'intro')

  const shouldAutoShow = !hasSeenThis

  const isVisible = forcedVisible || shouldAutoShow

  useEffect(() => {
    // SEGMENT — сохраняем сразу
    if (selected && !hasSeenThis) {
      $hint.set([...$hint.get(), key])
      return
    }

    // INTRO — сохраняем только если видели сегменты
    if (!selected && !hasSeenThis && hasSeenAnySegment) {
      $hint.set([...$hint.get(), 'intro'])
    }

  }, [key])

  const open = () => setForcedVisible(true)
  const close = () => setForcedVisible(false)
  const toggle = () => setForcedVisible(v => !v)

  return {
    key,
    mode,
    message,
    isVisible,
    open,
    close,
    toggle,
    hasSeen: hasSeenThis,
    hasSeenAnySegment,
  }
}


const useDisclosure = () => {
  const [opened, setOpened] = useState<Segment | null>(null)

  const toggle = (segmentName: Segment | null) => {
    const newValue = value === opened ? null : value
    setOpened(newValue)
  }

  const open = (segmentName: Segment | null) => {
    setOpened(segmentName)
  }

  const close = () => {
    setOpened(null)
  }

  return {
    opened,
    toggle,
    open,
    close
  }
}






<Navigation>
  <Navigation.Panel>
    <Navigation.Selected />
    <Navigation.Disclosure />
  </Navigation.Panel>
</Navigation>

