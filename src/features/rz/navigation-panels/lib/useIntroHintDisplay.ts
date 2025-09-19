import {useEffect, useRef, useState} from "react";
import {useHintsStorage} from "@/features/rz/navigation-panels/lib/useHintsStorage";
import {RZ_SEGMENTS} from "@/shared/model/routes";

export const useIntroHintDisplay = (
    activeRouteSegment: Nullable<RZ_SEGMENTS>,
    isMobile: boolean
) => {
    const [showComponent, setShowComponent] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const isBeenIndexRoute = useRef(false)

    const storage = useHintsStorage();

    const isIndexRoute = () => {
        return !activeRouteSegment
    }

    useEffect(() => {

        if (storage.isSeen('intro')) return

        if (isIndexRoute()) {
            isBeenIndexRoute.current = true;
        }

        if (isMobile) {
            if (isIndexRoute()) setShowComponent(true);
            else {
                setShowComponent(false);
                if (isBeenIndexRoute.current) {
                    storage.save('intro')
                }
            }
        }

        if (!isMobile) {
            // TODO: logic for isMobile variants
        }

    }, [activeRouteSegment]);


 

    return {asToast: showToast, asComponent: showComponent};
};
