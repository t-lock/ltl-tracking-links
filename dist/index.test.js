"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const strict_1 = __importDefault(require("node:assert/strict"));
const index_1 = require("./index");
(0, node_test_1.test)("returns null when no carrier info provided", () => {
    strict_1.default.equal((0, index_1.getLTLTrackingLink)({ tracking_number: "12345" }), null);
});
(0, node_test_1.test)("returns null for unrecognized carrier", () => {
    strict_1.default.equal((0, index_1.getLTLTrackingLink)({ tracking_number: "12345", carrier_name: "FedEx" }), null);
});
(0, node_test_1.test)("injects tracking number into url", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "Pitt Ohio",
    });
    strict_1.default.ok(url?.includes("12345"));
});
// R&L
(0, node_test_1.test)("matches r&l carriers", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "R&L Carriers",
    });
    strict_1.default.equal(url, "https://www.rlcarriers.com/freight/shipping/shipment-tracing?pro=12345&docType=PRO&source=web");
});
(0, node_test_1.test)("matches r+l variant", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "R+L Carriers",
    });
    strict_1.default.equal(url, "https://www.rlcarriers.com/freight/shipping/shipment-tracing?pro=12345&docType=PRO&source=web");
});
// Pitt Ohio
(0, node_test_1.test)("matches pitt ohio", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "Pitt Ohio",
    });
    strict_1.default.equal(url, "https://pittohio.com/mypittohio/shipping/quicktrace/publictracingresponse/12345");
});
// AAA Cooper
(0, node_test_1.test)("matches aaa cooper", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "AAA Cooper",
    });
    strict_1.default.equal(url, "https://www.aaacooper.com/pwb/Transit/ProTrackResults.aspx?ProNum=12345&AllAccounts=true");
});
// A. Duie Pyle
(0, node_test_1.test)("matches a. duie pyle", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "A. Duie Pyle",
    });
    strict_1.default.equal(url, "https://aduiepyle.com/resources/shipment-status/?tracking=12345");
});
// Ceva
(0, node_test_1.test)("matches ceva", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "Ceva",
    });
    strict_1.default.equal(url, "https://www.cevalogistics.com/en/ceva-trak?reference_query=12345&search_type=oneview");
});
// Speedee
(0, node_test_1.test)("matches speedee", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "Speedee",
    });
    strict_1.default.equal(url, "https://speedeedelivery.com/track-a-shipment/?v=detail&barcode=12345");
});
// Meyer
(0, node_test_1.test)("matches meyer", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "Meyer Logistics",
    });
    strict_1.default.equal(url, "https://meyerlogistics.com/shipment-tracker?trackingNumber=RVR12345");
});
// SAIA
(0, node_test_1.test)("matches saia", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "SAIA",
    });
    strict_1.default.equal(url, "https://www.saia.com/track/details;pro=12345");
});
// carrier_method fallback
(0, node_test_1.test)("matches via carrier_method when carrier_name absent", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_method: "Pitt Ohio Express",
    });
    strict_1.default.ok(url?.includes("pittohio.com"));
});
(0, node_test_1.test)("handles empty carrier_name with carrier_method for matching", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "",
        carrier_method: "R + L LTL",
    });
    strict_1.default.ok(url?.includes("rlcarriers.com"));
});
// trailing/leading whitespace
(0, node_test_1.test)("trims trailing whitespace from tracking number", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "5057720673 ",
        carrier_method: "PITT OHIO",
    });
    strict_1.default.equal(url, "https://pittohio.com/mypittohio/shipping/quicktrace/publictracingresponse/5057720673");
});
(0, node_test_1.test)("trims whitespace from carrier fields before matching", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: " ",
        carrier_method: " Pitt Ohio ",
    });
    strict_1.default.ok(url?.includes("pittohio.com"));
});
//# sourceMappingURL=index.test.js.map