import { test } from "node:test";
import assert from "node:assert/strict";
import { getLTLTrackingLink } from "./index";

test("returns null when no carrier info provided", () => {
  assert.equal(getLTLTrackingLink({ tracking_number: "12345" }), null);
});

test("returns null for unrecognized carrier", () => {
  assert.equal(
    getLTLTrackingLink({ tracking_number: "12345", carrier_name: "FedEx" }),
    null,
  );
});

test("injects tracking number into url", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "Pitt Ohio",
  });
  assert.ok(url?.includes("12345"));
});

// R&L
test("matches r&l carriers", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "R&L Carriers",
  });
  assert.ok(url?.includes("rlcarriers.com"));
});

test("matches r+l variant", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "R+L Carriers",
  });
  assert.ok(url?.includes("rlcarriers.com"));
});

// Pitt Ohio
test("matches pitt ohio", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "Pitt Ohio",
  });
  assert.ok(url?.includes("pittohio.com"));
});

// AAA Cooper
test("matches aaa cooper", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "AAA Cooper",
  });
  assert.ok(url?.includes("aaacooper.com"));
});

// A. Duie Pyle
test("matches a. duie pyle", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "A. Duie Pyle",
  });
  assert.ok(url?.includes("aduiepyle.com"));
});

// carrier_method fallback
test("matches via carrier_method when carrier_name absent", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_method: "Pitt Ohio Express",
  });
  assert.ok(url?.includes("pittohio.com"));
});

test("handles empty carrier_name with carrier_method for matching", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "",
    carrier_method: "R + L LTL",
  });
  assert.ok(url?.includes("rlcarriers.com"));
});
