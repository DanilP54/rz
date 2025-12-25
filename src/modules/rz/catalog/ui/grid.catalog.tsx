import React from "react";

export const CatalogGrid = (props: React.ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={`grid w-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-16 pb-4 ${props.className}`}
    />
  );
};