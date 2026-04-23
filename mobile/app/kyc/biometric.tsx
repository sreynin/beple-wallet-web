import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { postToWeb } from "../../lib/bridge";

export default function BiometricScreen() {
  const router = useRouter();
  const [supported, setSupported] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    LocalAuthentication.hasHardwareAsync().then(setSupported);
  }, []);

  const handleAuthenticate = async () => {
    setError(null);
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "생체인증을 등록합니다",
        cancelLabel: "취소",
        fallbackLabel: "PIN 입력",
      });

      if (result.success) {
        postToWeb({ type: "KYC_BIOMETRIC_DONE" });
        router.back();
      } else {
        setError("인증에 실패했습니다. 다시 시도해주세요.");
      }
    } catch {
      setError("생체인증을 사용할 수 없습니다.");
    }
  };

  const handleSkip = () => {
    postToWeb({ type: "KYC_BIOMETRIC_SKIP" });
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Close */}
      <TouchableOpacity style={styles.closeBtn} onPress={handleSkip}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.body}>
        {/* Icon */}
        <View style={styles.iconOuter}>
          <View style={styles.iconInner}>
            <Text style={styles.iconEmoji}>
              {supported === false ? "🚫" : "🔐"}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>{"생체인증을\n등록하시겠어요?"}</Text>
        <Text style={styles.subtitle}>
          {"등록하면 PIN 대신 생체인증으로\n빠르게 결제할 수 있어요"}
        </Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.cards}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>빠른 결제</Text>
            <Text style={styles.cardDesc}>PIN 입력 없이 지문/Face ID로 즉시 결제</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>강력한 보안</Text>
            <Text style={styles.cardDesc}>기기 내 생체정보를 활용한 안전한 인증</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.primaryBtn, supported === false && styles.disabledBtn]}
          onPress={handleAuthenticate}
          disabled={supported === false}
        >
          <Text style={styles.primaryBtnText}>
            {supported === false ? "이 기기에서 지원하지 않음" : "생체인증 등록하기"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={handleSkip}>
          <Text style={styles.secondaryBtnText}>나중에 하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  closeBtn: { position: "absolute", top: 60, right: 24, zIndex: 10, padding: 8 },
  closeText: { fontSize: 20, color: "#374151" },
  body: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24, gap: 20 },
  iconOuter: { width: 112, height: 112, borderRadius: 56, backgroundColor: "#EEF4FE", justifyContent: "center", alignItems: "center" },
  iconInner: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#2563EB", justifyContent: "center", alignItems: "center" },
  iconEmoji: { fontSize: 36 },
  title: { fontSize: 26, fontWeight: "700", color: "#111827", textAlign: "center", lineHeight: 34 },
  subtitle: { fontSize: 14, color: "#6B7280", textAlign: "center", lineHeight: 22 },
  errorText: { color: "#EF4444", fontSize: 14, textAlign: "center" },
  cards: { width: "100%", gap: 12 },
  card: { backgroundColor: "#F9FAFB", borderRadius: 16, padding: 20 },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#111827", marginBottom: 4 },
  cardDesc: { fontSize: 13, color: "#6B7280" },
  footer: { paddingHorizontal: 24, paddingBottom: 48, gap: 12 },
  primaryBtn: { height: 52, backgroundColor: "#2563EB", borderRadius: 16, justifyContent: "center", alignItems: "center" },
  disabledBtn: { backgroundColor: "#D1D5DB" },
  primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  secondaryBtn: { height: 52, borderRadius: 16, borderWidth: 2, borderColor: "#2563EB", justifyContent: "center", alignItems: "center" },
  secondaryBtnText: { color: "#2563EB", fontSize: 16, fontWeight: "600" },
});
