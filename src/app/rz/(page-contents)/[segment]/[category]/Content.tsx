"use client";

import { use, useEffect, useState } from "react";
import { useTransitAction } from "../../TransitionProvider";


export function ContentCardList({ promise }: { promise: Promise<any> }) {
  const { isPending } = useTransitAction();
  const data = use(promise)
  console.log(data)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <>
      <h1 className={mounted && isPending ? "opacity-50" : ""}>
        {mounted && isPending ? "pending" : "content"}
      </h1>
    </>
  );
}
