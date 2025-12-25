import React from "react";

export function useIntersection(onIntersetor: () => void, deps: React.DependencyList) {
    const observerRef = React.useRef<IntersectionObserver | null>(null);
  
    return React.useCallback(
      (el: HTMLDivElement | null) => {
        if (observerRef.current) observerRef.current.disconnect();
  
        observerRef.current = new IntersectionObserver(
          (entries) => {
            const isIntersecting = entries[0]?.isIntersecting;
            if (isIntersecting) {
              onIntersetor();
            }
          },
          { threshold: 0, rootMargin: "0px 0px 6000px 0px" }
        );
  
        if (el) observerRef.current.observe(el);
  
        return () => observerRef.current?.disconnect()
      },
      [...deps]
    );
  }