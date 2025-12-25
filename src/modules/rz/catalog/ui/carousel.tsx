"use client";
import { Card, CardContent } from "@/common/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/common/components/ui/carousel";

interface ICarousel {
  slides: any[];
}

export const CarouselDemo = ({ slides }: ICarousel) => {
  return (
    <Carousel className="w-full h-full rounded-none">
      <CarouselContent className=" rounded-none">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="rounded-none">
            <div className="p-1">
              <Card className=" rounded-none">
                <CardContent className="flex aspect-square items-center justify-center p-6 rounded-none">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
