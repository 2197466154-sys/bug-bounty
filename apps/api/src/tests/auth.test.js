import test from "node:test";
import assert from "node:assert/strict";
import { refreshToken } from "../services/authService.js";
import { signAccessToken, verifyAccessToken } from "../utils/jwt.js";

test("refreshToken issues a new token for a valid supplied token", async () => {
  const original = signAccessToken({ sub: "usr_123", role: "client" });
  const result = await refreshToken(original);
  assert.ok(result.token);
  const decoded = verifyAccessToken(result.token);
  assert.equal(decoded.sub, "usr_123");
  assert.equal(decoded.role, "client");
});

test("refreshToken rejects when no token is supplied", async () => {
  await assert.rejects(() => refreshToken(), /valid token/);
});

test("refreshToken rejects an invalid token", async () => {
  await assert.rejects(() => refreshToken("not-a-real-token"), /invalid|malformed|valid token/);
});
