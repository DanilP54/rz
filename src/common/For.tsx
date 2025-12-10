import { ReactNode } from "react"

export function For<T, U extends ReactNode>(props: {
    each: readonly T[]
    children: (item: T, index: number) => U
  }) {
    return <>{props.each.map((item, index) => props.children(item, index))}</>
  }