export type PaymentStatus =
  | "created"
  | "waiting_for_payment"
  | "confirming"
  | "paid"
  | "expired"
  | "failed"

export type PaymentEvent =
  | { type: "address_assigned" }
  | { type: "transaction_seen"; confirmations: number }
  | { type: "transaction_confirmed" }
  | { type: "expired" }
  | { type: "provider_error" }

export function nextPaymentStatus(
  current: PaymentStatus,
  event: PaymentEvent,
): PaymentStatus {
  if (current === "paid" || current === "expired" || current === "failed") {
    return current
  }

  switch (event.type) {
    case "address_assigned":
      return "waiting_for_payment"
    case "transaction_seen":
      return event.confirmations > 0 ? "confirming" : current
    case "transaction_confirmed":
      return "paid"
    case "expired":
      return "expired"
    case "provider_error":
      return "failed"
  }
}
