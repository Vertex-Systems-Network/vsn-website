# Research Notes

Design and information architecture were informed by:

- PellaNova: focused productized personal-profile offering, clear package ladder, ownership/search positioning.
- TekRevol: enterprise service breadth, dedicated service landing pages, strong outcome-oriented copy.
- Vertex Systems Network public business profiles: software, web/mobile, SaaS, e-commerce, hosting and digital transformation positioning; public registration details.
- VSN Metafields Shopify listing: existing VSN product proof and current public pricing.

## Brand asset\n\nThe website now uses the official VSN logo URL supplied by the owner: `https://vertexsystemsnetwork.com/wp-content/uploads/2026/02/vertex-logo.png`.\n

The website uses the exact owner-supplied official VSN logo stored in `assets/vertex-logo.png`, verified by the static integrity check.\n\n## Owner-requested comparison refresh (2026-09-25)\n\nPellaNova’s public page makes a focused profile offer easier to assess through visible tiers, inclusions, ownership language, FAQs and direct next steps. TekRevol groups broad services by capability and industry, links to dedicated detail pages and uses evidence-led case studies. VSN applies those information-architecture lessons without copying claims or testimonials. PellaNova’s observed first package was $1,000; proposed VSN starting fees are $249 / $549 / $899 USD, subject to owner confirmation. These are draft business prices, not verified cost accounting.\n

## Pakistan tax-service benchmark and official sources (2026-09-25)

Reviewed Pakistani tax service pages for service organization across individuals/freelancers, AOPs and companies; annual returns, registrations, withholding, sales tax, records/reconciliations, notices, tax reviews and advisory. VSN uses the useful category-and-process structure without claiming third-party credentials, guaranteed savings or filing outcomes.

Official FBR references checked for page content:

- [File Income Tax Return / IRIS guidance](https://www.fbr.gov.pk/categ/file-income-tax-return/51147/80860/71158)
- [Income Tax Ordinance and amendments](https://www.fbr.gov.pk/Categ/Income-Tax-Ordinance/326) — current listing showed an edition amended through 30 June 2026.
- [Income Tax Rules](https://www.fbr.gov.pk/categ/income-tax-rules-2002/335) — current listing showed an edition amended through 15 September 2026.
- [Income-tax return forms and statements](https://www.fbr.gov.pk/categ/income-tax-return-forms-tax-year-2004-returns-certificate-and-statements/85)
- [Sales Tax Act](https://www.fbr.gov.pk/categ/sales-tax-act/301) — current listing showed an edition amended through 30 June 2026.

At the time of the initial service-copy review, no rates were hard-coded and the calculator tools remained planned. The later functional calculator update below supersedes that status. Federal and provincial service-tax jurisdiction must still be established for a particular service before selecting a rate or finalizing a filing position.

## Functional calculator update (2026-09-25)

Further FBR research for the implemented tools:

- [Withholding Tax Rate Card for Tax Year 2027](https://www.fbr.gov.pk/withholding-taxes-rate-card/174298/174301) — the current card is marked updated through 30 June 2026 as per Finance Act 2026 and publishes the individual salary schedule used for the TY2027 estimator. FBR's card itself states that the amended Ordinance prevails in case of conflict.
- [Finance Act 2026](https://fbr.gov.pk/Budget2026-27/FinanceAct.html) and [Income Tax Ordinance editions](https://www.fbr.gov.pk/Categ/Income-Tax-Ordinance/326) — used to anchor the individual's tax-year schedule and note the controlling statute.
- [FBR sales-tax basics](https://www.fbr.gov.pk/sales-tax-basics/51148/101149) — federal sales tax applies to goods, while services may fall under ICT or provincial/territorial rules; the calculators therefore require a user-confirmed applicable rate.
- [Punjab Revenue Authority](https://pra.punjab.gov.pk/), [Sindh Revenue Board taxable services](https://www.srb.gos.pk/srb/taxable-services/), [KPRA](https://kpra.gov.pk/) and [Balochistan Revenue Authority](https://bra.gob.pk/) — official starting points for provincial service-tax rules.

Implementation note: only the individual progressive estimate embeds a published TY2027 rate schedule. Company liability, transaction withholding, and sales tax depend on entity, section, ATL status, service classification, jurisdiction, credits and other facts, so those tools calculate from a rate the user supplies after checking the relevant official schedule. The estimator suite does not file or transmit data to FBR.
