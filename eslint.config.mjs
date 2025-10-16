import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import boundariesPlugin from "eslint-plugin-boundaries";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      import: importPlugin,
    },
    
    rules: {
      "import/no-cycle": "error",
      "no-restricted-imports": ['error', {
        patterns: [
          // Ипорт разрешен только из barrel файлов`
          'src/features/**/!(index).{ts,tsx}',
        ],
      }]
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  }

];

export default eslintConfig;

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import boundariesPlugin from "eslint-plugin-boundaries";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      import: importPlugin,
      // boundaries: boundariesPlugin,
    },
    // settings: {
    //   "boundaries/elements": [
    //     { type: "app", pattern: "src/app/*/**", mode: 'folder' },
    //     { type: "features", pattern: "src/features/*/**", mode: 'folder' },
    //     { type: "shared", pattern: "src/shared/*/**", mode: 'folder' },
    //   ],
    // },
    rules: {
      "import/no-cycle": "error",
      // "boundaries/no-private": [2, { "allowUncles": true }],
      // "boundaries/element-types": [
      //   2,
      //   {
      //     default: "disallow",
      //     rules: [
      //       { from: "app", allow: ["app", "features", "shared"] },
      //       { from: "features", allow: ["features", "shared"] },
      //       { from: "shared", allow: ["shared"] },
      //     ],
      //   },
      // ],
      "no-restricted-imports": ['error', {
        patterns: [
          // Ипорт разрешен только из barrel файлов`
          'src/features/**/!(index).{ts,tsx}',
        ],
      }]
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  }

];

export default eslintConfig;
