# MEDIWARE CY website

A modern static website based on [the company’s Wix website](https://mediwarecy.wixsite.com/mediware), prepared for `https://mediware.cy`.

## Run locally

Open Terminal and paste this command. It works from any directory:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory "/Users/george/XcodeProjects/MediwareWebsite"
```

Then open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) in your browser. Keep Terminal running while viewing the site. Press **Control-C** in Terminal to stop the server.

No build or package installation is needed if Python 3 is already installed. After editing a file, refresh the browser to see the changes.

If you see **Address already in use**, the preview may already be running at that address. Open the link above, or replace `8080` with `8081` in the command and visit `http://127.0.0.1:8081/` instead.

## Stack

Plain HTML, CSS, and small JavaScript modules. This seven-page information site does not need a framework, package manager, server application, database, or build step. All content and navigation work without JavaScript. JavaScript handles video motion preferences, menu dismissal, and privacy preferences.

Images and videos are stored locally under `assets/`. There are no Wix scripts, analytics, advertising trackers, embedded third-party players, external fonts, or contact forms. The cookie notice stores only the visitor’s choice in local storage for 180 days. Accept and reject have the same prominence, and neither enables tracking. Preferences can be changed or cleared from the footer.

Typography uses native `system-ui` fonts, with `ui-monospace` for the storage key on the cookie policy page. No font files are downloaded. The mobile menu, video controls, buttons, and cookie dialog use native HTML elements.

All four videos autoplay muted, loop, and play inline. The homepage has a pause button; demo videos have native controls. With JavaScript enabled, reduced-motion preferences disable autoplay. Browsers or device settings may also block autoplay, in which case visitors can start playback manually.

## Pages and editing

| File | Content |
| --- | --- |
| `index.html` | Home, services, apps, about, and email contact |
| `usecases/index.html` | Five development projects |
| `ctanatomy/index.html` | CT Anatomy |
| `iradxrays/index.html` | iRad Xrays |
| `gsdf/index.html` | GSDF calibration services |
| `privacy/index.html` | Website privacy information and existing application/service policy |
| `cookies/index.html` | Cookie and local-storage policy |
| `assets/styles.css` | Shared styling and responsive layouts |
| `assets/site.js` | Menu, autoplay, reduced motion, and homepage pause behavior |
| `assets/privacy.mjs` | Cookie notice and native preference dialog |
| `assets/privacy-store.mjs` | Preference validation, persistence, and expiry |
| `sitemap.xml` and `robots.txt` | Search-engine discovery |

Edit HTML directly and reload the preview. Header, footer, and cookie markup are repeated in the seven content pages to keep the site build-free. Update all seven copies when changing these elements. Contact links use `info@mediware.cy`; the policy retains `legal@mediware.cy`.

Stylesheet links include a `?v=` version to avoid an older cached design. When publishing CSS changes, update that version in all eight HTML files, including `404.html`, so returning visitors request the new stylesheet.

Each page includes its own title, description, canonical URL, social metadata, and structured data. See [SEO and privacy maintenance](docs/SEO-AND-PRIVACY.md) for launch steps and guidance before adding any optional services.

## Hosting

Follow [the GitHub Pages and custom-domain guide](docs/GITHUB-PAGES.md). `CNAME` already contains `mediware.cy`, and `.nojekyll` disables Jekyll processing. You must still enable Pages and configure the domain in GitHub settings.

No commit, push, deployment, GitHub setting, or DNS change has been performed by this migration.

## Migration notes

- The layout and typography have been redesigned with a cinematic homepage, generous spacing, product cards, and responsive project layouts. The company’s original app artwork, screenshots, videos, and core content are retained. The CT Anatomy icon keeps its orange circle. The Wix advertising banner and platform features have been removed.
- The contact section and footer use a simple email link. There is no form submission or email backend. The `info@mediware.cy` mailbox must exist with your email provider.
- CT Anatomy links consistently use the `id1593860251` App Store destination from the original download badge. The original hero also linked to the older `id553807435` listing.
- The website section of the privacy policy now describes this implementation, and obsolete website analytics and form claims have been removed. **Review the broader policy before publishing:** existing application, service, email-provider, and older legal-framework statements have not been independently verified. The cookie feature does not certify GDPR or ePrivacy compliance for the company’s wider operations. Hosting-provider request logs and your email provider’s processing are separate from the site code.
- Product usage figures, awards, testimonials, medical-service claims, and social links reflect the original site. They have not been independently updated or substantiated.
- [Asset source URLs](docs/asset-sources.json) record where the company’s original files came from. Web-sized versions of large images were downloaded for faster loading. These URLs are provenance only; the website does not load assets from Wix.
- GitHub Pages cannot configure redirects on the old Wix-owned hostname. Any redirection from `mediwarecy.wixsite.com/mediware` must be handled through Wix, if supported. The new domain retains the existing page names.

The source site and hosting documentation were reviewed on 7 October 2026.

## Verification

All seven content pages were checked at 320px, 768px, and 1280px widths with no horizontal overflow. Browser checks covered mobile navigation, the homepage pause control, muted autoplay on all four videos, and accepting, rejecting, changing, and clearing cookie choices. A static audit checked 205 local file and anchor references, image attributes, video flags, structured JSON data, and the seven sitemap URLs.

The seven cookie-preference tests cover persistence, expiry, invalid records, withdrawal, and blocked storage. To run them with Node.js installed:

```sh
node --test "/Users/george/XcodeProjects/MediwareWebsite/tests/cookie-preferences/privacy-store.test.mjs"
```

Node.js is only needed for these tests, not for running or hosting the site.

Production DNS, HTTPS, App Store availability, and mailbox delivery still need checking after you publish. The local Python server does not emulate GitHub’s custom 404 handling.
