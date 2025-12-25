"use client";
import { Pause, PlayIcon } from "lucide-react";
import { BaseCardItem, type BaseCardItemProps } from "./base-card.catalog";
import { CardActionButton } from "./card-action-button.catalog";
import Link from "next/link";

export const MoviePlayAction = () => {
  const isPlay = false;

  const Icon = isPlay ? (
    <Pause color="red" fill="red" size={24} />
  ) : (
    <PlayIcon color="white" fill="white" size={24} />
  );

  return <CardActionButton icon={Icon} />;
};

export default function MovieCardItem(props: BaseCardItemProps) {
  return (
    <BaseCardItem
      {...props}
      title={<Link href={`/rz/instincts/movies/${props.slug}`}>{props.title}</Link>}
      actionSlot={props.actionSlot ?? <MoviePlayAction />}
    />
  );
}
