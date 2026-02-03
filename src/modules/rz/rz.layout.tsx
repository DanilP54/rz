import { Navigation } from "@/modules/rz/navigation";
import { RzHeader } from "./rz.header"
import React from "react";

export async function RzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RzHeader />

      <Navigation  />
      {/* </InitPageParams> */}
      {children}
    </>
  );
}
