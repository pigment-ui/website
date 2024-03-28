"use client";

import NextLink from "next/link";
import { useTheme } from "next-themes";
import { Button } from "#/ui/button";
import { useEffect, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { GitHubLogoIcon, Half2Icon, HamburgerMenuIcon, MagnifyingGlassIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { DialogTrigger, MenuTrigger } from "react-aria-components";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "#/ui/modal";
import { Popover } from "#/ui/popover";
import { twMerge } from "tailwind-merge";
import { Menu, MenuItem } from "#/ui/menu";

export function Header() {
  const segment = useSelectedLayoutSegment();

  const routes = [
    ["/docs/overview/introduction", "Docs"],
    // ["/blogs", "Blogs"],
    // ["/examples", "Examples"],
  ].map(([href, title]) => (
    <Button
      key={title}
      asChild
      variant={href.split("/")[1] === segment ? "soft" : "light"}
      className={twMerge(href.split("/")[1] !== segment && "text-default-500", "justify-start")}
    >
      <NextLink href={href} prefetch onClick={() => setIsOpened(false)}>
        {title}
      </NextLink>
    </Button>
  ));

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-default-200 bg-default-0/75 backdrop-blur-lg">
      <div className="container flex h-full items-center gap-x-8">
        <NextLink href="/" prefetch className="text-xl font-bold focus-visible:outline-default-1000">
          Pigment UI
        </NextLink>

        <div className="flex gap-x-4 max-sm:hidden">{routes}</div>

        <div className="ml-auto flex gap-x-2">
          <Button asChild isIconOnly variant="faded">
            <a href="https://github.com/pigment-ui" target="_blank">
              <GitHubLogoIcon />
            </a>
          </Button>

          <MenuTrigger>
            <Button isIconOnly variant="faded">
              {mounted ? theme === "light" ? <SunIcon /> : theme === "dark" ? <MoonIcon /> : <Half2Icon /> : <Half2Icon />}
            </Button>
            <Menu onAction={(key) => setTheme((key as string).toLowerCase())} placement="bottom end" className="w-32">
              <MenuItem>Light</MenuItem>
              <MenuItem>Dark</MenuItem>
              <MenuItem>System</MenuItem>
            </Menu>
          </MenuTrigger>

          <DialogTrigger isOpen={isOpened} onOpenChange={setIsOpened}>
            <Button isIconOnly variant="faded" className="sm:hidden">
              <HamburgerMenuIcon />
            </Button>
            <Popover className="flex w-48 flex-col sm:hidden">{routes}</Popover>
          </DialogTrigger>
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
