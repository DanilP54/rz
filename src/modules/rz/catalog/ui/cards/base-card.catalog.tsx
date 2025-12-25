import { Card, CardContent, CardFooter } from "@/common/components/ui/card";
import Image from "next/image";
import React from "react";

export interface BaseCardItemProps {
  title: React.ReactNode;
  subtitle: string;
  coverUrl: string;
  slug: string;
  badgeSlot?: string;
  actionSlot?: React.ReactNode;
}

export const BaseCardItem = ({
  title,
  subtitle,
  coverUrl,
  badgeSlot,
  actionSlot,
  slug,
}: BaseCardItemProps) => {
  return (
    <Card className="group/card w-full h-full hover:border-gray-400 transition-colors duration-300 rounded-none p-0">
      <div className="flex flex-col h-full">
        <CardContent className="relative w-full group aspect-video bg-gray-100">
          <Image alt="sdas" src={coverUrl} fill />
          {actionSlot}
        </CardContent>
        <CardFooter className="flex justify-between gap-2 p-2">
          <div className="flex flex-col gap-1">
            <span className="uppercase tracking-wide text-gray-900 text-sm truncate font-bold">
                {title}
            </span>
            <span className="text-sm text-gray-500 truncate">{subtitle}</span>
          </div>
          <div className=" self-start">
            <span className="font-mono border flex justify-center items-center border-gray-200 px-1 text-sm text-gray-500">
              {badgeSlot}
            </span>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};
