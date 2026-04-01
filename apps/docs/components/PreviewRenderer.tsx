// // components/PreviewRenderer.tsx
// "use client";
//
// import dynamic from "next/dynamic";
//
// const previewMap = {
//   buttons: {
//     RevealButtonPreview: dynamic(
//       () => import("./previews/buttons/RevealButtonPreview"),
//       { ssr: false },
//     ),
//   },
//   // cards: {
//   //   ExampleCardPreview: dynamic(
//   //     () => import("./previews/cards/ExampleCardPreview"),
//   //     { ssr: false },
//   //   ),
//   // },
// };
//
// type Props = {
//   componentName: string;
//   category: string;
// };
//
// export default function PreviewRenderer({ componentName, category }: Props) {
//   const Component = previewMap[category]?.[componentName];
//   if (!Component) return null;
//   return <Component />;
// }

// components/PreviewRenderer.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";

// 1. Statically list your previews
const previewMap = {
  buttons: {
    RevealButtonPreview: dynamic(
      () => import("./previews/buttons/RevealButtonPreview"),
      { ssr: false },
    ),
  },
  // cards: {
  //   ExampleCardPreview: dynamic(
  //     () => import("./previews/cards/ExampleCardPreview"),
  //     { ssr: false }
  //   ),
  // },
};

// 2. Types
type PreviewMapType = typeof previewMap;
type Category = keyof PreviewMapType;
type ComponentName<C extends Category> = keyof PreviewMapType[C];

type Props<C extends Category> = {
  category: C;
  componentName: ComponentName<C>;
};

// 3. Wrapper to get proper JSX type
export default function PreviewRenderer<C extends Category>({
  category,
  componentName,
}: Props<C>) {
  const Component = previewMap[category][
    componentName
  ] as React.ComponentType<any>;
  // ✅ cast to React.ComponentType<any> so TS knows it's renderable
  if (!Component) return null;
  return <Component />; // ✅ TS will now accept it
}
