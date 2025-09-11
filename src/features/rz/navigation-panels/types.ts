import { RZ_SEGMENTS } from "@/shared/model/routes";

export type PanelState = "selected" | "preview" | "closed";

export type NavLink = {
  readonly href: string;
  readonly label: string;
};

export type NavLinks = List<NavLink>;

export type Panel = {
  readonly description: string;
  readonly links: NavLinks;
};

export type NavigationConfig = {
  readonly intro: { text: string };
  readonly segments: Record<RZ_SEGMENTS, Panel>;
  readonly getSegmentsKeys: () => RZ_SEGMENTS[];
};
