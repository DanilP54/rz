"use client"

import { use } from "react";
import { useContextCus } from "./prov";

export function Content({ promise }: { promise: Promise<unknown> }) {

  const { isPending } = useContextCus();
  console.log(isPending);
  const data = use(promise);
  return (
    <>
      <h1>{isPending ? 'pending' : 'content'}</h1>
    </>
  );
}
