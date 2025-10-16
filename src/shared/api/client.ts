import { paths } from './v1';
import createClient from "openapi-fetch"

export const client = createClient<paths>({
  baseUrl: "http://localhost:3333",
})


const getContent = client.GET('/content/{category}', {
  params: {
    path: {
      category: 'movies'
    },
    query: {
      view: 'all',
      segment: 'instincts',
    }
  }
})