import test from "node:test";
import assert from "node:assert/strict";
import { createPaymentIntent } from "../services/paymentService.js";

test("createPaymentIntent accepts a positive amount", async () => {
  const result = await createPaymentIntent({ amount: 100, currency: "usd" });
  assert.equal(result.amount, 100);
  assert.equal(result.currency, "usd");
});

test("createPaymentIntent rejects zero amount", async () => {
  await assert.rejects(
    () => createPaymentIntent({ amount: 0, currency: "usd" }),
    /positive number/
  );
});

test("createPaymentIntent rejects negative amount", async () => {
  await assert.rejects(
    () => createPaymentIntent({ amount: -50, currency: "usd" }),
    /positive number/
  );
});

test("createPaymentIntent rejects non-numeric amount", async () => {
  await assert.rejects(
    () => createPaymentIntent({ amount: "abc", currency: "usd" }),
    /positive number/
  );
});

test("createPaymentIntent rejects missing amount", async () => {
  await assert.rejects(
    () => createPaymentIntent({ currency: "usd" }),
    /positive number/
  );
});
