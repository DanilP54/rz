import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Navigation } from "../navigation";
import { config } from "../_config";
import { NavSegments, ROUTES, SegmentCategory } from "@/shared/model/routes";
import { renderComponent } from "@/test-utils";
import { NavHintsTestObject } from "./hints-component";
import { DisclosureNavPanelTestObject } from "./disclosure-panel-component";
import { SelectedNavPanelTestObject } from "./selected-panel-component";
import { getStoredHints, setStoredHints } from "./storage-helper";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { waitFor } from "@testing-library/dom";

// --- Mocks and Stubs ---
vi.mock("next/navigation", () => ({
  useSelectedLayoutSegment: vi.fn(),
  usePathname: vi.fn(),
}));

const mockUseSelectedLayoutSegment = vi.mocked(useSelectedLayoutSegment);
const mockUsePathname = vi.mocked(usePathname);

// --- Test Helpers ---
// Нейминг стал более явным (simulate...)
const simulateRouteChange = <Segment extends NavSegments>(
  segment: Segment,
  content: SegmentCategory<Segment>
) => {
  mockUseSelectedLayoutSegment.mockReturnValue(segment);
  const path = ROUTES.rz[segment][content];
  mockUsePathname.mockReturnValue(path);
  return path;
};

const simulateRouteToIndex = () => {
  mockUseSelectedLayoutSegment.mockReturnValue(null);
  mockUsePathname.mockReturnValue(ROUTES.rz.root);
};

// --- Test Suite ---
describe("Navigation Component", () => {
  // --- Constants ---
  // Более описательные имена констант
  const ALL_PANEL_SEGMENTS = Object.keys(config.panels) as NavSegments[];
  const TEST_PANEL_CONFIG = config.panels.intellect;
  const TEST_SEGMENT = TEST_PANEL_CONFIG.segmentName;
  const INTRO_HINT_STORAGE_KEY = 'intro';

  let navHints: NavHintsTestObject;

  // Глобальная очистка после каждого теста
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe("Disclosure Panel Behavior", () => {
    let disclosurePanel: DisclosureNavPanelTestObject;

    // Установка состояния перед каждым тестом в этом блоке
    beforeEach(() => {
      simulateRouteToIndex();
      renderComponent(<Navigation isMobileDevice />);
      disclosurePanel = new DisclosureNavPanelTestObject(TEST_SEGMENT);
    });

    it("should expand on the first trigger click and collapse on the second", async () => {
      await disclosurePanel.clickTrigger();
      expect(disclosurePanel.isExpanded()).toBe(true);

      await disclosurePanel.clickTrigger();
      expect(disclosurePanel.isCollapsed()).toBe(true);
    });

    it("should collapse the expanded panel when clicking outside", async () => {
      await disclosurePanel.clickTrigger();
      await disclosurePanel.clickOutside();
      expect(disclosurePanel.isCollapsed()).toBe(true);
    });

    it("should render the correct number of links", () => {
      expect(disclosurePanel.countNumberOfLinks()).toEqual(TEST_PANEL_CONFIG.links.length);
    });
  });

  describe("First Visit Behavior", () => {

    describe("On Index Route", () => {
      beforeEach(() => {
        simulateRouteToIndex();
        renderComponent(<Navigation isMobileDevice />);
        navHints = new NavHintsTestObject(config.intro.text);
      });

      it("should display all panels collapsed", () => {
        ALL_PANEL_SEGMENTS.forEach((segmentName) => {
          const panel = new DisclosureNavPanelTestObject(segmentName);
          expect(panel.isCollapsed()).toBe(true);
        });
      });

      it("should show the introductory hint", async () => {
        await waitFor(() => {
          expect(navHints.getIntroHintText()).toBeInTheDocument();
        });
      });

      it("should have an empty hint storage initially", () => {
        expect(getStoredHints()).toEqual([]);
      });
    });

    describe("On a Segment Route", () => {
      let selectedPanel: SelectedNavPanelTestObject;
      let pathname: string;

      // Разбили один большой тест на несколько маленьких, сфокусированных
      // Общая подготовка для всех тестов в этом блоке
      beforeEach(() => {
        pathname = simulateRouteChange(TEST_SEGMENT, 'books');
        renderComponent(<Navigation isMobileDevice />);
        selectedPanel = new SelectedNavPanelTestObject(TEST_SEGMENT);
        navHints = new NavHintsTestObject(config.intro.text);
      });

      it("should display the relevant panel as 'selected' and place it at the top", () => {
        expect(selectedPanel.isSelected()).toBe(true);
        expect(selectedPanel.isTopInList()).toBe(true);
      });

      it("should collapse all other panels", () => {
        ALL_PANEL_SEGMENTS.forEach((segment) => {
          if (segment !== TEST_SEGMENT) {
            const otherPanel = new DisclosureNavPanelTestObject(segment);
            expect(otherPanel.isCollapsed()).toBe(true);
          }
        });
      });

      it("should highlight the active link and place it first in the list", () => {
        expect(selectedPanel.isLinkActive(pathname)).toBe(true);
        expect(selectedPanel.isFirstLinkActive()).toBe(true);
      });

      it("should display the segment-specific hint and hide the intro hint", async () => {
        await waitFor(() => {
          expect(navHints.getHintText(TEST_PANEL_CONFIG.hintText)).toBeInTheDocument();
          expect(navHints.getIntroHintText()).not.toBeInTheDocument();
        });
      });

      it("should add the visited segment to storage", () => {
        expect(getStoredHints()).toEqual([TEST_SEGMENT]);
      });
    });

    it("should store the intro hint only after navigating from index to a segment", () => {
      // Test 1: Start at index, storage is empty
      simulateRouteToIndex();
      const { rerender } = renderComponent(<Navigation isMobileDevice />);
      expect(getStoredHints()).toEqual([]);

      // Test 2: Navigate to a segment, both segment and intro key are stored
      simulateRouteChange(TEST_SEGMENT, 'movies');
      rerender(<Navigation isMobileDevice />);
      expect(getStoredHints()).toEqual(expect.arrayContaining([INTRO_HINT_STORAGE_KEY, TEST_SEGMENT]));
      expect(getStoredHints()).toHaveLength(2);
    });
  });

  describe("Repeat Visit Behavior", () => {
    it("should not display a hint for a previously visited segment", async () => {
      setStoredHints([TEST_SEGMENT]);
      simulateRouteChange(TEST_SEGMENT, 'movies');
      renderComponent(<Navigation isMobileDevice />);
      navHints = new NavHintsTestObject(config.intro.text);

      // Ждём, чтобы убедиться, что hint не появился асинхронно
      await waitFor(() => {
        expect(navHints.getHintText(TEST_PANEL_CONFIG.hintText)).not.toBeInTheDocument();
      });
    });

    it("should not display the intro hint if it has been seen before", async () => {
      setStoredHints([INTRO_HINT_STORAGE_KEY]);
      simulateRouteToIndex();
      renderComponent(<Navigation isMobileDevice />);
      navHints = new NavHintsTestObject(config.intro.text);

      await waitFor(() => {
        expect(navHints.getIntroHintText()).not.toBeInTheDocument();
      });
    });
  });

  // Новый `describe` блок для тестов на взаимодействие между панелями
  describe("Inter-Panel Interactions", () => {
    it("should collapse an open disclosure panel when navigating within the selected panel", async () => {
      // 1. Находимся на странице сегмента (intellect)
      simulateRouteChange(TEST_PANEL_CONFIG.segmentName, 'music');
      const { rerender } = renderComponent(<Navigation isMobileDevice />);

      const selectedPanel = new SelectedNavPanelTestObject(TEST_PANEL_CONFIG.segmentName);
      const otherPanelSegment = config.panels.instincts.segmentName;
      const disclosurePanel = new DisclosureNavPanelTestObject(otherPanelSegment);

      // 2. Открываем другую панель (instincts)
      await disclosurePanel.clickTrigger();
      expect(disclosurePanel.isExpanded(), "Disclosure panel should be expanded initially").toBe(true);

      // 3. Кликаем на ссылку в "selected" панели (intellect)
      await selectedPanel.selectCategory('books');
      simulateRouteChange(TEST_PANEL_CONFIG.segmentName, 'books');
      rerender(<Navigation isMobileDevice />);

      // 4. Проверяем, что другая панель (instincts) закрылась
      expect(disclosurePanel.isCollapsed(), "Disclosure panel should collapse after navigation").toBe(true);
    });
  });
});
