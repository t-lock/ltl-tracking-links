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
    strict_1.default.ok(url?.includes("rlcarriers.com"));
});
(0, node_test_1.test)("matches r+l variant", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "R+L Carriers",
    });
    strict_1.default.ok(url?.includes("rlcarriers.com"));
});
// Pitt Ohio
(0, node_test_1.test)("matches pitt ohio", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "Pitt Ohio",
    });
    strict_1.default.ok(url?.includes("pittohio.com"));
});
// AAA Cooper
(0, node_test_1.test)("matches aaa cooper", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "AAA Cooper",
    });
    strict_1.default.ok(url?.includes("aaacooper.com"));
});
// A. Duie Pyle
(0, node_test_1.test)("matches a. duie pyle", () => {
    const url = (0, index_1.getLTLTrackingLink)({
        tracking_number: "12345",
        carrier_name: "A. Duie Pyle",
    });
    strict_1.default.ok(url?.includes("aduiepyle.com"));
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
//# sourceMappingURL=index.test.js.map