import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NavigationPanels } from "@/features/rz/navigation-panels/NavigationPanels";
import * as nextNavigation from "next/navigation";
import { navigationConfig } from "../config";
import { RZ_SEGMENTS } from "@/shared/model/routes";

// Стаб хуков next/navigation
vi.mock("next/navigation", () => ({
  useSelectedLayoutSegment: vi.fn(),
  usePathname: vi.fn(() => "/"),
}));

const getFirstSegment = () => navigationConfig.getSegmentsList()[0];
const getSecondSegment = () => navigationConfig.getSegmentsList()[1];

// Сброс моков после каждого теста
afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe("Navigation интеграционные сценарии", () => {
  test("Рендер по умолчанию: все панели закрыты, интро-хинт отображается", () => {
    vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
    render(<NavigationPanels />);
    // Все панели должны быть закрыты
    navigationConfig.getSegmentsList().forEach((segment) => {
      const panel = screen.getByTestId(`${segment}-panel`);
      expect(panel).toHaveAttribute("data-selected", "false");
      expect(panel).toHaveAttribute("data-preview", "false");
    });
    // Интро-хинт отображается как компонент
    expect(screen.getByText(navigationConfig.intro.text)).toBeInTheDocument();
  });

  test("Рендер с выбранным сегментом: панель активна", () => {
    const segment = getFirstSegment();
    vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(segment);
    render(<NavigationPanels />);
    // Только выбранная панель активна
    navigationConfig.getSegmentsList().forEach((s) => {
      const panel = screen.getByTestId(`${s}-panel`);
      if (s === segment) {
        expect(panel).toHaveAttribute("data-selected", "true");
      } else {
        expect(panel).toHaveAttribute("data-selected", "false");
      }
    });
  });

  test("Клик по панели: появляется preview", () => {
    vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
    render(<NavigationPanels />);
    const segment = getFirstSegment();
    const panel = screen.getByTestId(`${segment}-panel`);
    // Клик по панели
    fireEvent.click(panel.querySelector("div")!);
    // Панель становится preview
    expect(panel).toHaveAttribute("data-preview", "true");
    // Preview-меню отображается
    expect(screen.getByRole("navigation", { name: "" })).toBeInTheDocument();
  });

  test("Клик вне превью закрывает preview", () => {
    vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
    render(<NavigationPanels />);
    const segment = getFirstSegment();
    const panel = screen.getByTestId(`${segment}-panel`);
    // Клик по панели (открыть preview)
    fireEvent.click(panel.querySelector("div")!);
    expect(panel).toHaveAttribute("data-preview", "true");
    // Клик вне превью (по документу)
    fireEvent.mouseDown(document.body);
    // Preview должен закрыться
    expect(panel).toHaveAttribute("data-preview", "false");
  });

  test("Интро-хинт отображается как компонент", () => {
    vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
    render(<NavigationPanels />);
    expect(screen.getByText(navigationConfig.intro.text)).toBeInTheDocument();
  });
});





describe("Navigation localStorage поведение", () => {
  //   afterEach(() => {
  //     localStorage.clear();
  //   });

  test("При первом посещении интро-хинт записывается в localStorage", () => {
    vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
    render(<NavigationPanels />);
    // После рендера интро-хинт должен быть записан в localStorage после ухода с index
    // Симулируем уход с index (смена сегмента)
    vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(
      getFirstSegment()
    );
    render(<NavigationPanels />);
    expect(JSON.parse(localStorage.getItem("seenHint")!)).toContain("intro");
  });

  test("При повторном посещении интро-хинт не показывается, если есть в localStorage", () => {
    localStorage.setItem("seenHint", JSON.stringify(["intro"]));
    vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(null);
    render(<NavigationPanels />);
    // Интро-хинт не должен отображаться
    expect(screen.queryByText(navigationConfig.intro.text)).toBeNull();
  });

  test("При первом выборе панели сегмент записывается в localStorage", () => {
    vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(
      getFirstSegment()
    );
    render(<NavigationPanels />);
    expect(JSON.parse(localStorage.getItem("seenHint")!)).toContain(
      getFirstSegment()
    );
  });

  test("При повторном посещении панели подсказка не показывается, если сегмент есть в localStorage", () => {
    localStorage.setItem("seenHint", JSON.stringify([getFirstSegment()]));
    vi.mocked(nextNavigation.useSelectedLayoutSegment).mockReturnValue(
      getFirstSegment()
    );
    render(<NavigationPanels />);
    // Подсказка не должна показываться (можно проверить отсутствие вызова hintToast, но мы как черный ящик — проверяем только DOM)
    // Проверяем, что панель активна, но подсказки нет (например, по отсутствию специфичного текста about)
    // Здесь можно добавить проверку, если about-текст отображается в DOM
  });
});
