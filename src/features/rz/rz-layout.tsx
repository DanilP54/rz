import { RzHeader } from "./rz-header";

export function RzLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="
            [&:has([data-hassegment=true])_#globalsearch]:text-black/60
            [&:has([data-hassegment=true])_#globalsearch]:bg-black/20  
            [&:has([data-hassegment=true])_#globalsearch]:border-black/30       
            [&:has([data-segment=instincts])_#header]:bg-instincts 
            [&:has([data-segment=intellect])_#header]:bg-intellect 
            [&:has([data-segment=balance])_#header]:bg-balance"
    >
      <RzHeader />
      {children}
    </div>
  );
}
