import { afterEach, describe, expect, it, vi } from "vitest";
import { Navigation } from "@/features/rz/navigation/Navigation";
import * as nextNavigation from "next/navigation";
import { config } from "../config";
import { ContentCategory, ROUTES, RZ_SEGMENTS } from "@/shared/model/routes";
import { renderComponent } from "@/test-utils";
import { NavigationHints, STORAGE_KEY } from "../lib/useHintsStorage";
import { DisclosureNavPanel, NavHints, SelectedNavPanel } from "./helpres";
import { waitFor } from "@testing-library/dom";

vi.mock("next/navigation", () => ({
  useSelectedLayoutSegment: vi.fn(),
  usePathname: vi.fn(() => "/"),
}));

const mockedUseSelectedLayoutSegment = vi.mocked(nextNavigation.useSelectedLayoutSegment);
const mockedUsePathname = vi.mocked(nextNavigation.usePathname);

const mockPathname = (path: string) => mockedUsePathname.mockReturnValue(path);
const mockSelectedSegment = (segment: Nullable<RZ_SEGMENTS>) => mockedUseSelectedLayoutSegment.mockReturnValue(segment);

const getStoredHints = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const setStoredHints = (newValue: NavigationHints[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));

const mockRouteTo = (segment: RZ_SEGMENTS, content: ContentCategory) => {
  mockSelectedSegment(segment)
  const path = ROUTES.rz[segment][content]
  mockPathname(path)
  return path
}

const mockRouteToIndex = () => {
  mockSelectedSegment(null)
  mockPathname(ROUTES.rz.root)
}

afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe("NavigationPanels", () => {


  const allNavigationSegments = Object.keys(config.panels) as RZ_SEGMENTS[];
  const introHintText = config.intro.text;
  const panel = config.panels.intellect;
  const navHints = new NavHints();





  it("toggles on trigger click", async () => {
    mockRouteToIndex()
    renderComponent(<Navigation isMobileDevice />);
    const disclosurePanel = new DisclosureNavPanel(panel.segmentName);
    await disclosurePanel.clickTrigger();
    expect(disclosurePanel.isExpanded()).toBe(true);
    await disclosurePanel.clickTrigger()
    expect(disclosurePanel.isCollapsed()).toBe(true);
  });

  it("closes on outside click", async () => {
    mockRouteToIndex()
    renderComponent(<Navigation isMobileDevice />);
    const disclosurePanel = new DisclosureNavPanel(panel.segmentName);
    await disclosurePanel.clickTrigger();
    expect(disclosurePanel.isExpanded()).toBe(true);
    await disclosurePanel.clickOutside();
    expect(disclosurePanel.isCollapsed()).toBe(true);
  });










  describe("First visit behavior", () => {

    it("should render all panels collapsed, display intro hint, and have empty storage", async () => {
      mockRouteToIndex()
      renderComponent(<Navigation isMobileDevice />);

      for (const segment of allNavigationSegments) {
        const { segmentName } = config.panels[segment];
        const panel = new DisclosureNavPanel(segmentName);
        expect(panel.isCollapsed()).toBe(true);
      }

      await waitFor(() => {
        expect(navHints.checkText(introHintText)).toBeInTheDocument();
      });
      expect(getStoredHints()).toEqual([]);
    });

    it("should render selected panel when navigating to segment route, collapsed others panels, display panel hint, and update storage with hint visibility", async () => {
  
      const pathname = mockRouteTo(panel.segmentName, 'music')
      renderComponent(<Navigation isMobileDevice />);

      const selectedPanel = new SelectedNavPanel(panel.segmentName);
      expect(selectedPanel.isTopInList()).toBe(true);
      expect(selectedPanel.activeLink(pathname)).toBe(true)

      for (const value of allNavigationSegments) {
        if (value !== panel.segmentName) {
          const { segmentName } = config.panels[value];
          const otherDisclosurePanel = new DisclosureNavPanel(segmentName);
          expect(otherDisclosurePanel.isCollapsed()).toBe(true);
        }
      }

      await waitFor(() => {
        expect(navHints.checkText(panel.hintText)).toBeInTheDocument();
      });
 
      expect(getStoredHints()).toEqual([panel.segmentName]);
    });

    it("интро подсказка не должна отображаться как компонент, когда выбран один из сегментов в роуте", async () => {
     
      mockRouteToIndex()
      const tree = renderComponent(<Navigation isMobileDevice />)

      await waitFor(() => {
        expect(navHints.checkText(introHintText)).toBeInTheDocument();
      });

      mockRouteTo(panel.segmentName, 'music')
      tree.rerender(<Navigation isMobileDevice />)

      await waitFor(() => {
        expect(navHints.checkText(introHintText)).not.toBeInTheDocument();
      });
    })

    it("into hint as component not shuould when is route has segment 2", async () => {
     
      mockRouteTo(panel.segmentName, 'music')
      const tree = renderComponent(<Navigation isMobileDevice />)

      await waitFor(() => {
        expect(navHints.checkText(introHintText)).not.toBeInTheDocument();
      });

    })
  });


  // если intro был виден и пользователь был на каком-либо сегменте















  describe("Repeat visit behavior", () => {
    it("hould not show segment hint if already displayed, and show intro hint when returning to index", async () => {
      setStoredHints([panel.segmentName]);
      mockSelectedSegment(panel.segmentName);

      const tree = renderComponent(<Navigation isMobileDevice />);
      const selectedPanel = new SelectedNavPanel(panel.segmentName);

      expect(selectedPanel.isSelected()).toBe(true);

      for (const segment of allNavigationSegments) {
        if (segment !== panel.segmentName) {
          const panel = config.panels[segment];
          const disclosurePanel = new DisclosureNavPanel(panel.segmentName);
          expect(disclosurePanel.isCollapsed()).toBe(true);
        }
      }

      expect(navHints.checkText(panel.hintText)).not.toBeInTheDocument();
      expect(getStoredHints()).toEqual([panel.segmentName]);

      mockSelectedSegment(null);
      mockPathname("/rz");
      tree.rerender(<Navigation isMobileDevice />);
      expect(navHints.checkText(introHintText)).toBeInTheDocument();

      mockSelectedSegment(panel.segmentName);

      tree.rerender(<Navigation isMobileDevice />);
      expect(getStoredHints()).toEqual([panel.segmentName, "intro"]);
    });
  });
});

