import { NavSegments } from "@/shared/model/routes";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";
import { useEffect } from "react";
import { toastHintManager } from "./lib/_toast-hint-manager";
import { useIntroHintDisplay } from "./lib/_use-intro-hint-display";

import { config } from "./_config";
import { Panels } from "./_panels";
import { IntroHintDisplay } from "./_intro-hint-display";

export const Navigation = ({ isMobileDevice }: { isMobileDevice: boolean }) => {

  const selectedRouteSegment = useSelectedLayoutSegment() as Nullable<NavSegments>;
  const pathname = usePathname();

  const toast = toastHintManager();
  const displayIntroHint = useIntroHintDisplay(
    selectedRouteSegment,
    isMobileDevice
  );
  
  useEffect(() => {
    // отвечает за отображение интро-подсказки в toast
    if (displayIntroHint.asToast) {
      toast.show(config.intro.text);
    }
  }, [displayIntroHint.asToast]);

  return (
    <div  id="nav-wrap" className="relative">
      <Panels 
        config={config} 
        currentPathname={pathname} 
        selectedRouteSegment={selectedRouteSegment} 
        isMobileDevice={isMobileDevice} 
      />
      {displayIntroHint.asComponent && (<IntroHintDisplay text={config.intro.text} />)}
    </div>
  );
};