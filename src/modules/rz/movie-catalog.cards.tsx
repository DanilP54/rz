"use client"
import { Box, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { use } from "react";
import { components } from "@/common/api/v1";
import { CarouselDemo } from "./carousel";

type CatalogResponse = components["schemas"]["CatalogResponse"]
type MovieMeta = components["schemas"]["CatalogMovieMeta"]


export default function MovieCatalogCards({ dataPromise }: { dataPromise: Promise<CatalogResponse> }) {

  const data = use(dataPromise);

  if (!data || data.items.length === 0) {
    return <NotFoundItems />
  }

  return (
    <CardsGrid>
      {data.items.map((item, idx) => (
        <CardItem key={item.id || idx} data={item} />
      ))}
    </CardsGrid>
  );
};


export const CardItem = ({ data }: { data: components["schemas"]["CatalogItem"] }) => {
  const a = data.metadata
  // const {id, title, coverUrl, metadata, subtitle, images } = data

  const slides = [
    { id: '1', imageUrl: '', alt: '1' },
    { id: '2', imageUrl: '', alt: '2' },
  ];




  return (
    <Box width="100%" height="100%">
      <Card size="1" variant="surface" style={{ borderRadius: 0, padding: 0 }} className="group/card h-full hover:border-gray-400 transition-colors duration-300">
        <Flex direction="column" height="100%">
          <Box className="relative w-full group aspec-4/3 bg-gray-100">
            <CarouselDemo slides={slides} />
            <MoviePayload />
          </Box>
          <Box p="3">
            <Flex justify="between" align="start" gap="2">
              <Box>
                <Text as="div" size="2" weight="bold" className="uppercase tracking-wide text-gray-900 truncate">
                  {data.title}
                </Text>
                <Text as="div" size="1" color="gray" className="mt-1">
                  Action • 2024
                </Text>
              </Box>
              <Box>
                <Text size="1" className="font-mono border border-gray-200 px-1 py-0.5 text-gray-500">
                  HD
                </Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};


function MoviePayload({movieUrl}: {movieUrl?: string}) {
  // логика запуска просмотра фильма с менеджером состояний
  
  // диалоговое окно для плеера
  
  return (
    <button className="absolute bottom-0 left-0 bg-black cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
      <PlayIcon />
    </button>
  )
}


function NotFoundItems() {
  return (
    <Box p="9" className="text-center text-gray-500">
      No items found
    </Box>
  )
}

function CardsGrid({ children }: { children: React.ReactNode }) {
  return (
    <Grid columns={{ initial: "1", xs: "2", sm: "3", md: "4", lg: "5", xl: "6" }} gap="4" width="auto" className="mt-15">
      {children}
    </Grid>
  )
}


const PlayIcon = (props: any) => (
  <svg width="40" height="40" viewBox="0 0 65 65" fill="none" {...props} className="drop-shadow-lg transition-transform hover:scale-105">
      <path d="M25.2639 31.7832L25.2639 19.5193L46.6377 31.8543L25.2639 44.0471L25.2639 31.7832Z" fill="white" />
  </svg>
);