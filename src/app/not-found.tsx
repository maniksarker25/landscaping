import Link from "next/link";
import { Waves, ArrowLeft } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary">
            <Waves className="h-8 w-8" aria-hidden="true" />
          </span>
          <h1 className="mt-8 font-display text-4xl">Page not found</h1>
          <p className="mt-3 max-w-sm text-muted-foreground">
            The page you&apos;re looking for may have moved or no longer exists.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
          </Button>
        </Container>
      </main>
      <Footer />
    </>
  );
}
