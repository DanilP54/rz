import { FiltersBar, FiltersTransitionProvider, loadSearchParams } from "@/modules/rz/filters";
import { Suspense } from "react";
import { PageProps } from "@/app/rz/types";
import { getFilters } from "@/modules/rz/filters/config/config";
import { Container } from "@radix-ui/themes";
import { fetchCatalogCategory } from "@/modules/rz";
import dynamic from "next/dynamic";

const MovieCatalogCards = dynamic(() => import('@/modules/rz/movie-catalog.cards'));


function renderList(category: "music" | "movies" | "books" | "art", dataPromise: Promise<any>) {
  const cardList = {
    movies: <MovieCatalogCards dataPromise={dataPromise} />,
    music: <MovieCatalogCards dataPromise={dataPromise} />,
    books: <MovieCatalogCards dataPromise={dataPromise} />,
    art: <MovieCatalogCards dataPromise={dataPromise} />
  }
  return cardList[category]
}

interface RzPageProps { }

export default async function Page(props: PageProps) {

  const { segment, category } = await props.params;
  const searchParams = await loadSearchParams(props.searchParams);

  const isModeInvalid = searchParams.mode && !searchParams.topic
  const mode = isModeInvalid ? undefined : (searchParams.mode ?? undefined)
  const topic = searchParams.topic ?? undefined

  const responsePromise = fetchCatalogCategory(category, {
    page: searchParams.page,
    limit: searchParams.limit,
    mode, topic, segment,
  })

  const { rules, options } = getFilters(segment, category);

  return (
    <div
      id={"page"}
      data-segment={segment}
      data-hassegment={String(Boolean(segment))}
    >
      <Container size="4" px={{ initial: '5', md: '8' }} py="6">
        <FiltersTransitionProvider>
          <FiltersBar
            rules={rules}
            options={options}
            segment={segment}
            category={category}
            isMobileDevice={false}
          />
          <Suspense fallback={<CatalogSkeleton />}>
            {renderList(category, responsePromise)}
          </Suspense>
        </FiltersTransitionProvider>
      </Container>
    </div>
  );
}


export const CatalogSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border border-gray-100 bg-white">
          <div className="w-full aspect-[4/3] bg-gray-200" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-200 w-3/4" />
            <div className="h-3 bg-gray-200 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
