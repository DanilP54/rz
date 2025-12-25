
type SortPosition = "start" | "end" | "keep";

/**
 * Вспомогательная фабрика для создания функции-компаратора.
 */
const createActiveItemComparator = <T>(
  isActive: (item: T) => boolean,
  position: "start" | "end"
) => {
  return (a: T, b: T): number => {
    const moveActiveUp = position === "start" ? -1 : 1;
    const moveActiveDown = -moveActiveUp;

    if (isActive(a)) return moveActiveUp;
    if (isActive(b)) return moveActiveDown;

    return 0;
  };
};

interface SortWithActiveItemOptions<T> {
  /** Массив, который нужно отсортировать. */
  items: T[];
  /** Предикат, который возвращает true для активного элемента. */
  isActive: (item: T) => boolean;
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
  isActive,
  move,
}: SortWithActiveItemOptions<T>): T[] => {
  const finalPosition = move.when ? move.then : move.else;

  if (finalPosition === "keep") {
    return [...items];
  }

  const comparator = createActiveItemComparator(isActive, finalPosition);

  return [...items].sort(comparator);
};