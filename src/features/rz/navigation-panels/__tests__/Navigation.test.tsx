import { afterEach, describe, expect, it, vi } from "vitest";
import { NavigationPanels } from "@/features/rz/navigation-panels/NavigationPanels";
import * as nextNavigation from "next/navigation";
import { navigationConfig } from "../config";
import { RZ_SEGMENTS } from "@/shared/model/routes";
import { renderComponent } from "@/test-utils";
import { HintsStorage, STORAGE_KEY } from "../lib/useHintsStorage";
import { DisclosureNavPanel, NavHints, SelectedNavPanel } from "./helpres";

vi.mock("next/navigation", () => ({
  useSelectedLayoutSegment: vi.fn(),
  usePathname: vi.fn(() => "/"),
}));

const mockedUseSelectedLayoutSegment = vi.mocked(
  nextNavigation.useSelectedLayoutSegment
);
const mockedUsePathname = vi.mocked(nextNavigation.usePathname);

const getStorageValue = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const setStorageValue = (newValue: HintsStorage[]) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));

const INSTINCTS_PANEL = navigationConfig.panels.instincts;

afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

const setPathname = (path: string) => mockedUsePathname.mockReturnValue(path);
const setSelectedLayoutSegment = (segment: Nullable<RZ_SEGMENTS>) =>
  mockedUseSelectedLayoutSegment.mockReturnValue(segment);

describe("NavigationPanels", () => {
  
  
  const allNavigationSegments = Object.keys(
    navigationConfig.panels
  ) as RZ_SEGMENTS[];
  const introHintText = navigationConfig.intro.text;
  const instinctsPanel = navigationConfig.panels.instincts;

  
  
  
  
  
  
  
  it("Панель открывается на триггер и закрывается по клику outside ", async () => {
    
    renderComponent(<NavigationPanels isMobileDevice={true} />);

    const disclosurePanel = new DisclosureNavPanel(
      instinctsPanel.segment,
      instinctsPanel.links
    );
    await disclosurePanel.clickTrigger();
    expect(disclosurePanel.state({ expanded: true })).toBe(true);
    await disclosurePanel.clickOutside();
    expect(disclosurePanel.state({ expanded: false })).toBe(true);
  });

  describe("Поведение при первом посещении", () => {
    const hint = new NavHints();

    it("Начальное состояние: все disclosure панели свернуты, intro hint отображен, storage = []", async () => {
      renderComponent(<NavigationPanels isMobileDevice={true} />);

      allNavigationSegments.forEach((segment) => {
        const data = navigationConfig.panels[segment];
        const panel = new DisclosureNavPanel(data.segment, data.links);
        expect(panel.state({ expanded: false })).toBe(true);
      });

      expect(await hint.findByText(introHintText)).toBeInTheDocument();
      expect(getStorageValue()).toEqual([]);
    });




    it("Рендер с выбранным сегментом: панель активна, ссылка активна, подсказка отображена, в storage сохранена отметка", async () => {
      const tree = renderComponent(<NavigationPanels isMobileDevice={true} />);

      const disclosurePanel = new DisclosureNavPanel(
        instinctsPanel.segment,
        instinctsPanel.links
      );

      await disclosurePanel.clickTrigger();

      expect(disclosurePanel.state({ expanded: true })).toBe(true);
      expect(disclosurePanel.getLinksCount()).toEqual(
        instinctsPanel.links.length
      );

      const path = disclosurePanel.getPathByCategory("music");
      await disclosurePanel.switchTo(path);

      setPathname(path);
      setSelectedLayoutSegment(instinctsPanel.segment);

      tree.rerender(<NavigationPanels isMobileDevice={true} />);

      const selectedPanel = new SelectedNavPanel(instinctsPanel.segment);

      expect(selectedPanel.isSelected()).toBe(true);
      expect(selectedPanel.activePath(path)).toBe(true);

      allNavigationSegments.forEach((value) => {
        if (value !== instinctsPanel.segment) {
          const {segment,  links} = navigationConfig.panels[value]
          const disclosurePanel = new DisclosureNavPanel(
            segment,
            links
          );
          expect(disclosurePanel.state({ expanded: false })).toBe(true);
        }
      });

      expect(
        await hint.findByText(instinctsPanel.hintText)
      ).toBeInTheDocument();
      expect(getStorageValue()).toEqual([instinctsPanel.segment, "intro"]);
    });
  });
});

// describe("Поведение при первом посещении сайта", () => {

//   // it.each([
//   //   {Name: 'NavigationPanels', Component: NavigationPanels, props: {isMobileDevice: true}}
//   // ])("", ({Component, props}) => {
//   //   renderComponent(<Component {...props}  />)
//   // })

//   // test("Рендер с выбранным сегментом: панель активна", () => {
//   //   const segment = getFirstSegment();
//   //   vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(segment);
//   //   render(<NavigationPanels />);
//   //   // Только выбранная панель активна
//   //   Object.keys(navigationConfig.segments).forEach((s) => {
//   //     const panel = screen.getByTestId(`${s}-panel`);
//   //     if (s === segment) {
//   //       expect(panel).toHaveAttribute("data-selected", "true");
//   //     } else {
//   //       expect(panel).toHaveAttribute("data-selected", "false");
//   //     }
//   //   });
//   // });

//   // test("Клик по панели: появляется preview", () => {
//   //   vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
//   //   render(<NavigationPanels />);
//   //   const segment = getFirstSegment();
//   //   const panel = screen.getByTestId(`${segment}-panel`);
//   //   // Клик по панели
//   //   fireEvent.click(panel.querySelector("div")!);
//   //   // Панель становится preview
//   //   expect(panel).toHaveAttribute("data-preview", "true");
//   //   // Preview-меню отображается
//   //   expect(screen.getByRole("navigation", { name: "" })).toBeInTheDocument();
//   // });

//   // test("Клик вне превью закрывает preview", () => {
//   //   vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
//   //   render(<NavigationPanels />);
//   //   const segment = getFirstSegment();
//   //   const panel = screen.getByTestId(`${segment}-panel`);
//   //   // Клик по панели (открыть preview)
//   //   fireEvent.click(panel.querySelector("div")!);
//   //   expect(panel).toHaveAttribute("data-preview", "true");
//   //   // Клик вне превью (по документу)
//   //   fireEvent.mouseDown(document.body);
//   //   // Preview должен закрыться
//   //   expect(panel).toHaveAttribute("data-preview", "false");
//   // });

//   // test("Интро-хинт отображается как компонент", () => {
//   //   vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
//   //   render(<NavigationPanels />);
//   //   expect(screen.getByText(navigationConfig.intro.text)).toBeInTheDocument();
//   // });
// });

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
