import { afterEach, describe, expect, it, test, vi } from "vitest";
import { NavigationPanels } from "@/features/rz/navigation-panels/NavigationPanels";
import * as nextNavigation from "next/navigation";
import { navigationConfig } from "../config";
import { RZ_SEGMENTS } from "@/shared/model/routes";
import { renderComponent } from "@/test-utils";
import { HintsStorage, STORAGE_KEY } from "../lib/useHintsStorage";
import { DisclosureNavPanel, SelectedNavPanel } from "./helpres";

vi.mock("next/navigation", () => ({
  useSelectedLayoutSegment: vi.fn(),
  usePathname: vi.fn(() => "/"),
}));

const mockedUseSelectedLayoutSegment = vi.mocked(nextNavigation.useSelectedLayoutSegment);
const mockedUsePathname = vi.mocked(nextNavigation.usePathname);


const getStorageValue = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const setStorageValue = (newValue: HintsStorage[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))


const NAV_SEGMENTS = Object.keys(navigationConfig.panels) as RZ_SEGMENTS[];
const INSTINCTS_PANEL = navigationConfig.panels.instincts;
const INTELLECT_PANEL = navigationConfig.panels.intellect;
const BALANCE_PANEL = navigationConfig.panels.balance;

afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

function setPathname(path: string) {

  mockedUsePathname.mockReturnValue(path);
}

function setSelectedLayoutSegment(segment: Nullable<RZ_SEGMENTS>) {
  mockedUseSelectedLayoutSegment.mockReturnValue(segment);
}

describe("Поведение при первом посещении сайта", () => {

  it("Рендер по умолчанию: все панели закрыты, интро-хинт отображается", async () => {

    setSelectedLayoutSegment(null)
    const tree = renderComponent(<NavigationPanels isMobileDevice />);


    NAV_SEGMENTS.forEach((segment) => {
      const panel = new DisclosureNavPanel(segment, tree)
      expect(panel.state({ expanded: false })).toBe(true)
    });

    expect(await tree.findByText(navigationConfig.intro.text)).toBeInTheDocument()
    const localStorage = getStorageValue();
    expect(localStorage).toEqual([]);
  });

  it("Переход по ссылке на сегмент", async () => {
    setSelectedLayoutSegment(null);
    
    const tree = renderComponent(<NavigationPanels isMobileDevice />);

    const disclosurePanel = new DisclosureNavPanel(INSTINCTS_PANEL.segment, tree)

    await disclosurePanel.clickTrigger()
    expect(disclosurePanel.state({ expanded: true })).toBe(true)

    const path = await disclosurePanel.switchTo('music')

    setPathname(path!)
    setSelectedLayoutSegment(INSTINCTS_PANEL.segment)

    tree.rerender(<NavigationPanels isMobileDevice />)

    const selectedPanel = new SelectedNavPanel(INSTINCTS_PANEL.segment, tree)

    NAV_SEGMENTS.forEach((segment) => {
      if (segment === INSTINCTS_PANEL.segment) {
        expect(selectedPanel.isSelected()).toBe(true)
        expect(selectedPanel.isActiveLink('music')).toBe(true)
      } else {
        const disclosurePanel = new DisclosureNavPanel(segment, tree)
        expect(disclosurePanel.state({ expanded: false })).toBe(true)
      }
    })

    expect(await tree.findByText(INSTINCTS_PANEL.hintText)).toBeInTheDocument()
    const localStorage = getStorageValue();
    expect(localStorage).toEqual([INSTINCTS_PANEL.segment, 'intro'])

  });

  // it("", async () => {
  //   setSelectedLayoutSegment(INSTINCTS_PANEL.segment);

  //   const tree = renderComponent(<NavigationPanels isMobileDevice />);

  //   NAV_SEGMENTS.forEach((segment) => {
  //     const selectedPanel = tree.queryByTestId(`nav-panel-${segment}`);
  //     if (segment === INSTINCTS_PANEL.segment) {
  //       expect(selectedPanel).toHaveAttribute("data-selected", "true");
  //     } else {
  //       expect(selectedPanel).not.toBeInTheDocument();
  //     }
  //   });

  //   const hintText = await tree.findByText(INSTINCTS_PANEL.hintText);
  //   expect(hintText).toBeInTheDocument();

  //   const storageValue = getStorageValue();

  //   expect(storageValue).toEqual([INSTINCTS_PANEL.segment]);
  // });

  // test("Рендер с выбранным сегментом: панель активна", () => {
  //   const segment = getFirstSegment();
  //   vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(segment);
  //   render(<NavigationPanels />);
  //   // Только выбранная панель активна
  //   Object.keys(navigationConfig.segments).forEach((s) => {
  //     const panel = screen.getByTestId(`${s}-panel`);
  //     if (s === segment) {
  //       expect(panel).toHaveAttribute("data-selected", "true");
  //     } else {
  //       expect(panel).toHaveAttribute("data-selected", "false");
  //     }
  //   });
  // });

  // test("Клик по панели: появляется preview", () => {
  //   vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
  //   render(<NavigationPanels />);
  //   const segment = getFirstSegment();
  //   const panel = screen.getByTestId(`${segment}-panel`);
  //   // Клик по панели
  //   fireEvent.click(panel.querySelector("div")!);
  //   // Панель становится preview
  //   expect(panel).toHaveAttribute("data-preview", "true");
  //   // Preview-меню отображается
  //   expect(screen.getByRole("navigation", { name: "" })).toBeInTheDocument();
  // });

  // test("Клик вне превью закрывает preview", () => {
  //   vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
  //   render(<NavigationPanels />);
  //   const segment = getFirstSegment();
  //   const panel = screen.getByTestId(`${segment}-panel`);
  //   // Клик по панели (открыть preview)
  //   fireEvent.click(panel.querySelector("div")!);
  //   expect(panel).toHaveAttribute("data-preview", "true");
  //   // Клик вне превью (по документу)
  //   fireEvent.mouseDown(document.body);
  //   // Preview должен закрыться
  //   expect(panel).toHaveAttribute("data-preview", "false");
  // });

  // test("Интро-хинт отображается как компонент", () => {
  //   vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
  //   render(<NavigationPanels />);
  //   expect(screen.getByText(navigationConfig.intro.text)).toBeInTheDocument();
  // });
});

// describe("Navigation localStorage поведение", () => {
//   //   afterEach(() => {
//   //     localStorage.clear();
//   //   });

//   test("При первом посещении интро-хинт записывается в localStorage", () => {
//     vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
//     render(<NavigationPanels />);
//     // После рендера интро-хинт должен быть записан в localStorage после ухода с index
//     // Симулируем уход с index (смена сегмента)
//     vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(
//       getFirstSegment()
//     );
//     render(<NavigationPanels />);
//     expect(JSON.parse(localStorage.getItem("seenHint")!)).toContain("intro");
//   });

//   test("При повторном посещении интро-хинт не показывается, если есть в localStorage", () => {
//     localStorage.setItem("seenHint", JSON.stringify(["intro"]));
//     vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
//     render(<NavigationPanels />);
//     // Интро-хинт не должен отображаться
//     expect(screen.queryByText(navigationConfig.intro.text)).toBeNull();
//   });

//   test("При первом выборе панели сегмент записывается в localStorage", () => {
//     vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(
//       getFirstSegment()
//     );
//     render(<NavigationPanels />);
//     expect(JSON.parse(localStorage.getItem("seenHint")!)).toContain(
//       getFirstSegment()
//     );
//   });

//   test("При повторном посещении панели подсказка не показывается, если сегмент есть в localStorage", () => {
//     localStorage.setItem("seenHint", JSON.stringify([getFirstSegment()]));
//     vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(
//       getFirstSegment()
//     );
//     render(<NavigationPanels />);
//     // Подсказка не должна показываться (можно проверить отсутствие вызова hintToast, но мы как черный ящик — проверяем только DOM)
//     // Проверяем, что панель активна, но подсказки нет (например, по отсутствию специфичного текста about)
//     // Здесь можно добавить проверку, если about-текст отображается в DOM
//   });
// });
