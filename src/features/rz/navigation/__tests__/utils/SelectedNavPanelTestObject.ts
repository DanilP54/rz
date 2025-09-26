import { NavSegments } from "@/shared/model/routes";
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
      return this.getPanel().getAttribute('data-selected') === 'true';
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

    
    countNumberOfLinks() {
      return this.getPanel().querySelectorAll("a").length;
    }
  }