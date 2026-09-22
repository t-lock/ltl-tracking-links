# ltl-tracking-links

Builds carrier tracking URLs for LTL shipments.

## Install

```sh
yarn add ltl-tracking-links@https://github.com/t-lock/ltl-tracking-links.git#v0.0.9
```

## Usage

```ts
import { getLTLTrackingLink } from "ltl-tracking-links";

getLTLTrackingLink({ tracking_number: "12345", carrier_name: "SAIA" });
// "https://www.saia.com/track/details;pro=12345"
```

Returns `null` if the carrier isn't recognized.

## Adding a carrier

Add an entry to `carrierUrls` in `src/index.ts` (`$$$` is replaced by the tracking number) and a test in `src/index.test.ts`.

## Releasing

`dist/` is committed, because consumers install from git.

```sh
npm test            # builds dist/ and runs tests
# bump "version" in package.json
git commit -am "..."
git tag vX.Y.Z
git push origin master vX.Y.Z
```

Then update the `#vX.Y.Z` in the consuming project and run `yarn install`.
