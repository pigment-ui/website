import { allDocs } from "contentlayer/generated";
import { capitalize } from "inflection";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Content, Detail, NavLeft, NavRight } from "#/components";

export function generateMetadata({ params: { slug } }: { params: { slug: string[] } }): Metadata {
  const doc = allDocsSorted.find((doc) => doc.slug === slug.join("/"));

  return {
    title: `Pigment UI | Docs - ${capitalize(slug[1])}`,
    description: doc?.description,
  };
}

export async function generateStaticParams() {
  return allDocsSorted.map((doc) => ({
    slug: doc.slug.split("/"),
  }));
}

export default function Page({ params: { slug } }: { params: { slug: string[] } }) {
  const doc = allDocsSorted.find((doc) => doc.slug === slug.join("/"));
  if (!doc) notFound();

  return (
    <>
      <main className="container relative max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-12">
        <NavLeft doc={doc} allDocs={allDocsSorted} />
        <Content doc={doc} allDocs={allDocsSorted} />
        <NavRight doc={doc} />
      </main>

      <Detail />
    </>
  );
}

const partFilter = (str: string) =>
  str
    .split("/")
    .map((slugPart) => (!isNaN(parseInt(slugPart.slice(0, 2))) ? slugPart.slice(3) : slugPart))
    .join("/");

const allDocsSorted = allDocs
  .sort((a, b) => a.slug.localeCompare(b.slug))
  .map((doc) => ({ ...doc, slug: partFilter(doc.slug), url: partFilter(doc.url) }));
