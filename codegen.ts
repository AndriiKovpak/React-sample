import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:5000/graphql",
  documents: "./src/graphql/gql/**/*.gql",
  overwrite: true,
  generates: {
    "src/graphql/urql-codegen/code.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        withHooks: true,
        withComponent: true,
      },
    },
    "src/graphql/urql-codegen/introspection.json": {
      plugins: ["urql-introspection"],
    },
  },
};

export default config;
