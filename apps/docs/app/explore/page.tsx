"use client";

import { useState } from "react";
import Link from "next/link";
import { components } from "@/content/components";
import { componentRegistry } from "@/components/registry";
import { categories } from "@/content/categories";

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("button");

  const filtered = components.filter((c) => c.category === activeCategory);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Components</h2>

        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`block w-full text-left px-3 py-2 rounded-lg transition ${
              activeCategory === cat.slug ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((component) => {
            const entry =
              componentRegistry[
                component.slug as keyof typeof componentRegistry
              ];

            const Preview = entry?.preview;

            return (
              <Link
                key={component.slug}
                href={`/components/${component.slug}`}
                className="border rounded-xl p-6 hover:border-white/40 transition"
              >
                <div className="flex justify-center mb-6">
                  {Preview && <Preview />}
                </div>

                <h3 className="font-semibold">{component.name}</h3>

                <p className="text-sm text-white/60 mt-2">
                  {component.description}
                </p>
              </Link>
            );
          })}{" "}
        </div>
      </main>
    </div>
  );
}
