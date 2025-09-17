import { CategorizedRoutes, ContentCategory, RZ_SEGMENTS } from "@/shared/model/routes";
import { RenderResult, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import { NavLinks, Panel } from "../types";

type Fixtures = {
  disclosureNavPanel: DisclosureNavPanel;
  selectedNavPanel: SelectedNavPanel;
  navHints: NavHints;
};

export class DisclosureNavPanel {

  private panelElement: HTMLElement;
  private triggerElement: HTMLElement;
  private linkListElement: HTMLElement
  
  constructor(private segment: RZ_SEGMENTS, private container: RenderResult) {
    this.panelElement = this.container.getByTestId(`disc-panel-${segment}`)
    this.triggerElement = this.container.getByTestId(`disc-trigger-${segment}`)
    this.linkListElement = this.container.getByTestId(`disc-link-list-${segment}`)
  }

  private getTrigger() {
    return this.triggerElement
  }

  private getDropdownMenu() {
    return this.linkListElement
  }

  private triggerIsExpanded() {
    return this.getTrigger().getAttribute('aria-expanded') === 'true';
  }

  private dropdownMenuIsHidden() {
    return this.getDropdownMenu().classList.contains('hidden');
  }

  state({expanded}: {expanded: boolean}) {
      const triggerIsExpanded = this.triggerIsExpanded()
      const dropdownMenuIsHidden = this.dropdownMenuIsHidden()
    if(expanded) return triggerIsExpanded && !dropdownMenuIsHidden
    else return !triggerIsExpanded && dropdownMenuIsHidden
  }

  async clickTrigger() {
    const event = userEvent.setup()
    const trigger = this.getTrigger()
    return event.click(trigger)
  }

  async clickOutside() {
    const event = userEvent.setup()
    const body = document.body
    await event.click(body)
  }

  async switchTo(category: ContentCategory) {
    const event = userEvent.setup()
    const dropdownMenu = this.getDropdownMenu()
    const allLinks = dropdownMenu.querySelectorAll('a')
    for(let link of allLinks) {
      if(link.textContent === category) {
        event.click(link)
        return link.href
      }
    }
  } 

}

export class SelectedNavPanel {
  private panelElement: HTMLElement
  constructor(private segment: RZ_SEGMENTS, private container: RenderResult) {
    this.panelElement = container.getByTestId(`slc-panel-${segment}`)
  }

  private getPanel() {
    return this.panelElement
  }

  isSelected() {
    return this.getPanel().getAttribute('data-selected') === 'true'
  }

  isActiveLink(label: ContentCategory) {
    const links = this.getPanel().querySelectorAll('a')
    
    for(let link of links) {
      const isActive = link.getAttribute('data-active') === 'true';
      if(link.textContent === label && isActive) return true
      else return false
    }
  
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

// export const navigationFixtures: Fixtures = {
//   disclosureNavPanel: new DisclosureNavPanel(),
//   selectedNavPanel: new SelectedNavPanel(),
//   navHints: new NavHints(),
// };
