// Augment window so TypeScript knows about the RN WebView injection
declare global {
  interface Window {
    ReactNativeWebView?: { postMessage: (msg: string) => void };
  }
}

// ── Message shapes ────────────────────────────────────────────────────────────

// Web → Native (web tells native to open a KYC screen)
export type ToNativeMessage =
  | { type: "KYC_PASSPORT_START" }
  | { type: "KYC_FACE_START" }
  | { type: "KYC_BIOMETRIC_START" }
  | { type: "KYC_PIN_START" };

// Native → Web (native sends result back to web)
export type ToWebMessage =
  | { type: "KYC_PASSPORT_DONE"; ocr: Record<string, string> }
  | { type: "KYC_FACE_DONE" }
  | { type: "KYC_BIOMETRIC_DONE" }
  | { type: "KYC_BIOMETRIC_SKIP" }
  | { type: "KYC_PIN_DONE"; pin: string };

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns true when running inside the React Native WebView shell */
export const isNativeApp = (): boolean => {
  if (typeof window === "undefined") return false;
  if (window.ReactNativeWebView) return true;
  if ((window as unknown as Record<string, unknown>).__BEPLE_NATIVE__) return true;
  return false;
};

/** Send a message from web → native */
export const sendToNative = (message: ToNativeMessage): void => {
  window.ReactNativeWebView?.postMessage(JSON.stringify(message));
};

/** Subscribe to messages arriving from native → web. Returns an unsubscribe fn. */
export const onNativeMessage = (
  handler: (message: ToWebMessage) => void,
): (() => void) => {
  const listener = (event: MessageEvent) => {
    try {
      const msg = JSON.parse(
        typeof event.data === "string" ? event.data : "",
      ) as ToWebMessage;
      if (msg?.type) handler(msg);
    } catch {
      // ignore non-JSON messages
    }
  };
  // iOS fires on window, Android fires on document
  window.addEventListener("message", listener);
  document.addEventListener("message", listener as EventListener);
  return () => {
    window.removeEventListener("message", listener);
    document.removeEventListener("message", listener as EventListener);
  };
};
