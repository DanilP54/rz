import { For } from "@/shared/For";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { Options } from ".";
import { cn } from "@/shared/lib/utils";
import { NavSegments } from "@/shared/model/routes";

type Props = {
  filterGroups: Options[][]
  selectedValue: string
  onSelect: (value: string) => void
  indentLeft?: number
}

export function FiltersToggleGroup(props: Props) {
  return (
    <ToggleGroup type="single" className="flex flex-wrap justify-center items-center w-full rounded-none">
      <For each={props.filterGroups}>
        {(group, index) =>
          <FiltersGroupContainer style={{ marginLeft: ((props.indentLeft ?? 0) + index) * 35 }} key={index}>
            <For each={group}>
              {(filter) => {
                const isSelected = filter.value === props.selectedValue
                return <ToggleGroupItem
                  key={filter.value}
                  data-state={isSelected ? 'on' : 'off'}
                  aria-checked={isSelected}
                  value={filter.value}
                  className="h-full text-[13px]
                    data-[state=on]:group-data-[segment=instincts]/filters:bg-instincts/80 
                    data-[state=on]:group-data-[segment=intellect]/filters:bg-intellect/80 
                    data-[state=on]:group-data-[segment=balance]/filters:bg-balance/80 
                  cursor-pointer"
                  onClick={() => props.onSelect(isSelected ? '' : filter.value)}
                >
                  {filter.label}
                </ToggleGroupItem>
              }}
            </For>
          </FiltersGroupContainer>
        }
      </For>
    </ToggleGroup>
  )
}




export const FiltersGroupContainer = ({
  variant,
  width,
  children,
  ...props
}: {
  variant?: NavSegments
  width?: string
  children: React.ReactNode
} & React.ComponentProps<'div'>) => {
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