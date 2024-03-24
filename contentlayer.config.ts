import { ComputedFields, defineDocumentType, makeSource } from "contentlayer/source-files";

const computedFields: ComputedFields = {
  url: { type: "string", resolve: (doc) => `/${doc._raw.flattenedPath}` },
  slug: { type: "string", resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/") },
};

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    hasSource: { type: "boolean", required: false },
    referenceUrl: { type: "string", required: false },
  },
  computedFields,
}));

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blogs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields,
}));

export const Example = defineDocumentType(() => ({
  name: "Example",
  filePathPattern: `examples/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Doc, Blog, Example],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
