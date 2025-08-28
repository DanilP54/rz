import {RZ_SEGMENTS} from "@/shared/model/routes";

export const getBgColorOfSegment = (segment?: RZ_SEGMENTS, opacity?: number) => {
  if (!segment) return "";

  const colors = {
    instincts: opacity ? `bg-instincts/${String(opacity)}` : 'bg-instincts',
    intellect: opacity ? `bg-intellect/${String(opacity)}` : 'bg-intellect',
    balance: opacity ? `bg-balance/${String(opacity)}` : 'bg-balance',
  } satisfies { [K in RZ_SEGMENTS]: string };

  return colors[segment];
};
