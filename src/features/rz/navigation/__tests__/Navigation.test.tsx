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
  const INTRO_HINT_KEY = 'intro'
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

    it("рендеряться правильное количество ссылок", async () => {
      const disclosurePanel = new DisclosureNavPanelTestObject(PANEL.segmentName);
      expect(disclosurePanel.countNumberOfLinks()).toEqual(PANEL.links.length)
    });
  })

  describe("First visit behavior", () => {
    it("Захожу на INDEX ROUTE, все панели закрыты, local storage пустой, отображается nav hint", async () => {
      routeToIndex()
      renderComponent(<Navigation isMobileDevice />)
      
      ALL_NAVIGATION_SEGMENTS.forEach((segmentName) => {
        const discPanel = new DisclosureNavPanelTestObject(segmentName)
        expect(discPanel.isCollapsed()).toBe(true)
      })
      
      await waitFor(() => {
        expect(NAV_HINTS_OBJECT.checkIntroHintText()).toBeInTheDocument()
      })

      expect(getStoredHints()).toEqual([])
    
    })

    it("Захожу на SEGMENT ROUTE, отображается selected panel, она наверху списка, остальные панели закрыты, nav hint отображается, local storage пустой, остальные панели в свернутом состоянии, into hint не отображается, активная ссылка соответствует пути, активная ссылка в начале списка", async () => {
      
      const TEST_SEGMENT = PANEL.segmentName
      const PANEL_HINT_TEXT = PANEL.hintText

      const pathname = routeTo(TEST_SEGMENT, 'books')
      
      renderComponent(<Navigation  isMobileDevice />)

      const selectedPanel = new SelectedNavPanelTestObject(TEST_SEGMENT)

      expect(selectedPanel.isSelected()).toBe(true)
      expect(selectedPanel.isTopInList()).toBe(true)
      expect(selectedPanel.activeLink(pathname)).toBe(true)
      expect(selectedPanel.activeLinkIsFirstInList()).toBe(true)
      expect(selectedPanel.countNumberOfLinks()).toEqual(PANEL.links.length)

      ALL_NAVIGATION_SEGMENTS.forEach((segment) => {
        if(segment !== TEST_SEGMENT) {
          const otherDiscPanel = new DisclosureNavPanelTestObject(segment)
          expect(otherDiscPanel.isCollapsed()).toBe(true)
        }
      })  

      await waitFor(() => {
        expect(NAV_HINTS_OBJECT.checkIntroHintText()).not.toBeInTheDocument()
        expect(NAV_HINTS_OBJECT.checkText(PANEL_HINT_TEXT)).toBeInTheDocument()
      })

      expect(getStoredHints()).toEqual([TEST_SEGMENT])    
    })

    it("intro hint записывается в storage только когда пользователь посещал segment route и был на index route", async () => {
      
      const TEST_SEGMENT = PANEL.segmentName
    
      
      routeToIndex() 
      const tree = renderComponent(<Navigation isMobileDevice />)
      routeTo(TEST_SEGMENT, 'movies')
      tree.rerender(<Navigation isMobileDevice />)
      expect(getStoredHints()).toEqual([TEST_SEGMENT, INTRO_HINT_KEY])
    })
  })


  describe("Repeat visit behavior", () => {


    it("При посещении сегмента, подсказка не отображается, так как сторэдж содержит запись о посещении", async () => {
      const TEST_SEGMENT = PANEL.segmentName
      const PANEL_HINT_TEXT = PANEL.hintText
      setStoredHints([TEST_SEGMENT])
      
      routeTo(TEST_SEGMENT, 'movies')

      renderComponent(<Navigation isMobileDevice />)
      
      await waitFor(() => {
        expect(NAV_HINTS_OBJECT.checkText(PANEL_HINT_TEXT)).not.toBeInTheDocument()
      })

    })

    it("intro hint не отображается, так как storage содержит запись об посещении", async () => {
      setStoredHints([INTRO_HINT_KEY])
      routeToIndex()
      renderComponent(<Navigation isMobileDevice />)
      
      await waitFor(() => {
        expect(NAV_HINTS_OBJECT.checkIntroHintText()).not.toBeInTheDocument()
      })
    })
  })


  
  it("при открытой disc panels когда перехожу по ссылкам на SelectedPanel, Disc должна свернуться", async () => {
    routeTo(PANEL.segmentName, 'music')
    const tree = renderComponent(<Navigation  isMobileDevice/>)
    const selectedPanel = new SelectedNavPanelTestObject(PANEL.segmentName)
    const discPanel = new DisclosureNavPanelTestObject(config.panels.instincts.segmentName)

    await discPanel.clickTrigger()
    expect(discPanel.isExpanded()).toBe(true)

    selectedPanel.selectCategory('books')

    routeTo(PANEL.segmentName, 'books')

    tree.rerender(<Navigation isMobileDevice />)

    expect(discPanel.isCollapsed()).toBe(true)
  })
});
