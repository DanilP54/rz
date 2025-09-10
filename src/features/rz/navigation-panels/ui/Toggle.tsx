import { getBgColorOfSegment } from "@/shared/lib/segment-bg-colors";
import React from "react";
import { RZ_SEGMENTS } from "@/shared/model/routes";

interface IToggle {
  onToggle: () => void;
  segment: RZ_SEGMENTS;
  children: React.ReactNode;
}

export function ToggleButton({ onToggle, segment, children }: IToggle) {
  return (
    <div
      onClick={onToggle}
      className={`w-[35px] group-data-[selected=true]:w-full cursor-pointer h-[40px] px-2 ${getBgColorOfSegment(
        segment
      )}`}
    >
      {children}
    </div>
  );
}
