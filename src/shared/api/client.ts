import { paths } from './v1';
import createClient from "openapi-fetch"

export const client = createClient<paths>({
  baseUrl: "http://172.17.0.1:3333",

})

