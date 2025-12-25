"use client"

import { Category, Segment, getMovieById } from "@/common/api/gen"
import { useQuery } from "@tanstack/react-query"

export function DetailsQuery({
    segment, category, slug
}: {
    segment: Segment;
    category: Category,
    slug: string
}) {

    const {data} = useQuery({
        queryKey: [category, segment, slug],
        queryFn: () => getMovieById(slug)
    })

    console.log(data)

    return (<>{data ? data.title : 'no found'}</>)
}