import { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import WebView, { type WebViewMessageEvent } from "react-native-webview";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { webViewRef, type ToNativeMessage } from "../lib/bridge";
import { WEB_URL } from "../lib/config";

// Inject into the WebView so the web side can detect it's inside native
const INJECTED_JS = `
  (function() {
    window.__BEPLE_NATIVE__ = true;
    try { sessionStorage.setItem('__beple_native', '1'); } catch(e) {}

    // Capture JS errors and probe the failing URL
    var errorProbed = false;
    window.onerror = function(msg, src, line, col, err) {
      try {
        window.ReactNativeWebView && window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'JS_ERROR', msg: String(msg), src: String(src), line: line, ua: navigator.userAgent })
        );
        if (!errorProbed && src && src.indexOf('_next') !== -1) {
          errorProbed = true;
          fetch(src)
            .then(function(r) {
              return r.text().then(function(body) {
                window.ReactNativeWebView && window.ReactNativeWebView.postMessage(
                  JSON.stringify({ type: 'CHUNK_PROBE', status: r.status, ct: r.headers.get('content-type'), preview: body.slice(0, 400) })
                );
              });
            })
            .catch(function(e) {
              window.ReactNativeWebView && window.ReactNativeWebView.postMessage(
                JSON.stringify({ type: 'CHUNK_PROBE_ERR', err: String(e) })
              );
            });
        }
      } catch(e) {}
      return false;
    };
    window.addEventListener('unhandledrejection', function(e) {
      try {
        window.ReactNativeWebView && window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'JS_REJECTION', msg: String(e.reason) })
        );
      } catch(ex) {}
    });
    true;
  })();
`;

export default function WebShell() {
  const router = useRouter();
  const localRef = useRef<WebView>(null);

  // Assign to global bridge ref so KYC screens can post back
  const assignRef = useCallback((ref: WebView | null) => {
    (webViewRef as React.MutableRefObject<WebView | null>).current = ref;
    (localRef as React.MutableRefObject<WebView | null>).current = ref;
  }, []);

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const msg = JSON.parse(event.nativeEvent.data) as ToNativeMessage;
        switch (msg.type) {
          case "JS_ERROR":
            console.error("[WebView] JS_ERROR", msg.msg, msg.src ?? "", "UA:", msg.ua ?? "?");
            break;
          case "JS_REJECTION":
            console.error("[WebView] JS_REJECTION", msg.msg);
            break;
          case "UA_REPORT":
            console.log("[UA]", msg.ua);
            break;
          case "CHUNK_PROBE":
            console.log("[PROBE] status:", msg.status, "ct:", msg.ct);
            console.log("[PROBE] src:", msg.src);
            console.log("[PROBE] preview:", msg.preview);
            break;
          case "CHUNK_PROBE_ERR":
            console.error("[PROBE] fetch error:", msg.err);
            break;
          case "KYC_PASSPORT_START":
            router.push("/kyc/passport");
            break;
          case "KYC_FACE_START":
            router.push("/kyc/face");
            break;
          case "KYC_BIOMETRIC_START":
            router.push("/kyc/biometric");
            break;
          case "KYC_PIN_START":
            router.push("/kyc/pin");
            break;
        }
      } catch {
        // ignore non-JSON messages
      }
    },
    [router],
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WebView
        ref={assignRef}
        source={{
          uri: WEB_URL,
          headers: { "ngrok-skip-browser-warning": "true" },
        }}
        style={styles.webview}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JS}
        onMessage={handleMessage}
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        mediaCapturePermissionGrantType="grant"
        onLoadEnd={() => {
          // Auto-click tunnel warning pages (serveo, ngrok, etc.)
          localRef.current?.injectJavaScript(`
            (function() {
              var all = Array.from(document.querySelectorAll('a,button,input[type=submit]'));
              var btn = all.find(function(el) { return /continue/i.test(el.textContent || el.value || ''); });
              if (btn) btn.click();
            })(); true;
          `);
        }}
        onError={(e) => console.error("[WebView] load error", e.nativeEvent)}
        onHttpError={(e) => console.error("[WebView] HTTP error", e.nativeEvent.statusCode, e.nativeEvent.url)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  webview: { flex: 1 },
});
