# Direct-file distribution

The VSN website does not require a deployment platform or local development server to run.

## Use

Keep the repository directory structure intact and open:

`index.html`

directly in a modern browser.

## Runtime files

- `*.html`
- `legal/*.html`
- `assets/styles.css`
- `assets/app.js`
- `assets/vertex-logo.png`

JavaScript is client-side vanilla JS only.

## Path rules

Do not use root-relative local paths.

Correct on root pages:
- `assets/styles.css`
- `assets/app.js`
- `contact.html`

Correct inside `legal/`:
- `../assets/styles.css`
- `../assets/app.js`
- `../contact.html`

## Optional future hosting

If the same folder is later uploaded to a normal static web host, these relative paths remain valid. Hosting is optional and is not required for local/direct use.

Vercel is not part of the current architecture.
