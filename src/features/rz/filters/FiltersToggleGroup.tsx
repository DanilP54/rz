import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { cn } from "@/shared/lib/utils";
import { NavSegments } from "@/shared/model/routes";
import type { ComponentProps, ReactNode } from "react";

const DEFAULT_OFFSET_ROW = 35

type Props = {
  filterGroups: FilterOptions[][]
  selectedValue: SearchParamsKeys
  onSelect: (value: SearchParamsKeys) => void
  offsetRow?: number
}

export function FiltersToggleGroup(props: Props) {
  return (
    <ToggleGroup type="single" className="flex flex-wrap justify-center items-center w-full rounded-none">
      {props.filterGroups.map((rowGroup, index) => (
        <GroupRow
          style={{ marginLeft: ((props.offsetRow ?? 0) + index) * DEFAULT_OFFSET_ROW }}
          key={index}
        >
          {rowGroup.map((filter) => {
            const isSelected = filter.value === props.selectedValue
            return (
              <ToggleGroupItem
                key={filter.value}
                data-state={isSelected ? 'on' : 'off'}
                aria-checked={isSelected}
                value={filter.value as string}
                className="h-full text-[13px]
                  data-[state=on]:group-data-[segment=instincts]/filters:bg-instincts/80 
                  data-[state=on]:group-data-[segment=intellect]/filters:bg-intellect/80 
                  data-[state=on]:group-data-[segment=balance]/filters:bg-balance/80 
                cursor-pointer"
                onClick={() => props.onSelect(isSelected ? null : filter.value)}
              >
                {filter.label}
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