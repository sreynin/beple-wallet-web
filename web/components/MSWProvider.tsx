"use client";

import { useEffect, useState, type ReactNode } from "react";

async function initMSW() {
  const { worker } = await import("@/mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}

function isNativeWebView(): boolean {
  if (typeof window === "undefined") return false;
  // React Native WebView injects this before content loads
  if ((window as unknown as Record<string, unknown>).__BEPLE_NATIVE__) return true;
  // Fallback: ReactNativeWebView bridge exists
  if ((window as unknown as Record<string, unknown>).ReactNativeWebView) return true;
  return false;
}

export function MSWProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(
    process.env.NEXT_PUBLIC_API_MOCKING !== "enabled",
  );

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING !== "enabled") return;

    // Skip MSW entirely inside a native WebView — service workers are unsupported
    if (isNativeWebView()) {
      setReady(true);
      return;
    }

    let done = false;
    const finish = () => { if (!done) { done = true; setReady(true); } };

    // Guarantee render within 1s regardless of MSW status
    const timeout = setTimeout(finish, 1000);

    initMSW().then(finish).catch(finish);

    return () => clearTimeout(timeout);
  }, []);

  return ready ? <>{children}</> : null;
}
