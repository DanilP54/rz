import Link from "next/link";
import { BaseCardItem, type BaseCardItemProps } from "./base-card.catalog";

export function PersonCard(props: Omit<BaseCardItemProps, "actionSlot">) {
  return (
    <BaseCardItem
      {...props}
      title={
        <Link href={`/rz/instincts/movies/person/${props.title}`}>
          {props.title}
        </Link>
      }
    />
  );
}
