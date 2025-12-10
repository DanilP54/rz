import { NavSegments, SegmentCategory } from "@/common/model/routes";
import { screen } from "@testing-library/dom";

export class SelectedNavPanelTestObject {
  private panelElement: HTMLElement;
  constructor(private segment: NavSegments) {
    this.panelElement = screen.getByTestId(`slc-panel-${segment}`);
  }

  private getPanel() {
    return this.panelElement;
  }

  isSelected() {
    return this.getPanel().getAttribute("data-selected") === "true";
  }

  isTopInList() {
    const panelsList = screen.getByTestId("nav-list").querySelectorAll("li");
    return panelsList[0]?.getAttribute("data-segment") === this.segment;
  }

  isLinkActive(path: string) {
    return Array.from(this.getPanel().querySelectorAll("a")).some(
      (link) =>
        new URL(link.href, window.location.origin).pathname === path &&
        link.getAttribute("data-active") === "true"
    );
  }

  isFirstLinkActive() {
    return (
      this.getPanel().querySelectorAll("a")[0]?.getAttribute("data-active") ===
      "true"
    );
  }

  countNumberOfLinks() {
    return this.getPanel().querySelectorAll("a").length;
  }

  async selectCategory(category: SegmentCategory<typeof this.segment>, onClick: (target: Element) => Promise<void>) {
    const allLinks = Array.from(this.getPanel().querySelectorAll("a"));
    const target = allLinks.find((anchor) => {
      const dataLabel = anchor.getAttribute("data-label");
      const text = anchor.textContent?.trim();
      return dataLabel === category || text === category;
    });

    if (target) {
      await onClick(target);
    }
  }
}