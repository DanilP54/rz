import { defineConfig } from 'orval';

export default defineConfig({
  rzweb: {
    input: {
      target: './schema.yaml',
    },
    output: {
      mode: 'tags-split',
      client: 'fetch',
      target: 'src/common/api/endpoints',
      schemas: 'src/common/api/models',
      baseUrl: 'http://172.17.0.1:3333'
    },
  },
  rzwebZod: {
    input: {
      target: './schema.yaml',
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: 'src/common/api/endpoints',
      fileExtension: '.zod.ts',
      baseUrl: 'http://172.17.0.1:3333'
    },
  },
});