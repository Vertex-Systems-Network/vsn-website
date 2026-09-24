# Legal Pre-Launch Review Handoff

This file records internal content-readiness checks for the VSN corporate website. It is **not** a legal opinion or a substitute for review by qualified counsel.

## Verified website behavior

- Corporate site is plain static HTML/CSS/vanilla JavaScript.
- The project brief form does not submit to a VSN website database; it prepares a WhatsApp message and the visitor chooses whether to send it.
- Repository search found no use of `document.cookie`, `localStorage`, `gtag`, analytics scripts or tracking pixels on the default branch at the 2026-09-24 review point.
- Current payment copy tells customers to use official invoices/verified checkout and not send full card details by chat, email or WhatsApp.
- Public legal identity used across policies: Vertex Systems Network (Private) Limited, SECP 0313834, NTN H979166, Multan, Punjab, Pakistan.

## Internal consistency checks completed

- Terms, Privacy, Refund & Cancellation, Cookie Policy and Payments are cross-linked.
- The legal entity name is consistent across policy pages.
- Current cookie wording matches the repository's current no-tracking implementation.
- Privacy wording matches the current WhatsApp handoff behavior.
- Refund/payment pages defer engagement-specific terms to signed proposals, SOWs, order forms, marketplace terms or invoices where applicable.
- No website copy is treated as proof of certification or regulatory approval.

## Final qualified-counsel review required before production launch

Counsel should review at minimum:

1. Governing law, jurisdiction and dispute wording.
2. Limitation-of-liability scope, exclusions and monetary cap.
3. Intellectual-property transfer language and treatment of reusable/pre-existing components.
4. Confidentiality obligations and credential-handling language.
5. Suspension, termination, milestone acceptance and overdue-payment provisions.
6. Refund/cancellation treatment for custom work, retainers, SaaS and marketplace purchases.
7. Privacy language, data-subject request handling, retention and cross-border processing.
8. Cookie/consent obligations if analytics, advertising, remarketing or other client-side storage is introduced.
9. Consumer/business distinctions, mandatory rights and any non-waivable remedies that may apply.
10. Tax, invoicing, payment-processing and marketplace wording for the jurisdictions VSN actually serves.
11. Children/minors language if any product or service later targets individuals rather than businesses/professionals.
12. Product-specific terms/privacy notices for each SaaS product before that product launches.

## Change-control rule

If the site later adds analytics, advertising, account creation, direct card checkout, user uploads, authentication, new SaaS products, or a materially different sales/refund model, re-open legal review before treating the current policies as launch-ready.
