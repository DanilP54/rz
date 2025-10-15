"use client"

import { use } from "react";
import { useTransitionContext } from "./TransitionProvider";
import { FetchResponse } from "openapi-fetch";
import { paths } from "@/shared/api/v1";

export function ContentCardList({ promise }: { promise: Promise<any> }) {

  const { isPending } = useTransitionContext();
  const {data, error} = use(promise);
  return (
    <>
      <h1>{isPending ? 'pending' : 'content'}</h1>
    </>
  );
}
