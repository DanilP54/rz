import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Navigation } from "@/features/rz/navigation/Navigation";
import { config } from "../config";
import { NavSegments, ROUTES, SegmentCategory } from "@/shared/model/routes";
import { renderComponent } from "@/test-utils";
import { NavHintsTestObject } from "./utils/NavHintsTestObject";
import { DisclosureNavPanelTestObject } from "./utils/DisclosureNavPanelTestObject";
import { SelectedNavPanelTestObject } from "./utils/SelectedNavPanelTestObject";
import { getStoredHints, setStoredHints } from "./utils/localStorage";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";
import { waitFor } from "@testing-library/dom";

vi.mock("next/navigation", () => ({
  useSelectedLayoutSegment: vi.fn(),
  usePathname: vi.fn(),
}));

const stubNextSelectedLayoutSegment = vi.mocked(
  useSelectedLayoutSegment
);
const stubNextPathname = vi.mocked(usePathname);

export const routeTo = (segment: NavSegments, content: SegmentCategory<NavSegments>) => {
  stubNextSelectedLayoutSegment.mockReturnValue(segment)
  const path = ROUTES.rz[segment][content];
  stubNextPathname.mockReturnValue(path)
  return path;
};

export const routeToIndex = () => {
  stubNextSelectedLayoutSegment.mockReturnValue(null)
  stubNextPathname.mockReturnValue(ROUTES.rz.root)
};

describe("NavigationPanels", () => {

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });


  const ALL_NAVIGATION_SEGMENTS = Object.keys(config.panels) as NavSegments[];
  const PANEL = config.panels.intellect;
  const NAV_HINTS_OBJECT = new NavHintsTestObject(config.intro.text);


  describe("DisclosureNavigationPanel behavior", () => {

    beforeEach(() => {
      routeToIndex()
      renderComponent(<Navigation isMobileDevice />);
    })

    it("toggles on trigger click", async () => {
      const disclosurePanel = new DisclosureNavPanelTestObject(PANEL.segmentName);
      await disclosurePanel.clickTrigger();
      expect(disclosurePanel.isExpanded()).toBe(true);
      await disclosurePanel.clickTrigger();
      expect(disclosurePanel.isCollapsed()).toBe(true);
    });

    it("closes on outside click", async () => {
      const disclosurePanel = new DisclosureNavPanelTestObject(PANEL.segmentName);
      await disclosurePanel.clickTrigger();
      await disclosurePanel.clickOutside();
      expect(disclosurePanel.isCollapsed()).toBe(true);
    });
  })

  describe("SelectedNavigationPanel behavior", () => {


    it("should render SelectedNavPanel for the active route segment, all other segments should render as collapsed DisclosureNavigationPanel", async () => {
      
      const currentPathname = routeTo(PANEL.segmentName, 'music');
      renderComponent(<Navigation isMobileDevice />);

      const selectedPanel = new SelectedNavPanelTestObject(PANEL.segmentName);

      expect(selectedPanel.isSelected()).toBe(true);

      ALL_NAVIGATION_SEGMENTS.forEach((segment) => {
        if (segment !== PANEL.segmentName) {
          const { segmentName } = config.panels[segment];
          const otherDisclosurePanel = new DisclosureNavPanelTestObject(
            segmentName
          );
          expect(otherDisclosurePanel.isCollapsed()).toBe(true);
        }
      })

      expect(selectedPanel.isTopInList()).toBe(true);
      expect(selectedPanel.activeLink(currentPathname)).toBe(true);
      expect(selectedPanel.countNumberOfLinks()).toBe(PANEL.links.length);

      await waitFor(() => {
        expect(NAV_HINTS_OBJECT.checkText(PANEL.hintText)).toBeInTheDocument();
      })

      expect(getStoredHints()).toEqual([PANEL.segmentName]);


    })
  })

  // describe("First visit behavior", () => {



  //   it("should render all panels collapsed, display intro hint, and have empty storage", async () => {
  //     routeToIndex();
  //     renderComponent(<Navigation isMobileDevice />);

  //     for (const segment of allNavigationSegments) {
  //       const { segmentName } = config.panels[segment];
  //       const panel = new DisclosureNavPanelTestObject(segmentName);
  //       expect(panel.isCollapsed()).toBe(true);
  //     }

  //     await waitFor(() => {
  //       expect(navHints.checkIntroHintText()).toBeInTheDocument();
  //     });
  //     expect(getStoredHints()).toEqual([]);
  //   });

  //   it("should render selected panel when navigating to segment route, collapsed others panels, display panel hint, and update storage with hint visibility", async () => {
  //     const pathname = routeTo(panel.segmentName, "music");
  //     renderComponent(<Navigation isMobileDevice />);

  //     const selectedPanel = new SelectedNavPanelTestObject(panel.segmentName);
  //     expect(selectedPanel.isTopInList()).toBe(true);
  //     expect(selectedPanel.activeLink(pathname)).toBe(true);

  //     for (const value of allNavigationSegments) {
  //       if (value !== panel.segmentName) {
  //         const { segmentName } = config.panels[value];
  //         const otherDisclosurePanel = new DisclosureNavPanelTestObject(
  //           segmentName
  //         );
  //         expect(otherDisclosurePanel.isCollapsed()).toBe(true);
  //       }
  //     }

  //     await waitFor(() => {
  //       expect(navHints.checkPanelHintText()).toBeInTheDocument();
  //     });

  //     expect(getStoredHints()).toEqual([panel.segmentName]);
  //   });

  //   it("интро подсказка не должна отображаться как компонент, когда выбран один из сегментов в роуте", async () => {
  //     routeToIndex();
  //     const tree = renderComponent(<Navigation isMobileDevice />);

  //     await waitFor(() => {
  //       expect(navHints.checkIntroHintText()).toBeInTheDocument();
  //     });

  //     routeTo(panel.segmentName, "music");
  //     tree.rerender(<Navigation isMobileDevice />);

  //     await waitFor(() => {
  //       expect(navHints.checkIntroHintText()).not.toBeInTheDocument();
  //     });
  //   });

  //   it("into hint as component not shuould when is route has segment 2", async () => {
  //     routeTo(panel.segmentName, "music");
  //     const tree = renderComponent(<Navigation isMobileDevice />);

  //     await waitFor(() => {
  //       expect(navHints.checkIntroHintText()).not.toBeInTheDocument();
  //     });
  //   });
  // });

  // // если intro был виден и пользователь был на каком-либо сегменте

  // describe("Repeat visit behavior", () => {
  //   it("should not show segment hint if already displayed, and show intro hint when returning to index", async () => {
  //     setStoredHints([panel.segmentName]);
  //     routeTo(panel.segmentName, "music");
  //     const tree = renderComponent(<Navigation isMobileDevice />);

  //     expect(navHints.checkPanelHintText()).not.toBeInTheDocument();
  //     expect(getStoredHints()).toEqual([panel.segmentName]);

  //     routeToIndex();
  //     tree.rerender(<Navigation isMobileDevice />);
  //     expect(navHints.checkIntroHintText()).toBeInTheDocument();

  //     routeTo(panel.segmentName, "music");

  //     tree.rerender(<Navigation isMobileDevice />);
  //     expect(getStoredHints()).toEqual([panel.segmentName, "intro"]);
  //   });
  // });
});
