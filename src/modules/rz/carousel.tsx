"use client"

import { Box } from "@radix-ui/themes"
import React, { use } from "react"

const LeftArrowIcon = (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} className="drop-shadow-md">
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const RightArrowIcon = (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} className="drop-shadow-md">
        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PlayIcon = (props: any) => (
    <svg width="40" height="40" viewBox="0 0 65 65" fill="none" {...props} className="drop-shadow-lg transition-transform hover:scale-105">
        <path d="M25.2639 31.7832L25.2639 19.5193L46.6377 31.8543L25.2639 44.0471L25.2639 31.7832Z" fill="white" />
    </svg>
);

interface ICarousel {
    slides: any[]
}

export const CarouselDemo = ({ slides }: ICarousel) => {

    return (
        <>
            <Carousel>
                <CarouselContent>
                    {slides.map(slide => {
                        return <CarouselItem key={slide.id} />
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    )
}


interface CarouselContextProps {
    currentSlide: number
    totalSlides: number
    setTotalSlides: (count: number) => void
    next: () => void
    prev: () => void
}


const CarouselContext = React.createContext<CarouselContextProps | null>(null)


function useCarousel() {
    const context = React.use(CarouselContext)

    if (!context) {
        throw new Error('not found carousel context')
    }

    return context
}

function Carousel({ children, className }: { children: React.ReactNode; className?: string }) {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [totalSlides, setTotalSlides] = React.useState(0)

    const next = React.useCallback(() => {
        setCurrentSlide((prev) => {
            if (totalSlides === 0) return prev
            return prev < totalSlides - 1 ? prev + 1 : 0
        })
    }, [totalSlides])

    const prev = React.useCallback(() => {
        setCurrentSlide((prev) => {
            if (totalSlides === 0) return prev
            return prev > 0 ? prev - 1 : totalSlides - 1
        })
    }, [totalSlides])

    return (
        <CarouselContext.Provider value={{ currentSlide, totalSlides, setTotalSlides, next, prev }}>
            <Box className={`relative w-full h-full overflow-hidden bg-gray-100 group ${className || ''}`}>
                {children}
            </Box>
        </CarouselContext.Provider>
    )
}



function CarouselContent({ children }: { children: React.ReactNode }) {
    const { currentSlide, setTotalSlides } = useCarousel()

    React.useEffect(() => {
        const count = React.Children.count(children)
        setTotalSlides(count)
    }, [children, setTotalSlides])

    return (
        <div
            className="flex w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
            {children}
        </div>
    )
}


function CarouselItem({ className, }: { className?: string }) {
    return (
        <>
            <Box className={`min-w-full w-100 h-70 relative ${className || ''}`}>
                {/* <Image
                                src={slide.url}
                                width={200}
                                height={200}
                                alt={'slide'}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            /> */}
            </Box>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </>
    )
}


function CarouselPrevious({ className }: { className?: string }) {
    const { prev } = useCarousel()
    return (
        <button
            onClick={(e) => {
                e.stopPropagation()
                prev()
            }}
            className={`absolute left-2 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ${className || ''}`}
        >
            <LeftArrowIcon />
        </button>
    )
}


function CarouselNext({ className }: { className?: string }) {
    const { next } = useCarousel()
    return (
        <button
            onClick={(e) => {
                e.stopPropagation()
                next()
            }}
            className={`absolute right-2 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ${className || ''}`}
        >
            <RightArrowIcon />
        </button>
    )
}