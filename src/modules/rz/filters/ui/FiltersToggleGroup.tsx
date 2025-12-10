import { ToggleGroup, ToggleGroupItem } from "@/common/ui/toggle-group";
import { cn } from "@/common/lib/utils";
import { NavSegments } from "@/common/model/routes";
import type { ComponentProps, ReactNode } from "react";
import { FilterOption } from "../types";

const DEFAULT_OFFSET_ROW = 35

interface IFiltersToggleGroup<Param> {
  rowChunks: FilterOption<Param>[][]
  selectedValue: Param | null
  onSelect: (value: Param | null) => void
  offsetRow?: number
}

export function FiltersToggleGroup<Param extends string>(props: IFiltersToggleGroup<Param>) {
  return (
    <ToggleGroup type="single" className="flex flex-wrap justify-center items-center w-full rounded-none">
      {props.rowChunks.map((row, index) => (
        <GroupRow style={{ marginLeft: ((props.offsetRow ?? 0) + index) * DEFAULT_OFFSET_ROW }} key={index}>
          {row.map((option) => {
            const isSelected = option.value === props.selectedValue
            const newValue = isSelected ? null : option.value
            return (
              <ToggleGroupItem
                key={option.value}
                data-state={isSelected ? 'on' : 'off'}
                aria-checked={isSelected}
                value={option.value}
                className="h-full text-[13px]
                  data-[state=on]:group-data-[segment=instincts]/filters:bg-instincts/80 
                  data-[state=on]:group-data-[segment=intellect]/filters:bg-intellect/80 
                  data-[state=on]:group-data-[segment=balance]/filters:bg-balance/80 
                cursor-pointer"
                onClick={() => props.onSelect(newValue)}
              >
                {option.label}
              </ToggleGroupItem>
            )
          })}
        </GroupRow>
      ))}
    </ToggleGroup>
  )
}

export const GroupRow = ({
  variant,
  width,
  children,
  ...props
}: {
  variant?: NavSegments
  width?: string
  children: ReactNode
} & ComponentProps<'div'>) => {
  return (
    <div style={{ width }} {...props}
      className={cn(
        `h-[40px] group-data-[segment='instincts']/filters:bg-instincts/30 group-data-[segment='intellect']/filters:bg-intellect/30 group-data-[segment='balance']/filters:bg-balance/30 w-full flex items-center justify-around`,
        props.className
      )}
    >
      {children}
    </div>
  )
}