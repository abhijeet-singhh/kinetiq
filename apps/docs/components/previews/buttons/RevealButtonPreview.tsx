"use client";

import { RevealButton } from "kinetiq-ui";
import { Twitter, Link, GithubIcon } from "lucide-react";
export default function RevealButtonPreview() {
  return (
    <RevealButton
      label="Share"
      icons={[
        <Twitter size={18} />,
        <GithubIcon size={18} />,
        <Link size={18} />,
      ]}
    />
  );
}
