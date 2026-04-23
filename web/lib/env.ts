import { z } from "zod";

const EnvSchema = z.object({
  NEXT_PUBLIC_API_BASE: z.string().url(),
  NEXT_PUBLIC_APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
});

export const env = EnvSchema.parse({
  NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
});

export type Env = z.infer<typeof EnvSchema>;
