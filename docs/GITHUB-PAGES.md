# Publish MEDIWARE CY on GitHub Pages

The existing Git remote is `git@github.com:MEDIWARE-CY-LTD/mediwareWebsite.git`. These instructions use that repository and the current `main` branch. You will perform the commit, push, and account changes yourself.

## 1. Review and upload

Review the local preview and the migration notes in [README](../README.md), especially the existing application and service privacy terms. Commit the finished files and push `main` to your existing repository using your preferred Git client. Include `CNAME`, `.nojekyll`, every HTML page, and the complete `assets/` directory.

GitHub Free for organizations supports Pages from public repositories. Private repositories require a supporting paid plan. Do not change repository visibility without reviewing its contents. [GitHub Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

GitHub describes Pages primarily as a showcase for personal and organizational projects and restricts using it to run an online business, commercial transactions, or SaaS. This migration is a static company and app showcase. Review that fit with GitHub before publishing if the site’s purpose falls into the restricted categories. [GitHub’s Pages terms](https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features#pages)

## 2. Verify domain ownership

In the **MEDIWARE-CY-LTD organization settings**, open **Pages → Add a domain** and enter `mediware.cy`. Copy the exact TXT record GitHub supplies into your domain’s DNS settings, then click **Verify** in GitHub. Keep that TXT record in place. This protects the domain from being claimed by another GitHub account. Organization owner access is required. [Domain verification instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)

## 3. Enable publishing

Open [the repository’s Pages settings](https://github.com/MEDIWARE-CY-LTD/mediwareWebsite/settings/pages).

1. Under **Build and deployment**, select **Deploy from a branch**.
2. Select **main** and **/(root)**, then **Save**. Do not select `/docs`; that folder contains instructions.
3. Under **Custom domain**, enter **mediware.cy** and save it before changing the website DNS records.
4. Check the repository’s **Actions** tab for the Pages deployment result.

The files need no build command or custom workflow. The included `CNAME` preserves the domain in source control, but it does not replace configuring the setting. If GitHub creates a commit while saving the domain, pull it before your next local edit. [Publishing source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 4. Point the domain at GitHub

Use the DNS provider currently authoritative for `mediware.cy`. This may differ from the registrar. Back up its current records first. Set these records, with one record per value:

| Type | Name / Host | Value / Target |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `mediware-cy-ltd.github.io` |

Optional IPv6 records:

| Type | Name / Host | Value |
| --- | --- | --- |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

Use the provider’s default TTL. `@` represents `mediware.cy`; some providers expect the full name instead. The `www` target must not include `https://` or `/mediwareWebsite`.

Replace conflicting old website A/AAAA records and the old `www` record. Remove stale AAAA records even if you omit IPv6. **Preserve email records**, including MX, SPF, DKIM, DMARC, and any mail-related hosts; also retain domain-verification TXT records. Do not change nameservers or add a wildcard record for this setup. GitHub Pages hosts the website, not the email mailbox. [Custom-domain DNS documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

## 5. Enable HTTPS and check the result

Once GitHub reports a successful DNS check and its certificate is ready, enable **Enforce HTTPS** in the repository’s Pages settings. DNS propagation and certificate availability can take up to 24 hours. With both apex and `www` records configured, GitHub redirects `www.mediware.cy` to the configured apex domain. [GitHub custom-domain guidance](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

Check:

- `https://mediware.cy/` and `https://www.mediware.cy/`
- Every menu page, including a direct visit to `https://mediware.cy/ctanatomy/`
- Images, video playback, mobile navigation, and the email link
- Cookie choices, the footer’s Cookie settings dialog, and both policy pages
- Existing company email still sends and receives normally

Then follow the [SEO launch steps](SEO-AND-PRIVACY.md#after-publishing) to check the sitemap and submit it to Google Search Console.

Optional DNS checks from Terminal:

```sh
dig mediware.cy A +short
dig mediware.cy AAAA +short
dig www.mediware.cy CNAME +short
dig mediware.cy MX +short
```

Future updates are simple: edit the static files, preview them, then commit and push `main` yourself. GitHub republishes that branch automatically. Keep `CNAME` and `.nojekyll` in the repository.

## If something does not work

- **Pages is unavailable:** check your repository permissions, organization policy, and plan.
- **404 at the homepage:** confirm the deployment succeeded, source is `main` / `/(root)`, and root `index.html` was pushed.
- **Old site or DNS error:** check the authoritative provider and remove conflicting website records. Allow time for cached records to expire.
- **HTTPS is pending:** verify apex and `www` DNS and wait for certificate issuance. If CAA records exist, check them against GitHub’s [HTTPS troubleshooting guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

Instructions checked against GitHub’s documentation on 7 October 2026. No DNS or GitHub account settings were changed during preparation.
