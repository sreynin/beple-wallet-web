import { createRef } from "react";
import type WebView from "react-native-webview";

// Shared ref — index.tsx assigns it, KYC screens use it to post back
export const webViewRef = createRef<WebView>();

// ── Message shapes (mirror web/lib/native-bridge.ts) ─────────────────────────

// Web → Native
export type ToNativeMessage =
  | { type: "KYC_PASSPORT_START" }
  | { type: "KYC_FACE_START" }
  | { type: "KYC_BIOMETRIC_START" }
  | { type: "KYC_PIN_START" };

// Native → Web
export type ToWebMessage =
  | { type: "KYC_PASSPORT_DONE"; ocr: Record<string, string> }
  | { type: "KYC_FACE_DONE" }
  | { type: "KYC_BIOMETRIC_DONE" }
  | { type: "KYC_BIOMETRIC_SKIP" }
  | { type: "KYC_PIN_DONE"; pin: string };

/** Send a result from a native KYC screen back into the web page */
export const postToWeb = (message: ToWebMessage): void => {
  webViewRef.current?.postMessage(JSON.stringify(message));
};
