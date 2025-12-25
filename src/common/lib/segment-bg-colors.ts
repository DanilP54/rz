import {NavSegments} from "@/common/model/routes";

export const getColorOfSegment = (segment?: NavSegments, opacity?: number) => {
  if (!segment) return "";

  const colors = {
    instincts: opacity ? `bg-instincts/${String(opacity)}` : 'bg-instincts',
    intellect: opacity ? `bg-intellect/${String(opacity)}` : 'bg-intellect',
    balance: opacity ? `bg-balance/${String(opacity)}` : 'bg-balance',
  } satisfies { [K in NavSegments]: string };

  return colors[segment];
};
