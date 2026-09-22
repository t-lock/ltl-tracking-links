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
  assert.equal(
    url,
    "https://www.rlcarriers.com/freight/shipping/shipment-tracing?pro=12345&docType=PRO&source=web",
  );
});

test("matches r+l variant", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "R+L Carriers",
  });
  assert.equal(
    url,
    "https://www.rlcarriers.com/freight/shipping/shipment-tracing?pro=12345&docType=PRO&source=web",
  );
});

// Pitt Ohio
test("matches pitt ohio", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "Pitt Ohio",
  });
  assert.equal(
    url,
    "https://pittohio.com/mypittohio/shipping/quicktrace/publictracingresponse/12345",
  );
});

// AAA Cooper
test("matches aaa cooper", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "AAA Cooper",
  });
  assert.equal(
    url,
    "https://www.aaacooper.com/pwb/Transit/ProTrackResults.aspx?ProNum=12345&AllAccounts=true",
  );
});

// A. Duie Pyle
test("matches a. duie pyle", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "A. Duie Pyle",
  });
  assert.equal(
    url,
    "https://aduiepyle.com/resources/shipment-status/?tracking=12345",
  );
});

// Ceva
test("matches ceva", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "Ceva",
  });
  assert.equal(
    url,
    "https://www.cevalogistics.com/en/ceva-trak?reference_query=12345&search_type=oneview",
  );
});

// Speedee
test("matches speedee", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "Speedee",
  });
  assert.equal(
    url,
    "https://speedeedelivery.com/track-a-shipment/?v=detail&barcode=12345",
  );
});

// Meyer
test("matches meyer", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "Meyer Logistics",
  });
  assert.equal(
    url,
    "https://meyerlogistics.com/shipment-tracker?trackingNumber=RVR12345",
  );
});

// SAIA
test("matches saia", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: "SAIA",
  });
  assert.equal(url, "https://www.saia.com/track/details;pro=12345");
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

// trailing/leading whitespace
test("trims trailing whitespace from tracking number", () => {
  const url = getLTLTrackingLink({
    tracking_number: "5057720673 ",
    carrier_method: "PITT OHIO",
  });
  assert.equal(
    url,
    "https://pittohio.com/mypittohio/shipping/quicktrace/publictracingresponse/5057720673",
  );
});

test("trims whitespace from carrier fields before matching", () => {
  const url = getLTLTrackingLink({
    tracking_number: "12345",
    carrier_name: " ",
    carrier_method: " Pitt Ohio ",
  });
  assert.ok(url?.includes("pittohio.com"));
});
