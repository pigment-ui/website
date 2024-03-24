import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";

import { Content, NavLeft, NavRight } from "../_components";

const partFilter = (str: string) =>
  str
    .split("/")
    .map((slugPart) => (!isNaN(parseInt(slugPart.slice(0, 2))) ? slugPart.slice(3) : slugPart))
    .join("/");

const allDocsSorted = allDocs
  .sort((a, b) => a.slug.localeCompare(b.slug))
  .map((doc) => ({ ...doc, slug: partFilter(doc.slug), url: partFilter(doc.url) }));

export default function Page({ params: { slug } }: { params: { slug: string[] } }) {
  const doc = allDocsSorted.find((doc) => doc.slug === slug.join("/"));
  if (!doc) notFound();

  return (
    <main className="container relative lg:grid lg:grid-cols-12">
      <NavLeft doc={doc} allDocs={allDocsSorted} />
      <Content doc={doc} allDocs={allDocsSorted} />
      <NavRight doc={doc} />
    </main>
  );
}
