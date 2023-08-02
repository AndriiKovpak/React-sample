import { defineConfig } from "@openapi-codegen/cli";
import { generateFetchers, generateSchemaTypes } from "@openapi-codegen/typescript";
export default defineConfig({
  restApi: {
    from: { source: "url", url: "http://localhost:5000/api-json" },
    outputDir: "src/rest",
    to: async (context) => {
      const filenamePrefix = "Api";
      const { schemasFiles } = await generateSchemaTypes(context, { filenamePrefix });
      await generateFetchers(context, { filenamePrefix, schemasFiles });
    },
  },
});
