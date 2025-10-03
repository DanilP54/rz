import {useEffect, useRef, useState} from "react";
import {useHintsStorage} from "@/features/rz/navigation/lib/_use-hints-storage";
import {NavSegments} from "@/shared/model/routes";

export const useIntroHintDisplay = (
    activeRouteSegment: Nullable<NavSegments>,
    isMobile: boolean
) => {
    const [showComponent, setShowComponent] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const userIsBeenIndexRoute = useRef(false)

    const storage = useHintsStorage();

    const isIndexRoute = () => {
        return !activeRouteSegment
    }

    const userIsBeenSegmentRoute = () => {
        return !storage.isEmpty()
    }

    useEffect(() => {

        if (storage.isSeen('intro')) return

        if (isIndexRoute()) {
            userIsBeenIndexRoute.current = true;
        }

        if (isMobile) {
            if (isIndexRoute()) setShowComponent(true);
            else {
                setShowComponent(false);
                if (userIsBeenIndexRoute.current) {
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
