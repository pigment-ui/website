import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Button } from "#/ui/button";

export function Footer() {
  return (
    <footer className="w-full border-t border-t-default-1000/20 py-8">
      <div className="container flex items-center justify-between">
        <p className="text-sm text-default-500">&copy; 2024 Pigment UI</p>

        <Button asChild isIconOnly variant="light" radius="full" className="[&:not(:hover)]:text-default-500">
          <a href="https://www.linkedin.com/company/pigment-ui" target="_blank">
            <LinkedInLogoIcon />
          </a>
        </Button>
      </div>
    </footer>
  );
}
