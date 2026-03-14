// This file does NOT contain React components. It only stores metadata.

export type ComponentMeta = {
  slug: string;
  name: string;
  description: string;
  category: string;
};

export const components: ComponentMeta[] = [
  {
    slug: "sliding-reveal-share-button",
    name: "Sliding Reveal Share Button",
    description: "Animated share button",
    category: "button",
  },
];
