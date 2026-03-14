export const SlideRevealShareButtonDoc = {
  slug: "sliding-reveal-share-button",
  category: "buttons",

  previewComponent: "ShareButtonPreview",

  code: `
import { ShareButton } from "kinetiq-ui"

export default function Example() {
  return <ShareButton>Share</ShareButton>
}
`,

  manual: `
export function ShareButton({ children }) {
  return <button>{children}</button>
}
`,
};
