import { Header } from "@/features/rz/Header";
import { Navigation } from "@/features/rz/navigation-panels";
import { getFeature } from "@/shared/infra/feature-flag/getFeature";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isEnabled = await getFeature('FEATURE_MESSAGES')
  console.log(isEnabled)

  return (
    <div
      className="
      [&:has([data-hassegment=true])_#globalsearch]:text-black/50
      [&:has([data-hassegment=true])_#globalsearch]:bg-black/10  
      [&:has([data-hassegment=true])_#globalsearch]:border-black/10       
      [&:has([data-segment=instincts])_#header]:bg-instincts 
      [&:has([data-segment=intellect])_#header]:bg-intellect 
      [&:has([data-segment=balance])_#header]:bg-balance">
      <Header />
      <Navigation />
      {children}
    </div>
  );
}
