# SEO and privacy maintenance

## Search metadata

All seven content pages have unique titles and descriptions, canonical URLs on `https://mediware.cy`, Open Graph metadata, and Twitter summary metadata. The content is present in HTML and does not depend on JavaScript to be read. Images have alternative text and dimensions. The 404 page is marked `noindex`.

Structured data is embedded as JSON-LD: `Organization` and `WebSite` on the homepage, `BreadcrumbList` on inner pages, and `SoftwareApplication` on the two app pages. App schema intentionally omits prices and ratings that have not been verified. See Google’s [organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization) and [site-name guidance](https://developers.google.com/search/docs/appearance/site-names).

When adding or renaming a page, update its metadata and structured data as well as `sitemap.xml`. Keep its canonical URL consistent with the sitemap and navigation. If the domain changes, update `CNAME`, `robots.txt`, the sitemap, and all absolute metadata URLs.

## After publishing

1. Confirm that the domain redirects to HTTPS and each canonical page loads directly.
2. Check `https://mediware.cy/robots.txt` and `https://mediware.cy/sitemap.xml`.
3. Verify the domain in Google Search Console and submit `https://mediware.cy/sitemap.xml` in its Sitemaps report. Review crawl and indexing results there. Submission does not guarantee indexing or rankings. [Google’s sitemap instructions](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
4. Update any company listings and social profiles to the new domain. Any redirect from the old Wix hostname must be configured at Wix, if supported.

## What the cookie controls do

There are no optional cookies, analytics, advertising pixels, or external media embeds. The notice states this explicitly. **Accept all** and **Reject optional** are equally available, and neither starts tracking. The footer opens a native HTML dialog to change or clear the saved preference. No choice is assumed before a button is pressed.

The only record written by the site is `mediware-cookie-choice` in local storage. It contains a policy version, the choice (`accepted` or `essential`), and an expiry timestamp. The duration is 180 days. An expired or obsolete choice triggers the notice again. Storage failures do not break the page. Clearing removes only this record, and the record is never transmitted by the site’s code.

The implementation follows the consent-interface principles discussed in the [EDPB Cookie Banner Taskforce report](https://www.edpb.europa.eu/documents/task-force-report/report-of-the-work-undertaken-by-the-cookie-banner-taskforce_en), including accessible rejection and withdrawal. This is a technical implementation, not certification of legal compliance.

GitHub’s hosting security logs are separate from this local preference record. The public privacy and cookie policies link to [GitHub’s data collection information](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection).

## Before adding analytics or other optional services

The current `accepted` value is **not permission for a future service**. Describe any new service, purpose, provider, duration, and controls in the policies and dialog. Increment `POLICY_VERSION` in `assets/privacy-store.mjs` so previous choices cannot authorize it. Implement consent checks before loading that service and withdrawal behavior that stops it and clears its optional storage. Test the rejection, acceptance, expiry, and withdrawal paths before publishing.

The existing company policy still contains application, service, and email-processing statements inherited from the old website, including older legal-framework references. Confirm those statements and the privacy contact with the company’s privacy adviser before publishing. The website section and new cookie policy describe the current static implementation.

## Tests

From the repository directory:

```sh
node --test tests/cookie-preferences/privacy-store.test.mjs
```

The tests cover both choices, expiry, malformed and obsolete records, invalid choices, clearing only the relevant key, and unavailable storage. Also check the banner and dialog in a browser after changing shared markup or adding optional services.
