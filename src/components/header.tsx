"use client";

import NextLink from "next/link";
import { useTheme } from "next-themes";
import { Button } from "#/ui/button";
import { useEffect, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { GitHubLogoIcon, Half2Icon, MagnifyingGlassIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { DialogTrigger } from "react-aria-components";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "#/ui/modal";

export function Header() {
  const segment = useSelectedLayoutSegment();

  const routes = [
    ["/docs/overview/introduction", "Docs"],
    // ["/blogs", "Blogs"],
    // ["/examples", "Examples"],
  ];

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-default-200 bg-default-0/75 backdrop-blur-lg">
      <div className="container flex h-full items-center gap-x-8">
        <NextLink href="/" className="text-xl font-bold focus-visible:outline-default-1000" prefetch>
          Pigment UI
        </NextLink>

        <div className="flex gap-x-4">
          {routes.map(([href, title]) => (
            <NextLink
              key={title}
              href={href}
              className={twMerge([
                "rounded-xl px-4 py-2 text-sm focus-visible:outline-default-1000",
                href.split("/")[1] === segment ? "bg-default-100 text-default-1000" : "text-default-500 hover:bg-default-100",
              ])}
              prefetch
            >
              {title}
            </NextLink>
          ))}
        </div>

        <div className="ml-auto flex gap-x-2">
          {/*<SearchButton />*/}
          <GithubButton />
          <ThemeButton />
        </div>
      </div>
    </header>
  );
}

function SearchButton() {
  return (
    <DialogTrigger>
      <Button
        aria-label="General search"
        variant="faded"
        isIconOnly
        startContent={<MagnifyingGlassIcon />}
        endContent="C+K"
        className="text-default-700"
      >
        <div className="w-32 text-start">General Search...</div>
      </Button>
      <Modal size="sm">
        <ModalHeader>Heading</ModalHeader>
        <ModalBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut commodi consequatur cupiditate ducimus ex expedita hic illum
            impedit ipsum itaque minima nemo, neque nisi, nobis non obcaecati officiis perspiciatis, porro quam quod saepe ullam veniam! Cupiditate
            delectus incidunt maxime molestiae placeat quis recusandae sint ullam? Dolor fuga iste pariatur.
          </p>
        </ModalBody>
        <ModalFooter className="flex justify-end gap-4">
          <Button>Click Me</Button>
          <Button autoFocus>Don&apos;t Click Me</Button>
        </ModalFooter>
      </Modal>
    </DialogTrigger>
  );
}

function GithubButton() {
  return (
    <Button asChild isIconOnly variant="faded">
      <a href="https://github.com/pigment-ui" target="_blank">
        <GitHubLogoIcon />
      </a>
    </Button>
  );
}
function ThemeButton() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button isIconOnly variant="faded" onPress={() => setTheme(theme === "light" ? "dark" : "light")}>
      {mounted ? theme === "light" ? <SunIcon /> : theme === "dark" ? <MoonIcon /> : <Half2Icon /> : <Half2Icon />}
    </Button>
  );
}
