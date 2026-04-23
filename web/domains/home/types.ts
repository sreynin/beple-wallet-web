export type ChargingMethod = {
  id: "korbit" | "bank" | "wallet";
  name: string;
  connected: boolean;
  detail: string;
  actionLabel: string;
};

export type HomeEvent = {
  id: string;
  tag: string;
  title: string;
  startDate: string;
  endDate: string;
  active: boolean;
  description: string;
  benefits: string[];
};

export type HomeData = {
  balanceKrw: number;
  lastUpdated: string;
  chargingMethods: ChargingMethod[];
  events: HomeEvent[];
};
