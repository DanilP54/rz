"use client";

import { useSelectedLayoutSegment, usePathname, useParams } from "next/navigation";
import { useEffect, useEffectEvent, useMemo } from "react";
import { toastHintManager } from "./lib/toast-hint-manager";
import { useIntroHintDisplay } from "./lib/use-intro-hint-display";

import { config } from "./config";
import { Panels } from "./ui/Panels";
import { IntroHintDisplay } from "./ui/IntroHintDisplay";
import { atom, effect, onMount } from "nanostores";
import type { Segment } from "@/common/api/client";
import { persistentAtom } from '@nanostores/persistent'
import { useStore } from "@nanostores/react";
import { toast } from "sonner";
import { fromMediaQuery } from '@nanostores/media-query'

export const $isMobile = fromMediaQuery('(max-width: 600px)')

console.log($isMobile.value)
const storageHints = persistentAtom<Segment[]>('hints', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
})

const updateStorage = (newValue: Segment) => {
  storageHints.set([...storageHints.get(), newValue])
}

export const isBeenRootRzRoute = atom<boolean>(false)

const showToastHint = atom(false)
const showComponentHint = atom(false)

export const selected = atom<Segment | null>(null)
export const expanded = atom<Segment | null>(null)

const onToggle = (newValue: Segment | null) => {
  expanded.set(newValue)
}

effect(selected, (value) => {
    
  if(!isBeenRootRzRoute.value) {
      isBeenRootRzRoute.set(!value)
    } 

    if(!value) return
    
    if(!storageHints.get().includes(value)) {
      storageHints.set([...storageHints.get(), value])
    }
})


export const Navigation = ({ isMobileDevice }: { isMobileDevice: boolean }) => {

  const selectedSegment = useSelectedLayoutSegment() as Segment | null;
  const pathname = usePathname();

  const a = useStore(isBeenRootRzRoute)
  console.log(a)
  // const toast = toastHintManager();
  const displayIntroHint = useIntroHintDisplay(
    selectedSegment,
    isMobileDevice
  );

  useEffect(() => {
    // if(!s) return

    // if(!storageHints.get().includes(s)) {
    //   const hint = config.panels[s].hint
    //   toast(hint)
    //   storageHints.set([...storageHints.get(), s])
    // }
  }, [selectedSegment])

  useEffect(() => {
    if (displayIntroHint.asToast) {
      // toast.show(config.intro.text);
    }
  }, [displayIntroHint.asToast]);

  return (
    <div id="nav-wrap" className="relative">
      <Panels
        config={config}
        currentPathname={pathname}
        selectedRouteSegment={selectedSegment}
        isMobileDevice={isMobileDevice}
      />
      {displayIntroHint.asComponent && (
        <IntroHintDisplay text={config.introHint} />
      )}
    </div>
  );
};
