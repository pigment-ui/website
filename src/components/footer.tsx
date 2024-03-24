import { LinkedInLogoIcon } from "@radix-ui/react-icons";

export function Footer() {
  return (
    <footer className="w-full border-t border-t-default-200 py-8">
      <div className="container flex justify-between">
        <p className="text-sm text-default-500">&copy; 2024 Pigment UI</p>

        <div className="flex gap-x-4 [&>a]:text-default-500 hover:[&>a]:text-default-1000 focus-visible:[&>a]:outline-default-1000">
          <a href="https://www.linkedin.com/company/pigment-ui" target="_blank">
            <LinkedInLogoIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
