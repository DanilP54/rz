import { client } from "@/common/api/client";
import { NavSegments, SegmentCategory } from "@/common/model/routes";

import { components } from "@/common/api/v1";


type Params = {
  segment?: components["schemas"]["Segment"],
  topic?: components["schemas"]["Topic"],
  mode?: 'works' | 'creators'
  page?: number,
  limit?: number,
}

export const fetchCatalogCategory = async <T>(
  category: SegmentCategory<NavSegments>,
  query?: Params): Promise<components["schemas"]["CatalogResponse"]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    const result = await client.GET('/catalog/{category}', {
      params: { 
        path: { category },
        query: {...query}
      }
    })

    if(!result.data) {
      throw new Error('no data')
    }

    return result.data
  }
  catch(error) {
    throw error
  }
}