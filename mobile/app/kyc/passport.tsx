import { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { postToWeb } from "../../lib/bridge";

export default function PassportScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [capturing, setCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const handleCapture = async () => {
    if (!cameraRef.current || capturing) return;
    setCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });

      // TODO: send photo.uri to your OCR API and get real passport fields
      // For now we use mock OCR data
      const mockOcr: Record<string, string> = {
        nameEn: "HONG GIL DONG",
        name: "홍길동",
        number: "M12345678",
        nationality: "KOR",
        dob: "850101",
        expiry: "280101",
        gender: "M",
      };

      postToWeb({ type: "KYC_PASSPORT_DONE", ocr: mockOcr });
      router.back();
    } finally {
      setCapturing(false);
    }
  };

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

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />

      {/* Dark overlay with passport cutout */}
      <View style={[StyleSheet.absoluteFill, { pointerEvents: "none" }]}>
        <View style={styles.overlayTop} />
        <View style={styles.overlayMiddle}>
          <View style={styles.overlaySide} />
          {/* Guide box */}
          <View style={styles.guideBox}>
            {/* Corner marks */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
          </View>
          <View style={styles.overlaySide} />
        </View>
        <View style={styles.overlayBottom} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>여권을 촬영해주세요</Text>
        <Text style={styles.subtitle}>여권 사진면을 가이드 박스에 맞춰주세요</Text>
      </View>

      {/* Capture button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.captureBtn}
          onPress={handleCapture}
          disabled={capturing}
        >
          {capturing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.captureBtnText}>촬영하기</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const GUIDE_W = 300;
const GUIDE_H = 210;
const CORNER = 24;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  header: { position: "absolute", top: 60, left: 0, right: 0, alignItems: "center", paddingHorizontal: 24 },
  closeBtn: { position: "absolute", left: 24, top: 0, padding: 4 },
  closeText: { color: "#fff", fontSize: 20 },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "rgba(255,255,255,0.7)", fontSize: 14 },
  footer: { position: "absolute", bottom: 60, left: 0, right: 0, alignItems: "center" },
  captureBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 48,
    minWidth: 160,
    alignItems: "center",
  },
  captureBtnText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  permissionText: { color: "#fff", fontSize: 16, marginBottom: 20 },
  btn: { backgroundColor: "#2563EB", borderRadius: 12, paddingVertical: 12, paddingHorizontal: 32 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  // Overlay
  overlayTop: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)" },
  overlayMiddle: { flexDirection: "row", height: GUIDE_H },
  overlaySide: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)" },
  overlayBottom: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)" },
  guideBox: { width: GUIDE_W, borderRadius: 4 },
  corner: { position: "absolute", width: CORNER, height: CORNER, borderColor: "#2563EB", borderWidth: 3 },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
});
