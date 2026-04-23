import { authHandlers } from "./auth";
import { homeHandlers } from "./home";
import { activityHandlers } from "./activity";
import { rechargeHandlers } from "./recharge";
import { paymentHandlers } from "./payment";
import { withdrawalHandlers } from "./withdrawal";
import { settingsHandlers } from "./settings";
import { onboardingHandlers } from "./onboarding";

export const handlers = [
  ...onboardingHandlers,
  ...authHandlers,
  ...homeHandlers,
  ...activityHandlers,
  ...rechargeHandlers,
  ...paymentHandlers,
  ...withdrawalHandlers,
  ...settingsHandlers,
];
