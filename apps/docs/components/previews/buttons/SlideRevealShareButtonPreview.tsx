"use client";

import { SlideRevealShareButton } from "kinetiq-ui";
import { Twitter, Link, GithubIcon } from "lucide-react";
export default function ShareButtonPreview() {
  return (
    <SlideRevealShareButton
      label="Share"
      icons={[
        <Twitter size={18} />,
        <GithubIcon size={18} />,
        <Link size={18} />,
      ]}
    />
  );
}
