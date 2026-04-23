import type { HomeData } from "@/domains/home/types";

// Legacy assets used by recharge handlers
export const mockAssets = [
  { symbol: "BTC", name: "Bitcoin",  amount: 0.05234, valueKrw: 4_850_000 },
  { symbol: "ETH", name: "Ethereum", amount: 1.234,   valueKrw: 2_340_000 },
  { symbol: "USDT", name: "Tether",  amount: 500,     valueKrw: 680_000 },
];

export const mockHome: HomeData = {
  balanceKrw: 125_000,
  lastUpdated: "방금 전",
  chargingMethods: [
    {
      id: "korbit",
      name: "Korbit",
      connected: true,
      detail: "연결됨",
      actionLabel: "코인매도 충전",
    },
    {
      id: "bank",
      name: "신한은행",
      connected: true,
      detail: "****1234",
      actionLabel: "계좌충전",
    },
    {
      id: "wallet",
      name: "외부 지갑",
      connected: false,
      detail: "USDT · USDC 직전송",
      actionLabel: "",
    },
  ],
  events: [
    {
      id: "ev-001",
      tag: "LIMITED EVENT",
      title: "첫 충전 보너스 +5%",
      startDate: "2026.04.01",
      endDate: "2026.04.30",
      active: true,
      description:
        "비플월렛에 처음 오신 것을 환영합니다! 이 특별한 이벤트는 신규 가입 후 첫 Beple Money 충전 시 충전 금액의 5%를 추가로 적립해 드리는 프로모션입니다.\n\n지금 충전하면 더 많은 혜택을 누릴 수 있어요. 예를 들어 10만원을 충전하면 5,000 Beple Money를 보너스로 받으실 수 있습니다.",
      benefits: [
        "첫 충전 금액의 5% 추가 적립 (최대 10,000 Beple Money)",
        "적립된 보너스는 충전 후 24시간 이내 지급",
        "신규 가입 회원 1인 1회 한정 적용",
      ],
    },
    {
      id: "ev-002",
      tag: "REFERRAL EVENT",
      title: "친구 초대하고\n₩3,000 받기",
      startDate: "2026.04.01",
      endDate: "2026.05.31",
      active: true,
      description:
        "친구를 비플월렛에 초대하면 친구가 첫 충전 시 나에게 3,000원 Beple Money가 지급됩니다.\n\n초대할 수 있는 친구 수에 제한이 없으니 많이 초대할수록 더 많은 혜택을 받을 수 있어요.",
      benefits: [
        "친구 1명 초대 시 3,000 Beple Money 지급",
        "초대 인원 무제한",
        "친구의 첫 충전 완료 후 24시간 이내 지급",
      ],
    },
  ],
};

export const mockHomeEmpty: HomeData = {
  balanceKrw: 0,
  lastUpdated: "방금 전",
  chargingMethods: [
    {
      id: "korbit",
      name: "Korbit",
      connected: false,
      detail: "연결하기",
      actionLabel: "",
    },
    {
      id: "bank",
      name: "은행계좌",
      connected: false,
      detail: "계좌 등록하기",
      actionLabel: "",
    },
    {
      id: "wallet",
      name: "외부 지갑",
      connected: false,
      detail: "직전송 안내",
      actionLabel: "",
    },
  ],
  events: [],
};

export const mockTransactions = [
  {
    id: "tx-001",
    type: "payment",
    amount: -15_000,
    currency: "KRW",
    merchant: "스타벅스 강남점",
    status: "completed",
    createdAt: "2025-04-20T10:23:00Z",
  },
  {
    id: "tx-002",
    type: "recharge",
    amount: 500_000,
    currency: "KRW",
    source: "BTC",
    status: "completed",
    createdAt: "2025-04-19T15:00:00Z",
  },
  {
    id: "tx-003",
    type: "withdrawal",
    amount: -100_000,
    currency: "KRW",
    status: "completed",
    createdAt: "2025-04-18T09:10:00Z",
  },
  {
    id: "tx-004",
    type: "payment",
    amount: -32_000,
    currency: "KRW",
    merchant: "GS25 서초점",
    status: "completed",
    createdAt: "2025-04-17T18:45:00Z",
  },
  {
    id: "tx-005",
    type: "recharge",
    amount: 1_000_000,
    currency: "KRW",
    source: "ETH",
    status: "pending",
    createdAt: "2025-04-16T11:00:00Z",
  },
];
