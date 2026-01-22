"use client";
import { NavSegments } from "@/common/model/routes";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { useEffect } from "react";
import { toastHintManager } from "./lib/_toast-hint-manager";
import { useIntroHintDisplay } from "./lib/_use-intro-hint-display";

import { config } from "./config/_config";
import { Panels } from "./ui/_panels";
import { IntroHintDisplay } from "./ui/_intro-hint-display";

export const Navigation = ({ isMobileDevice }: { isMobileDevice: boolean }) => {

  const selectedRouteSegment = useSelectedLayoutSegment() as Nullable<NavSegments>;
  const pathname = usePathname();

  const toast = toastHintManager();
  const displayIntroHint = useIntroHintDisplay(
    selectedRouteSegment,
    isMobileDevice
  );
  
  useEffect(() => {
    if (displayIntroHint.asToast) {
      toast.show(config.intro.text);
    }
  }, [displayIntroHint.asToast]);

  return (
    <div id="nav-wrap" className="relative">
      <Panels
        config={config}
        currentPathname={pathname}
        selectedRouteSegment={selectedRouteSegment}
        isMobileDevice={isMobileDevice}
      />
      {displayIntroHint.asComponent && (
        <IntroHintDisplay text={config.intro.text} />
      )}
    </div>
  );
};
