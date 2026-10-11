"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CopyEmail({ email = "pandrajuisaac@outlook.com" }: { email?: string }) {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimeout.current) clearTimeout(resetTimeout.current);
  }, []);

  async function copy() {
    if (resetTimeout.current) clearTimeout(resetTimeout.current);
    setStatus("copying");

    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }

    resetTimeout.current = setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <button
      type="button"
      className="copy-email"
      data-status={status}
      title="Copy email address"
      aria-label={status === "copied" ? "Email address copied" : "Copy email address"}
      disabled={status === "copying"}
      onClick={copy}
    >
      {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      <span role="status" aria-live="polite">
        {status === "copied" ? "Copied!" : status === "error" ? "Use the email link" : "Copy email"}
      </span>
    </button>
  );
}
