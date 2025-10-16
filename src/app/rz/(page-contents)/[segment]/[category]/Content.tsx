"use client";

import { use } from "react";
import { useTransitAction } from "@/shared/hooks/use-transition-provider";

export function ContentCardList({ promise }: { promise: Promise<any> }) {
  const { isPending } = useTransitAction();
  const { data, error } = use(promise);
  return (
    <>
      <h1 className={`${isPending && "opacity-50"}`}>
        {isPending ? "pending" : "content"}
      </h1>
    </>
  );
}
