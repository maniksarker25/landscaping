import { redirect } from "next/navigation";
import { getAllStaticPoolSlugs } from "@/data/pools-static-data";

interface PoolRedirectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllStaticPoolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PoolRedirectPage({ params }: PoolRedirectPageProps) {
  const { slug } = await params;
  redirect(`/services/${slug}`);
}
