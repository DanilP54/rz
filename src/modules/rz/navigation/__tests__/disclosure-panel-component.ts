import { NavSegments, SegmentCategory } from "@/common/model/routes";
import { screen } from "@testing-library/dom";

export class DisclosureNavPanelTestObject {
  private triggerElement: HTMLElement;
  private linkListElement: HTMLElement;

  constructor(private segment: NavSegments) {
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

  async clickTrigger(onClick: (trigger: Element) => Promise<void>) {
    const trigger = this.getTrigger();
    onClick(trigger);
  }

  async clickOutside(onClick: (trigger: Element) => Promise<void>) {
    const body = document.body;
    onClick(body);
  }

  async selectCategory(category: SegmentCategory<typeof this.segment>, onClick: (trigger: Element) => Promise<void>) {
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
      onClick(target);
    }
  }

  countNumberOfLinks() {
    const dropdownMenu = this.getDropdownMenu();
    return dropdownMenu.querySelectorAll("a").length;
  }
}
