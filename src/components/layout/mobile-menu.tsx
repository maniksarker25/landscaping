"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary transition-colors hover:bg-muted lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in lg:hidden" />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-[70] flex h-full w-full max-w-sm flex-col bg-background shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300 lg:hidden"
          aria-describedby={undefined}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-border px-5">
            <Dialog.Title className="font-display text-lg tracking-tight text-primary">
              {siteConfig.name}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-primary transition-colors hover:bg-muted"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <nav
            aria-label="Mobile"
            className="flex-1 overflow-y-auto px-5 py-2"
          >
            <ul className="flex flex-col">
              {siteConfig.nav.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : Boolean(pathname?.startsWith(item.href));


                if (item.children?.length) {
                  return (
                    <li key={item.href}>
                      <Accordion type="single" collapsible>
                        <AccordionItem value={item.href}>
                          <AccordionTrigger
                            className={cn(isActive && "text-accent")}
                          >
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="flex flex-col gap-1">
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className="block rounded-md px-2 py-2 text-sm text-foreground/70 transition-colors hover:bg-muted hover:text-accent"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <Link
                              href={item.href}
                              className="mt-1 flex items-center gap-1 rounded-md px-2 py-2 text-sm font-medium text-accent"
                            >
                              View all {item.label.toLowerCase()}
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.href}
                    className="border-b border-border last:border-b-0"
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block py-4 text-base font-medium tracking-wide transition-colors hover:text-accent",
                        isActive ? "text-primary" : "text-foreground/80"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-border p-5">
            <Button asChild className="w-full">
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}