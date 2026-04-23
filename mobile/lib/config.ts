import Constants from "expo-constants";

// Set EXPO_PUBLIC_WEB_URL in .env to your Mac's local IP when developing.
// e.g.  EXPO_PUBLIC_WEB_URL=http://192.168.1.42:3000
// For production, set it to your deployed Next.js URL.
const envUrl = process.env.EXPO_PUBLIC_WEB_URL;

const debugHost = Constants.expoConfig?.hostUri?.split(":")[0];

export const WEB_URL =
  envUrl ??
  (debugHost ? `http://${debugHost}:3000` : "http://localhost:3000");
