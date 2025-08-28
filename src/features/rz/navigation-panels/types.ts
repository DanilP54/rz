import {RZ_SEGMENTS} from "@/shared/model/routes";

export type PanelState = "selected" | "preview" | "closed";

export type NavLink = {
  readonly href: string;
  readonly label: string;
};

export type NavLinks = List<NavLink>;

export type Panel = {
  readonly about: string;
  readonly links: NavLinks;
};

export type NavigationConfig = {
  readonly introText: string;
  readonly panels: Record<RZ_SEGMENTS, Panel>;
  readonly getSegmentsList: () => RZ_SEGMENTS[]
};
