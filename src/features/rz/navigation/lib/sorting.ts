// src/shared/lib/sorting.ts

type SortPosition = "start" | "end" | "keep";

/**
 * Вспомогательная фабрика для создания функции-компаратора. Остается без изменений.
 */
const createActiveItemComparator = <T>(
  getKey: (item: T) => string,
  identifier: string,
  position: "start" | "end"
) => {
  return (a: T, b: T): number => {
    const keyA = getKey(a);
    const keyB = getKey(b);

    const moveActiveUp = position === "start" ? -1 : 1;
    const moveActiveDown = -moveActiveUp;

    if (keyA === identifier) return moveActiveUp;
    if (keyB === identifier) return moveActiveDown;

    return 0;
  };
};

// Новый, более понятный интерфейс
interface SortWithActiveItemOptions<T> {
  /** Массив, который нужно отсортировать. */
  items: T[];
  /** Описание того, как найти активный элемент. */
  active: {
    /** Уникальное значение (ID, href, и т.д.), которое мы ищем. */
    identifier: string | null | undefined;
    /** Функция, которая извлекает ключ из элемента массива для сравнения с `identifier`. */
    getKey: (item: T) => string;
  };
  /** Правила перемещения найденного активного элемента. */
  move: {
    /** Условие, которое определяет, какую стратегию перемещения использовать. */
    when: boolean;
    /** Куда переместить, если `when` истинно. */
    then: SortPosition;
    /** Куда переместить, если `when` ложно. */
    else: SortPosition;
  };
}

/**
 * Универсальная функция для сортировки массива, которая перемещает "активный" элемент
 * в начало, конец или оставляет на месте, основываясь на заданных условиях.
 *
 * @param options - Объект с параметрами сортировки.
 * @returns Новый отсортированный массив.
 */
export const sortWithActiveItem = <T>({
  items,
  active,
  move,
}: SortWithActiveItemOptions<T>): T[] => {
  const finalPosition = move.when ? move.then : move.else;

  if (finalPosition === "keep" || !active.identifier) {
    return [...items];
  }

  const comparator = createActiveItemComparator(
    active.getKey,
    active.identifier,
    finalPosition
  );

  return [...items].sort(comparator);
};