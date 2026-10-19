# Hunter Club video backend

The homepage has no sample videos or fixed video descriptions. `/upload` contains a file picker, title, PIN and submit button. New videos appear newest first. Successful publication means the object is in R2 and its metadata is in D1; there is no browser-only upload fallback.

## Cloudflare deployment

Use the Cloudflare account intended for Hunter Club. Activate R2 if required. Storage and operations beyond included allowances can incur charges.

1. From this directory, install dependencies: `npm ci` (or `npm install` before the first lockfile exists).
2. `npm run db:create` and copy the returned database ID into `wrangler.toml`.
3. `npm run r2:create`.
4. `npm run db:init` to initialize the remote schema. It does not seed demo videos or delete existing videos.
5. `npm run secret:pin` and enter a private PIN of at least 4 digits. Do not put it in Git or a `VITE_*` variable.
6. `npm run deploy`. Retain the resulting HTTPS workers.dev URL.
7. Update `CORS_ORIGIN` to the exact production, Netlify and development origins in use, then deploy again if changed.

R2 stays private. The Worker provides public playback URLs and checks the PIN on every upload operation. Files are uploaded in 8 MiB chunks, retried once per failed chunk, with progress. Limit: 2 GiB per video. Interrupted multipart uploads follow R2's lifecycle settings; set an abort-incomplete-multipart lifecycle policy to clean them up. The client aborts failed sessions where connectivity permits. The PIN has a 10-failed-attempts-per-10-minutes limit per client IP stored in D1.

## Netlify

Use **HUNTERCLUB / info@hunterclub.sk**, project **hunterclubstrelnica**, linked to `vaskosamuel-cmyk/hunterclub-bratislava`. The ARS Natura account is unrelated.

Set `VITE_API_BASE_URL` to the HTTPS Worker URL in the project's build environment, and rebuild/deploy. The existing `netlify.toml` publishes `dist` and routes `/upload` to the React app. Video bytes go directly to Cloudflare, not through Netlify.

Verify `/api/health`, an initially empty `/api/videos`, rejected wrong-PIN uploads, an upload from a phone, homepage playback in a fresh browser, seeking, and reload persistence. Do not leave a test video published if the homepage must launch empty.

## Domain

The site remains on Netlify with its existing Webhouse DNS. Workers.dev provides the R2 playback/upload API independently; no nameserver change is required for this video feature.

## Video dimensions

The upload page reads width, height and duration from the selected file. The Worker validates these values, derives portrait/landscape/square orientation, and saves them as R2 object custom metadata. The public list returns those fields. Existing videos remain compatible and their dimensions/previews are read by the player.

For the existing deployment, reuse the configured bucket, D1 database and OWNER_PIN. Deploying this source is sufficient; no D1 schema migration or new credentials are needed.

## Playback formats

R2 stores the original file and serves byte ranges for playback and seeking. This is progressive video delivery, not automatic transcoding or adaptive bitrate streaming. For broad compatibility, record/export MP4 with H.264 video and AAC audio. MOV/HEVC playback depends on the visitor's browser. Cloudflare Stream is a separate product and is not part of this setup.

## Local checks

From the project root: `npm run build`, `npx tsc --noEmit`.
From this directory after installing dependencies: `npm run check`.
