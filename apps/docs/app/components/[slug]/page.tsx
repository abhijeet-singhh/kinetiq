export const dynamicParams = true;

import { notFound } from "next/navigation";
import { components } from "@/content/components";
import { componentRegistry } from "@/components/registry";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// export function generateStaticParams() {
//   return components.map((component) => ({
//     slug: component.slug,
//   }));
// }

export function generateStaticParams() {
  console.log("STATIC PARAMS:", components);
  return components.map((component) => ({
    slug: component.slug,
  }));
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;
  console.log("slug:", slug);
  console.log("registry keys:", Object.keys(componentRegistry));

  const component = components.find((c) => c.slug === slug);

  if (!component) return notFound();

  const entry = componentRegistry[slug as keyof typeof componentRegistry];

  if (!entry) return notFound();

  const Preview = entry.preview;

  return (
    <div className="min-h-screen px-8 py-16 max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="text-4xl font-bold">{component.name}</h1>

      {/* Description */}
      <p className="text-white/60 mt-4 text-lg">{component.description}</p>

      {/* Preview Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Preview</h2>

        <div className="border rounded-2xl p-12 flex justify-center bg-white/5">
          <Preview />
        </div>
      </section>

      {/* Installation */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold mb-6">Installation</h2>

        <div className="bg-black/40 p-5 rounded-xl text-sm overflow-x-auto">
          <pre>{`pnpm add kinetiq`}</pre>
        </div>
      </section>

      {/* Usage */}
      {entry.code && (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold mb-6">Usage</h2>

          <div className="bg-black/40 p-5 rounded-xl text-sm overflow-x-auto">
            <pre>{entry.code}</pre>
          </div>
        </section>
      )}

      {/* Manual Installation */}
      {entry.manual && (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold mb-6">Manual Installation</h2>

          <div className="bg-black/40 p-5 rounded-xl text-sm overflow-x-auto">
            <pre>{entry.manual}</pre>
          </div>
        </section>
      )}
    </div>
  );
}
