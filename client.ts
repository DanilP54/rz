import { paths } from './api/v1';
import createClient from "openapi-fetch"

const client = createClient<paths>({
  baseUrl: "http://localhost:8000"
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