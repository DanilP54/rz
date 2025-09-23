import { ContentCategory, RZ_SEGMENTS } from "@/shared/model/routes";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export class DisclosureNavPanel {
  private triggerElement: HTMLElement;
  private linkListElement: HTMLElement;
  private user = userEvent.setup();

  constructor(private segment: RZ_SEGMENTS) {
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

  isExpanded() {
    return this.triggerIsExpanded() && !this.dropdownMenuIsHidden();
  }

  isCollapsed() {
    return !this.triggerIsExpanded() && this.dropdownMenuIsHidden();
  }

  async clickTrigger() {
    const trigger = this.getTrigger();
    return this.user.click(trigger);
  }

  async clickOutside() {
    const body = document.body;
    await this.user.click(body);
  }

  async selectCategory(category: ContentCategory) {
    const dropdownMenu = this.getDropdownMenu();
    const anchors = Array.from(
      dropdownMenu.querySelectorAll<HTMLAnchorElement>("a")
    );
    const target = anchors.find((anchor) => {
      const dataLabel = anchor.getAttribute("data-label");
      const text = anchor.textContent?.trim();
      return dataLabel === category || text === category;
    });
    if (target) {
      await this.user.click(target);
    }
  }

  countNumberOfLinks() {
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

  isTopInList() {
    const panelsList = screen.getByTestId('nav-list').querySelectorAll('li')
    return panelsList[0].getAttribute('data-segment') === this.segment
  }

  activeLink(path: string) {
    return Array.from(this.getPanel().querySelectorAll("a")).some(
      (link) =>
        new URL(link.href, window.location.origin).pathname === path &&
        link.getAttribute("data-active") === "true"
    );
  }
}

export class NavHints {
  checkText(text: string) {
    return screen.queryByText(text);
  }
}