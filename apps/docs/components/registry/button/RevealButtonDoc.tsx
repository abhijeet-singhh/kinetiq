export const RevealButtonDoc = {
  slug: "reveal-button",
  category: "buttons",

  previewComponent: "RevealButtonPreview",

  code: `
import { ShareButton } from "kinetiq-ui"

export default function Example() {
  return <ShareButton>Share</ShareButton>
}
`,

  manual: `
"use client";

import { Share2, Link, Twitter, GithubIcon } from "lucide-react";
import { motion, Variants } from "motion/react";

const pillVariants: Variants = {
  rest: { x: 0, transition: { type: "spring", stiffness: 230, damping: 25 } },
  hover: { x: "90%", transition: { type: "spring", stiffness: 230, damping: 20 } },
};

const iconVariants: Variants = {
  rest: { x: -14, opacity: 0, scale: 0.8 },
  hover: { x: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

const containerVariants: Variants = {
  hover: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  rest: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const icons = [Twitter, GithubIcon, Link];

export const Button1 = () => {
  return (
    <motion.button
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="relative w-56 h-14 bg-indigo-600 rounded-full overflow-hidden flex items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-indigo-500/60 transition-shadow duration-300 ease-out border-4 border-indigo-600"
    >
      <motion.div
        variants={containerVariants}
        className="absolute inset-0 flex items-center justify-start gap-4 px-8 text-white"
      >
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            variants={iconVariants}
            className="p-2 flex items-center justify-center"
          >
            <Icon className="size-5 hover:scale-125 transition-transform duration-200" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={pillVariants}
        className="absolute inset-0 bg-white rounded-full flex items-center justify-center gap-3 font-bold text-indigo-600 z-10 pointer-events-none"
      >
        <Share2 className="w-5 h-5" />
        <span className="tracking-wide uppercase text-sm select-none">Share</span>
      </motion.div>
    </motion.button>
  );
};
`,
};
