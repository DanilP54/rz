import { Header } from "@/features/rz/Header";
import { Navigation } from "@/features/rz/navigation-panels";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div
      className=" 
      [&:has(#page[data-hassegment=true])_#globalsearch]:text-black/50
      [&:has(#page[data-hassegment=true])_#globalsearch]:bg-black/10  
      [&:has(#page[data-hassegment=true])_#globalsearch]:border-black/10       
      [&:has(#page[data-segment=instincts])_#header]:bg-instincts 
      [&:has(#page[data-segment=intellect])_#header]:bg-intellect 
      [&:has(#page[data-segment=balance])_#header]:bg-balance">
      <Header />
      <Navigation />
      {children}
    </div>
  );
}
