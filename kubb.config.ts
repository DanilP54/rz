import { defineConfig } from '@kubb/core'
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";
import { pluginClient } from '@kubb/plugin-client';
import { pluginOas } from '@kubb/plugin-oas'

export default defineConfig({
  name: 'rzWeb',
  root: '.',
  input: {
    path: './schema.yaml',
  },
  output: {
    path: './src/common/api/gen',
    clean: true,
    barrelType: 'named'
  },
  plugins: [
    pluginOas(),
    pluginTs({
        output: {
          path: 'types',
        },
        group: {
          type: 'tag',
          name: ({group}) => `${group}Type`,
        },
        enumType: 'asConst',
        enumSuffix: '' 
      }),
    pluginClient({
        baseURL: 'http://localhost:3333',
        client: 'fetch',
        output: {
          path: 'clients',
        },
        group: {
          type: 'tag',
          name: ({group}) => `${group}Client`,
        },
      }),
    // pluginZod({
    //     output: {
    //       path: "schemas",
    //     },
    //     group: { type: "tag", name: ({ group }) => `${group}Schema` },
    //     typed: true,
    //     dateType: "stringOffset",
    //     unknownType: "unknown",
    //     importPath: "zod",
    //     coercion: true, 
    //   })
  ]
})