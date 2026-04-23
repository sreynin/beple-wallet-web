import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { postToWeb } from "../../lib/bridge";

type Status = "waiting" | "scanning" | "blink" | "done" | "error";

const STATUS_TEXT: Record<Status, string> = {
  waiting: "정면을 바라봐 주세요",
  scanning: "얼굴 인식 중...",
  blink: "눈 깜빡임 확인 중...",
  done: "인식 완료",
  error: "인식 실패. 다시 시도해주세요",
};

export default function FaceScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [status, setStatus] = useState<Status>("waiting");

  // Simulate liveness check progression
  useEffect(() => {
    if (status !== "waiting") return;
    const t1 = setTimeout(() => setStatus("scanning"), 1000);
    const t2 = setTimeout(() => setStatus("blink"), 2500);
    const t3 = setTimeout(() => {
      setStatus("done");
      // Brief pause so user sees "인식 완료" before screen closes
      setTimeout(() => {
        postToWeb({ type: "KYC_FACE_DONE" });
        router.back();
      }, 800);
    }, 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [status, router]);

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>카메라 접근 권한이 필요합니다</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>권한 허용</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isError = status === "error";
  const isDone = status === "done";

  return (
    <View style={styles.container}>
      <CameraView style={StyleSheet.absoluteFill} facing="front" />

      {/* Dark overlay */}
      <View style={[StyleSheet.absoluteFill, styles.overlay, { pointerEvents: "none" }]} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>얼굴을 인식해주세요</Text>
      </View>

      {/* Circular face guide */}
      <View style={styles.circleWrapper}>
        <View style={[styles.circle, isError && styles.circleError, isDone && styles.circleDone]}>
          {/* Scanning line animation placeholder */}
          {status === "scanning" && <View style={styles.scanLine} />}
        </View>
      </View>

      {/* Status text */}
      <View style={styles.footer}>
        <Text style={[styles.statusText, isError && styles.errorText, isDone && styles.doneText]}>
          {STATUS_TEXT[status]}
        </Text>

        <View style={styles.dots}>
          {["scanning", "blink", "done"].map((s, i) => {
            const steps: Status[] = ["scanning", "blink", "done"];
            const active = steps.indexOf(status) >= i;
            return (
              <View
                key={s}
                style={[styles.dot, active && !isError && styles.dotActive]}
              />
            );
          })}
        </View>

        {isError && (
          <TouchableOpacity style={styles.retryBtn} onPress={() => setStatus("waiting")}>
            <Text style={styles.retryText}>재시도</Text>
          </TouchableOpacity>
        )}

        <View style={styles.tips}>
          {["안경 제거 권장", "밝은 환경 필요", "정면 응시"].map((tip) => (
            <View key={tip} style={styles.tip}>
              <View style={styles.tipDot} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  overlay: { backgroundColor: "rgba(0,0,0,0.55)" },
  header: { position: "absolute", top: 60, left: 0, right: 0, alignItems: "center", paddingHorizontal: 24 },
  closeBtn: { position: "absolute", left: 24, top: 0, padding: 4 },
  closeText: { color: "#fff", fontSize: 20 },
  title: { color: "#fff", fontSize: 22, fontWeight: "700" },
  circleWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
  circle: { width: 240, height: 240, borderRadius: 120, borderWidth: 4, borderColor: "#2563EB", overflow: "hidden", justifyContent: "center", alignItems: "center" },
  circleError: { borderColor: "#EF4444" },
  circleDone: { borderColor: "#22C55E" },
  scanLine: { position: "absolute", left: 0, right: 0, top: "50%", height: 2, backgroundColor: "rgba(37,99,235,0.6)" },
  footer: { paddingHorizontal: 24, paddingBottom: 60, alignItems: "center", gap: 16 },
  statusText: { color: "#fff", fontSize: 20, fontWeight: "600", textAlign: "center" },
  errorText: { color: "#EF4444" },
  doneText: { color: "#22C55E" },
  dots: { flexDirection: "row", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4B5563" },
  dotActive: { backgroundColor: "#2563EB" },
  retryBtn: { backgroundColor: "#2563EB", borderRadius: 12, paddingVertical: 10, paddingHorizontal: 28 },
  retryText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  tips: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center" },
  tip: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#1F2937", borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12 },
  tipDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#2563EB" },
  tipText: { color: "#D1D5DB", fontSize: 12 },
  permissionText: { color: "#fff", fontSize: 16, marginBottom: 20 },
  btn: { backgroundColor: "#2563EB", borderRadius: 12, paddingVertical: 12, paddingHorizontal: 32 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
