// components/PreviewRenderer.tsx
"use client";

import dynamic from "next/dynamic";

const previewMap = {
  buttons: {
    ShareButtonPreview: dynamic(
      () => import("./previews/buttons/SlideRevealShareButtonPreview"),
      { ssr: false },
    ),
  },
  // cards: {
  //   ExampleCardPreview: dynamic(
  //     () => import("./previews/cards/ExampleCardPreview"),
  //     { ssr: false },
  //   ),
  // },
};

type Props = {
  componentName: string;
  category: string;
};

export default function PreviewRenderer({ componentName, category }: Props) {
  const Component = previewMap[category]?.[componentName];
  if (!Component) return null;
  return <Component />;
}
