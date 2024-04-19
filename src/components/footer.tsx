import { LinkedinIcon } from "lucide-react";
import { Button } from "#/ui/button";

export function Footer() {
  return (
    <footer className="flex h-24 w-full items-center border-t border-t-default-1000/20">
      <div className="container flex items-center justify-between">
        <p className="text-sm text-default-500">&copy; 2024 Pigment UI</p>

        <Button asChild isIconOnly variant="light" radius="full" className="[&:not(:hover)]:text-default-500">
          <a href="https://www.linkedin.com/company/pigment-ui" target="_blank">
            <LinkedinIcon />
          </a>
        </Button>
      </div>
    </footer>
  );
}
