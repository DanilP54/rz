import { Header } from "@/features/rz/Header";
import { Navigation } from "@/features/rz/navigation-panels";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
