const carrierUrls = {
    "r&l": "https://www.rlcarriers.com/freight/shipping/shipment-tracing?pro=$$$&docType=PRO&source=web",
    pittohio: "https://pittohio.com/mypittohio/shipping/quicktrace/publictracingresponse/$$$",
    aaacooper: "https://www.aaacooper.com/pwb/Transit/ProTrackResults.aspx?ProNum=$$$&AllAccounts=true",
    aduiepyle: "https://aduiepyle.com/resources/shipment-status/?tracking=$$$",
};
export function getLTLTrackingLink(trackingInfo) {
    if (!trackingInfo.carrier_name)
        return null;
    const key = trackingInfo.carrier_name.toLowerCase().replace(/\s/g, "");
    for (const [mapKey, url] of Object.entries(carrierUrls)) {
        if (key.includes(mapKey)) {
            return url.replace("$$$", trackingInfo.tracking_number);
        }
    }
    return null;
}
//# sourceMappingURL=index.js.map