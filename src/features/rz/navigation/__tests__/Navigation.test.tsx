// import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// import { Navigation } from "@/features/rz/navigation/Navigation";
// import { config } from "../config";
// import { NavSegments, ROUTES, SegmentCategory } from "@/shared/model/routes";
// import { renderComponent } from "@/test-utils";
// import { NavHintsTestObject } from "./utils/NavHintsTestObject";
// import { DisclosureNavPanelTestObject } from "./utils/DisclosureNavPanelTestObject";
// import { SelectedNavPanelTestObject } from "./utils/SelectedNavPanelTestObject";
// import { getStoredHints, setStoredHints } from "./utils/localStorage";
// import { usePathname, useSelectedLayoutSegment } from "next/navigation";
// import { waitFor } from "@testing-library/dom";

// vi.mock("next/navigation", () => ({
//   useSelectedLayoutSegment: vi.fn(),
//   usePathname: vi.fn(),
// }));

// const stubNextSelectedLayoutSegment = vi.mocked(useSelectedLayoutSegment);

// const stubNextPathname = vi.mocked(usePathname);

// export const routeTo = <Segment extends NavSegments>(
//   segment: Segment,
//   content: SegmentCategory<Segment>
// ) => {
//   stubNextSelectedLayoutSegment.mockReturnValue(segment);
//   const path = ROUTES.rz[segment][content];
//   stubNextPathname.mockReturnValue(path);
//   return path;
// };

// export const routeToIndex = () => {
//   stubNextSelectedLayoutSegment.mockReturnValue(null);
//   stubNextPathname.mockReturnValue(ROUTES.rz.root);
// };

// describe("NavigationPanels", () => {
//   afterEach(() => {
//     vi.clearAllMocks();
//     localStorage.clear();
//   });

//   const ALL_NAVIGATION_SEGMENTS = Object.keys(config.panels) as NavSegments[];
//   const PANEL = config.panels.intellect;
//   const INTRO_HINT_KEY = "intro";
//   const NAV_HINTS_OBJECT = new NavHintsTestObject(config.intro.text);

//   describe("DisclosureNavigationPanel behavior", () => {
//     beforeEach(() => {
//       routeToIndex();
//       renderComponent(<Navigation isMobileDevice />);
//     });

//     it("toggles on trigger click", async () => {
//       const disclosurePanel = new DisclosureNavPanelTestObject(
//         PANEL.segmentName
//       );
//       await disclosurePanel.clickTrigger();
//       expect(disclosurePanel.isExpanded()).toBe(true);
//       await disclosurePanel.clickTrigger();
//       expect(disclosurePanel.isCollapsed()).toBe(true);
//     });

//     it("closes on outside click", async () => {
//       const disclosurePanel = new DisclosureNavPanelTestObject(
//         PANEL.segmentName
//       );
//       await disclosurePanel.clickTrigger();
//       await disclosurePanel.clickOutside();
//       expect(disclosurePanel.isCollapsed()).toBe(true);
//     });

//     it("рендеряться правильное количество ссылок", async () => {
//       const disclosurePanel = new DisclosureNavPanelTestObject(
//         PANEL.segmentName
//       );
//       expect(disclosurePanel.countNumberOfLinks()).toEqual(PANEL.links.length);
//     });
//   });

//   describe("First visit behavior", () => {
//     it("Захожу на INDEX ROUTE, все панели закрыты, local storage пустой, отображается nav hint", async () => {
//       routeToIndex();
//       renderComponent(<Navigation isMobileDevice />);

//       ALL_NAVIGATION_SEGMENTS.forEach((segmentName) => {
//         const discPanel = new DisclosureNavPanelTestObject(segmentName);
//         expect(discPanel.isCollapsed()).toBe(true);
//       });

//       await waitFor(() => {
//         expect(NAV_HINTS_OBJECT.getIntroHintText()).toBeInTheDocument();
//       });

//       expect(getStoredHints()).toEqual([]);
//     });

//     it("Захожу на SEGMENT ROUTE, отображается selected panel, она наверху списка, остальные панели закрыты, nav hint отображается, local storage пустой, остальные панели в свернутом состоянии, into hint не отображается, активная ссылка соответствует пути, активная ссылка в начале списка", async () => {
//       const TEST_SEGMENT = PANEL.segmentName;
//       const PANEL_HINT_TEXT = PANEL.hintText;

//       const pathname = routeTo(TEST_SEGMENT, "books");

//       renderComponent(<Navigation isMobileDevice />);

//       const selectedPanel = new SelectedNavPanelTestObject(TEST_SEGMENT);

//       expect(selectedPanel.isSelected()).toBe(true);
//       expect(selectedPanel.isTopInList()).toBe(true);
//       expect(selectedPanel.isLinkActive(pathname)).toBe(true);
//       expect(selectedPanel.isFirstLinkActive()).toBe(true);
//       expect(selectedPanel.countNumberOfLinks()).toEqual(PANEL.links.length);

//       ALL_NAVIGATION_SEGMENTS.forEach((segment) => {
//         if (segment !== TEST_SEGMENT) {
//           const otherDiscPanel = new DisclosureNavPanelTestObject(segment);
//           expect(otherDiscPanel.isCollapsed()).toBe(true);
//         }
//       });

//       await waitFor(() => {
//         expect(NAV_HINTS_OBJECT.getIntroHintText()).not.toBeInTheDocument();
//         expect(
//           NAV_HINTS_OBJECT.getHintText(PANEL_HINT_TEXT)
//         ).toBeInTheDocument();
//       });

//       expect(getStoredHints()).toEqual([TEST_SEGMENT]);
//     });

//     it("intro hint записывается в storage только когда пользователь посещал segment route и был на index route", async () => {
//       const TEST_SEGMENT = PANEL.segmentName;

//       routeToIndex();
//       const tree = renderComponent(<Navigation isMobileDevice />);
//       routeTo(TEST_SEGMENT, "movies");
//       tree.rerender(<Navigation isMobileDevice />);
//       expect(getStoredHints()).toEqual([TEST_SEGMENT, INTRO_HINT_KEY]);
//     });
//   });

//   describe("Repeat visit behavior", () => {
//     it("При посещении сегмента, подсказка не отображается, так как сторэдж содержит запись о посещении", async () => {
//       const TEST_SEGMENT = PANEL.segmentName;
//       const PANEL_HINT_TEXT = PANEL.hintText;
//       setStoredHints([TEST_SEGMENT]);

//       routeTo(TEST_SEGMENT, "movies");

//       renderComponent(<Navigation isMobileDevice />);

//       await waitFor(() => {
//         expect(
//           NAV_HINTS_OBJECT.getHintText(PANEL_HINT_TEXT)
//         ).not.toBeInTheDocument();
//       });
//     });

//     it("intro hint не отображается, так как storage содержит запись об посещении", async () => {
//       setStoredHints([INTRO_HINT_KEY]);
//       routeToIndex();
//       renderComponent(<Navigation isMobileDevice />);

//       await waitFor(() => {
//         expect(NAV_HINTS_OBJECT.getIntroHintText()).not.toBeInTheDocument();
//       });
//     });
//   });

//   it("при открытой disc panels когда перехожу по ссылкам на SelectedPanel, Disc должна свернуться", async () => {
//     routeTo(PANEL.segmentName, "music");
//     const tree = renderComponent(<Navigation isMobileDevice />);
//     const selectedPanel = new SelectedNavPanelTestObject(PANEL.segmentName);
//     const discPanel = new DisclosureNavPanelTestObject(
//       config.panels.instincts.segmentName
//     );

//     await discPanel.clickTrigger();
//     expect(discPanel.isExpanded()).toBe(true);

//     await selectedPanel.selectCategory("books");

//     routeTo(PANEL.segmentName, "books");

//     tree.rerender(<Navigation isMobileDevice />);

//     expect(discPanel.isCollapsed()).toBe(true);
//   });
// });

// vitest-setup.ts
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
      expect(getStoredHints()).toEqual([TEST_SEGMENT, INTRO_HINT_STORAGE_KEY]);
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
