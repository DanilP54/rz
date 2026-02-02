import { Navigation } from "@/modules/rz/navigation";
import { RzHeader } from "./rz.header"
import React from "react";
import { InitPageParams } from "./navigation/InitPageParams";

export async function RzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RzHeader />
      <InitPageParams />
      <Navigation  />
      {/* </InitPageParams> */}
      {children}
    </>
  );
}
