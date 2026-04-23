"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLTLTrackingLink = getLTLTrackingLink;
const carrierUrls = {
    "r&l": "https://www.rlcarriers.com/freight/shipping/shipment-tracing?pro=$$$&docType=PRO&source=web",
    "r+l": "https://www.rlcarriers.com/freight/shipping/shipment-tracing?pro=$$$&docType=PRO&source=web",
    pittohio: "https://pittohio.com/mypittohio/shipping/quicktrace/publictracingresponse/$$$",
    aaacooper: "https://www.aaacooper.com/pwb/Transit/ProTrackResults.aspx?ProNum=$$$&AllAccounts=true",
    aduiepyle: "https://aduiepyle.com/resources/shipment-status/?tracking=$$$",
    ceva: "https://www.cevalogistics.com/en/ceva-trak?reference_query=$$$&search_type=oneview",
    speedee: "https://speedeedelivery.com/track-a-shipment/?v=detail&barcode=$$$",
};
function getLTLTrackingLink(trackingInfo) {
    if (!trackingInfo.carrier_name && !trackingInfo.carrier_method)
        return null;
    const combined = [trackingInfo.carrier_name, trackingInfo.carrier_method]
        .filter(Boolean).join("");
    const key = combined.toLowerCase().replace(/[\s.]/g, "");
    for (const [mapKey, url] of Object.entries(carrierUrls)) {
        if (key.includes(mapKey)) {
            return url.replace("$$$", trackingInfo.tracking_number);
        }
    }
    return null;
}
//# sourceMappingURL=index.js.map