import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from "react-native";
import { useRouter } from "expo-router";
import { postToWeb } from "../../lib/bridge";

type Step = "enter" | "confirm";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

export default function PinScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("enter");
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mismatch, setMismatch] = useState(false);

  const current = step === "enter" ? pin : confirm;
  const title = step === "enter" ? "사용하실 6자리 PIN을\n입력해주세요" : "PIN을 한 번 더\n입력해주세요";

  const handleKey = (key: string) => {
    if (key === "⌫") {
      if (step === "enter") setPin((p) => p.slice(0, -1));
      else { setConfirm((c) => c.slice(0, -1)); setMismatch(false); }
      return;
    }
    if (key === "") return;

    if (step === "enter") {
      const next = pin + key;
      setPin(next);
      if (next.length === 6) setStep("confirm");
    } else {
      const next = confirm + key;
      setConfirm(next);
      if (next.length === 6) {
        if (next === pin) {
          postToWeb({ type: "KYC_PIN_DONE", pin: next });
          router.back();
        } else {
          Vibration.vibrate(300);
          setMismatch(true);
          setConfirm("");
        }
      }
    }
  };

  const handleBack = () => {
    if (step === "confirm") {
      setStep("enter");
      setPin("");
      setConfirm("");
      setMismatch(false);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>{step === "enter" ? "PIN 설정" : "PIN 확인"}</Text>
      </View>

      {/* Title */}
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{title}</Text>
        {mismatch && (
          <Text style={styles.errorText}>PIN이 일치하지 않습니다. 다시 입력해주세요.</Text>
        )}
      </View>

      {/* Dots */}
      <View style={styles.dots}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i < current.length && styles.dotFilled]}
          />
        ))}
      </View>

      {/* Keypad */}
      <View style={styles.keypad}>
        {KEYS.map((key, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.key, key === "" && styles.keyEmpty]}
            onPress={() => handleKey(key)}
            disabled={key === ""}
            activeOpacity={0.7}
          >
            <Text style={[styles.keyText, key === "⌫" && styles.keyDelete]}>
              {key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingTop: 60, paddingBottom: 8 },
  backBtn: { padding: 8 },
  backText: { fontSize: 28, color: "#111827" },
  topTitle: { fontSize: 17, fontWeight: "600", color: "#111827", flex: 1, textAlign: "center", marginRight: 40 },
  titleBlock: { alignItems: "center", paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16, gap: 8 },
  title: { fontSize: 24, fontWeight: "700", color: "#111827", textAlign: "center", lineHeight: 32 },
  errorText: { fontSize: 13, color: "#EF4444", textAlign: "center" },
  dots: { flexDirection: "row", justifyContent: "center", gap: 16, marginVertical: 24 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: "#D1D5DB", backgroundColor: "#fff" },
  dotFilled: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  keypad: { flex: 1, flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 32, paddingBottom: 40, alignContent: "center", gap: 0 },
  key: { width: "33.33%", height: 72, justifyContent: "center", alignItems: "center" },
  keyEmpty: { opacity: 0 },
  keyText: { fontSize: 28, fontWeight: "500", color: "#111827" },
  keyDelete: { fontSize: 22, color: "#6B7280" },
});
