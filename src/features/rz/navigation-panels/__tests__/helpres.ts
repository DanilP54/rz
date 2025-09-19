import {
  CategorizedRoutes,
  ContentCategory,
  RZ_SEGMENTS,
} from "@/shared/model/routes";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavLinks, Panel } from "../types";
import { link } from "fs";

type Fixtures = {
  disclosureNavPanel: DisclosureNavPanel;
  selectedNavPanel: SelectedNavPanel;
  navHints: NavHints;
};

export class DisclosureNavPanel {
  private panelElement: HTMLElement;
  private triggerElement: HTMLElement;
  private linkListElement: HTMLElement;

  constructor(private segment: RZ_SEGMENTS, private links: NavLinks) {
    this.panelElement = screen.getByTestId(`disc-panel-${this.segment}`);
    this.triggerElement = screen.getByTestId(`disc-trigger-${this.segment}`);
    this.linkListElement = screen.getByTestId(`disc-link-list-${this.segment}`);
  }

  private getTrigger() {
    return this.triggerElement;
  }

  private getDropdownMenu() {
    return this.linkListElement;
  }

  private triggerIsExpanded() {
    return this.getTrigger().getAttribute("aria-expanded") === "true";
  }

  private dropdownMenuIsHidden() {
    return this.getDropdownMenu().classList.contains("hidden");
  }

  getPathByCategory(category: ContentCategory) {
    const link = this.links.find((link) => link.label === category);
    if (!link) {
      throw new Error("Not found path by category");
    }
    return link.href;
  }

  state({ expanded }: { expanded: boolean }) {
    const triggerIsExpanded = this.triggerIsExpanded();
    const dropdownMenuIsHidden = this.dropdownMenuIsHidden();

    if (expanded) return triggerIsExpanded && !dropdownMenuIsHidden;
    else return !triggerIsExpanded && dropdownMenuIsHidden;
  }

  async clickTrigger() {
    const event = userEvent.setup();
    const trigger = this.getTrigger();
    return event.click(trigger);
  }

  async clickOutside() {
    const event = userEvent.setup();
    const body = document.body;
    await event.click(body);
  }

  async switchTo(path: string) {
    const event = userEvent.setup();
    const dropdownMenu = this.getDropdownMenu();
    dropdownMenu.querySelectorAll("a").forEach((link) => {
      if (link.href === path) {
        event.click(link);
      }
    });
  }

  getLinksCount() {
    const dropdownMenu = this.getDropdownMenu();
    return dropdownMenu.querySelectorAll("a").length;
  }
}

export class SelectedNavPanel {
  private panelElement: HTMLElement;
  constructor(private segment: RZ_SEGMENTS) {
    this.panelElement = screen.getByTestId(`slc-panel-${segment}`);
  }

  private getPanel() {
    return this.panelElement;
  }

  isSelected() {
    return this.getPanel().getAttribute("data-selected") === "true";
  }

  activePath(path: string) {
    return Array.from(this.getPanel().querySelectorAll("a")).some(
      (link) =>
        new URL(link.href, window.location.origin).pathname === path &&
        link.getAttribute("data-active") === "true"
    );
  }
  //   private panelIdPrefix = "slc-nav-panel";

  //   assertIsInTheDocument(segment: RZ_SEGMENTS) {
  //     const panel = screen.getAllByTestId(`${this.panelIdPrefix}-{$segment}`);
  //     expect(panel).toBeInTheDocument();
  //     expect(panel).toHaveAttribute("data-selected", "true");
  //   }

  //   assertLinkWithLabel(label: string) {
  //     const link = screen.findByText(label);
  //     expect(link).toBeInTheDocument();
  //   }
  // }

  // class NavHints {
  //   assertIsShow(text: string) {
  //     const hint = screen.getByText(text);
  //     expect(hint).toBeInTheDocument();
  //   }
}

export class NavHints {
  async findByText(text: string) {
    return await screen.findByText(text);
  }
}
// export const navigationFixtures: Fixtures = {
//   disclosureNavPanel: new DisclosureNavPanel(),
//   selectedNavPanel: new SelectedNavPanel(),
//   navHints: new NavHints(),
// };
