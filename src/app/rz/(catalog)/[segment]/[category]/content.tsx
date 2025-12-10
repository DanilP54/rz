"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useFiltersTransition } from "@/modules/rz/filters";


export function ContentCardList({ promise }: { promise: Promise<any> }) {
  const { isPending } = useFiltersTransition();
  const data = use(promise)
  console.log(data)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <>
      <h1 className={mounted && isPending ? "opacity-50" : ""}>
        {<Link href={`/rz/instincts/movies/artistic-vision`}>{data.items[0].title}</Link> }
      </h1>
    </>
  );
}
