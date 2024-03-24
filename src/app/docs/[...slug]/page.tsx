import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";

import { Content, NavLeft, NavRight } from "#/components/docs";

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
    <main className="container relative max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-12">
      {/*<div className="sticky top-16 z-20 -ml-4 w-screen bg-red-500 p-8">Menu</div>*/}
      <NavLeft doc={doc} allDocs={allDocsSorted} />
      <Content doc={doc} allDocs={allDocsSorted} />
      <NavRight doc={doc} />
    </main>
  );
}
