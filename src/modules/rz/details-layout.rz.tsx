import React from "react";
import { getColorOfSegment } from "@/common/lib/segment-bg-colors";
import { DetailsRzHeader } from "./details-header.rz";
import { RzPathParamsProps } from "./types";

type DetailsPathParamsProps = {
  slug: string;
} & RzPathParamsProps;

interface DetailsRzLayoutProps {
  params: Promise<DetailsPathParamsProps>;
  children: React.ReactNode;
}

export async function DetailsLayout({ params, children }: DetailsRzLayoutProps) {
  const { segment, category, slug } = await params;
  return (
    <div
      className={`${getColorOfSegment(
        segment
      )} flex flex-col h-screen text-black overflow-auto`}
    >
      <DetailsRzHeader />
      {/* {!fullscreen && <DetailsHeader variant={variant} />} */}
      <div className="grow grid grid-cols-1 p-3 justify-center sm:p-0 sm:justify-normal sm:grid-cols-[1fr_6fr_1fr] lg:grid-cols-[1fr_3fr_1fr]">
        <section className="hidden sm:block bg-neutral-800 p-5 text-neutral-300">
          {/* {!fullscreen && <RouteBackButton />} */}
        </section>
        <main className="bg-background rounded-xs shadow-2xl shadow-black/70 ">
          {children}
        </main>
        <section className="hidden sm:block bg-neutral-800"></section>
      </div>
    </div>
  );
}
