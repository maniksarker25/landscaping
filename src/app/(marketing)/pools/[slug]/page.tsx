import { redirect } from "next/navigation";

interface PoolRedirectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PoolRedirectPage({ params }: PoolRedirectPageProps) {
  const { slug } = await params;
  redirect(`/services/${slug}`);
}
