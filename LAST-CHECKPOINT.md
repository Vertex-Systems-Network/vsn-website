# Last Checkpoint

Date: 2026-09-25

## Current repository status

The original direct-file website architecture and the owner-requested service, pricing, legal-copy and visual refresh are complete on `main`. PR #38 was squash-merged as `700fc02222885d20d000362ce377bf0d4ff1c4e4`; Static Integrity run #54 passed. The contact-page improvement was merged in PR #39 as `3846b430844736e50558231d0b36a77d420ccd27`, and Static Integrity run #59 passed. PR #40 finalized the Authority Profile rates as `$249/$549/$899 USD` starting fees; run #62 passed on merge commit `a8f030fb4b407c690635e94551bdbe99087815bc`. No production deployment was made. The later company-fact audit commit `63fb624e6e9c5198be8195aa6455c3b5f9ef0f3c` clarified the PSEB validity period across 23 pages; run #56 passed.

- Main branch at PR creation: `5d1ff4bc277618677c4681640257cf4e256e067f`
- Merged PR branch: `website-service-pricing-legal-refresh-2026-09`
- Current milestone: contact information and enquiry service routing clarified; branch protection remains deferred by owner
- Runtime architecture: direct-open static HTML, CSS and vanilla JavaScript
- No Vercel dependency, local HTTP server, Node runtime or build step

## Verified company details used in the draft

- Legal name: Vertex Systems Network (Private) Limited
- SECP Corporate Unique Identification No.: 0313834
- FBR registration number as printed on the supplied certificate: H979166
- PSEB registration: Z-25-17539/25, valid through October 2026
- Registered address on the SECP filing acknowledgement: House 278, Street 27, Phase 4-A, Ghauri Town, Islamabad, ICT
- Public support email: info@vertexsystemsnetwork.com
- Public telephone: +92 316 8433104 (owner-provided business details)

The CDC signature card is not used on the public website. The public tax-support copy does not claim VSN itself is a licensed tax adviser.

## Completed and merged

- Expanded the homepage's engagement process and service overview.
- Added detailed scoping, operations, controls and client responsibilities to software, e-commerce, AI, social media, BPO and tax-support pages.
- Added Authority Profile starting packages at $249, $549 and $899 USD with scope and exclusions.
- Expanded draft Terms, Privacy and Refunds wording for the relevant service models.
- Fixed duplicate company-location labels and malformed literal newline escapes in progress documents.
- Merged the reviewed website work to main; no production deployment or branch-protection change.

## Visual refresh started

- Original local hero visual generated, optimized to 1440×614 WebP (52 KB) and stored as `assets/vsn-hero-visual.webp`.
- Homepage opening section redesigned with a clear service proposition, project CTA, three delivery principles and accessible artwork text.
- Shared theme shifted from violet-gradient cards to midnight navy, cobalt and lime, with consistent cards, navigation, buttons and page heroes.
- No Vercel, server or new runtime added.

Static Integrity run #49 passed on visual-refresh commit `2708f032bd6d36dbe869856fa27217179b95268f`.

## Final pricing and legal audit (2026-09-25)

- Removed the unsupported “Most selected” sales claim from the $549 Authority package.
- Made the package note explicit that translation, photography/AI portraits, press outreach, integrations, domain, hosting and ongoing maintenance are excluded unless the written proposal includes them.
- Corrected the internal legal identity note from Multan, Punjab to Islamabad Capital Territory.
- Changed the Terms dispute clause to neutral competent-jurisdiction wording under Pakistani law and retained the mandatory-rights safeguard. This remains draft wording for qualified counsel.
- Owner finalized the public Authority Profile starting fees as $249, $549 and $899 USD on 2026-09-25. The proposal confirms final totals when requested work extends beyond package scope.

## Post-merge company-fact audit (2026-09-25)

The supplied PSEB certificate lists registration Z-25-17539/25 as valid through October 2026. All 23 page footers now display that validity period to prevent the registration badge from implying indefinite validity. Confirm renewal or remove/update the badge before November 2026.

## Reference-site benchmark (2026-09-25)

- PellaNova's public profile tiers show $1,000 Presence, $2,000 Reach and $5,000 Legacy pricing. Their published scope makes sections and languages explicit and includes items such as editorial writing, AI portraits, press mentions and 3–12 months maintenance depending on tier.
- VSN's proposed $249/$549/$899 fees are lower, narrower build scopes. Client-supplied translation, no included portrait production/press outreach and separately scoped aftercare are now explicit; treat the prices as starting fees, not like-for-like equivalents.
- TekRevol's homepage organizes a broad service catalogue by capability, industry and portfolio/proof, with quantified company claims. VSN's current Work page appropriately limits proof to the published Shopify App Store product and does not invent client outcomes or metrics.
- Benchmark takeaway: keep public pricing and scope clear, group services by buyer need, and publish real approved evidence as it becomes available rather than copying unsupported metrics.

## Verification and remaining review

Static Integrity passed on visual-refresh commit `2708f032bd6d36dbe869856fa27217179b95268f` (run #49), and on the current metadata commit `02714baffa8c59c4e86c54e528398b2f4ad444ba` (run #50). The final pricing and legal audit commit `b8bdb25b918f9b415025fe89dacb6b3d4cf20868` passed Static Integrity (run #51). The competitor benchmark checkpoint passed run #53, and the merged main commit `700fc02222885d20d000362ce377bf0d4ff1c4e4` passed run #54. The PSEB validity disclosure update passed run #56.

Before public production use, confirm package costs and have qualified Pakistan legal/corporate counsel review the legal drafts. Confirm payment, tax, refund, privacy-role and provider details against the live business setup.

## Contact-page improvement merged (2026-09-25)

- Added direct `mailto:` support email and `tel:` phone links to the contact card.
- Grouped the enquiry service selector into software/apps, website/e-commerce platforms, and AI/business services, including WordPress/WP Essential, Shopify, Webflow, Wix, Laravel, SaaS, AI-native development, AI solutions, and AI automation.
- Added a required placeholder so a visitor must intentionally select a service before submitting the brief.
- `python3 scripts/validate_static_site.py` passed: 23 HTML files, 748 local references and 22 sitemap URLs. `git diff --check` passed.
- PR #39 was squash-merged as `3846b430844736e50558231d0b36a77d420ccd27`; Static Integrity run #59 passed.
- The change does not alter the static architecture or production deployment status.

Next: publish the static site bundle to the existing Middlehost hosting account when publishing resumes. No production upload or domain change was made; per owner direction, the live domain was not checked. Branch protection remains deferred.


## BPO service-page improvement (2026-09-25)

Compared the VSN BPO page with Xcentric Services’ public BPO page. The reference clearly groups contact-center offerings, shows a delivery process, and answers buyer questions about quality, data, visibility, workload changes and costs. VSN’s page already emphasized process control and data access, so the update broadens its service catalogue and adds engagement models, a six-step handover, measurable reporting guidance, security responsibilities and buyer FAQs. It avoids unverified claims such as guaranteed 24/7 coverage, named client outcomes or guaranteed results.


## Tax support page expansion (2026-09-25)

- Research covered FBR IRIS return-filing guidance, the currently published Income Tax Ordinance (amended through 30 June 2026), current tax rules, return-form resources, and the Sales Tax Act.
- Reviewed Pakistani tax advisory service-page structures for individual, freelancer, business, company, withholding, sales-tax, notice and compliance offerings.
- Expanded VSN’s tax page into separate individual/freelancer and sole-proprietor/AOP/company tracks, plus registration, wealth-statement where applicable, annual-return, withholding/payroll, sales-tax, notices, engagement workflow, official-source links and FAQs.
- Added a tax calculator section for salary, freelance/business, company, withholding, sales tax and advance-tax review. Every calculator is marked “In development”; the copy requires tax-year, taxpayer-type, assumptions, sources and last-review date, and states that VSN tools are estimates rather than official FBR determinations. No tax rates or deadlines were hard-coded into the service page.
- Updated the services overview and enquiry selector to distinguish individual tax, business/company tax and calculator enquiries. Formal advice, certification, appeals and representation are limited to the qualified professional confirmed for the specific engagement.

## BPO-specific enquiry form (2026-09-25)

- Added a dedicated BPO workflow form immediately before the BPO FAQ section.
- The form captures contact details, BPO service area, approximate workload, channels/work types, coverage window and time zone, systems/platforms, preferred start timing, and a workflow brief.
- Extended the shared WhatsApp brief builder to include the BPO-specific fields while preserving the existing general contact form behavior.
- Disclosed that the static form opens a WhatsApp draft rather than sending to a VSN server, and asked users not to submit customer records or credentials.
- `python3 scripts/validate_static_site.py` passed: 23 HTML pages and 752 local references. `git diff --check` passed.
- PR #43 was squash-merged as `8c36c276e7988c0a08fb297442e263030f2baab6`; Static Integrity run #68 passed on the PR head.
- No live-site check or production deployment was performed.
