export async function createPaymentIntent(payload) {
  // TODO: integrate Stripe SDK and return client secret.
  const amount = payload.amount;
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    throw new Error("Payment amount must be a positive number");
  }
  return {
    paymentId: `pay_${Date.now()}`,
    amount,
    currency: payload.currency ?? "usd",
    provider: "stripe"
  };
}
