import { GlowButton } from "kinetiq-ui";

export const glowButtonDoc = {
  slug: "glow-button",
  category: "button",

  preview: () => <GlowButton>Click Me</GlowButton>,

  code: `
import { GlowButton } from "kinetiq-ui"

export default function Example() {
  return <GlowButton>Click Me</GlowButton>
}
`,

  manual: `
import { motion } from "motion/react"

export function GlowButton({ children }) {
  return (
    <motion.button>
      {children}
    </motion.button>
  )
}
`,
};
