## Accessibility

This demo is used to show off accessibility scanning, so we hold it to the same bar we'd ask of any production site. The target is **[WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/)** on every page in `src/app`: `/`, `/login`, and `/dashboard`.

### How we audit

**GitHub Actions** ([`.github/workflows/starkflow.yml`](.github/workflows/starkflow.yml))

1. Go to **Actions → Stark Web Audit → Run workflow**.
2. Enter your Stark token and a display title.
3. The action (`stark-contrast/accessibility-check-action@3.0.2`) runs `npm i`, `npm run build`, and `npm run start`, then scans `http://localhost:3000`.
4. The results show up in your project in the Stark web app.

**Azure Pipelines** ([`azure-pipelines.yml`](azure-pipelines.yml))

The `StarkAccessibilityAudit@3` task starts the dev server with `npm run dev &` and scans the URLs listed under `urls`.

**Scanning more pages**

Both configs only scan the home page by default. To cover more pages, add them to the `urls` list, one per line:

```yaml
urls: |-
  http://localhost:3000
  http://localhost:3000/login
  http://localhost:3000/dashboard
```

`/dashboard` sits behind the login middleware, so an unauthenticated scan gets redirected.

### Before you open a PR

1. Run `npm run lint`. `eslint-config-next` includes the `jsx-a11y` rules.
2. Use the page with only the keyboard. `Tab`, `Shift+Tab`, `Enter`, and `Space` should reach and operate everything, and focus should always be visible.
3. Check the page with a screen reader: VoiceOver on macOS (`Cmd+F5`) or NVDA on Windows.
4. Zoom to 200% and narrow the window to 320px. Content should reflow without horizontal scrolling.

### Checklist

- **Images**: give meaningful images descriptive `alt` text. Decorative images get `alt=""`, as the header logo does.
- **Forms**: every input needs a `<label htmlFor>`. Placeholder text is not a label.
- **Focus**: never use `focus:outline-none` without a visible replacement, such as `focus:ring-2`.
- **Links vs. buttons**: links navigate and buttons act. Use a `<button>` for actions like "Log out", and don't ship `href="#"` placeholders.
- **Structure**: use `<header>`, `<nav>`, `<main>`, and `<footer>` landmarks. Give each page a single `<h1>` and don't skip heading levels.
- **Dynamic messages**: announce errors and status changes, for example with `role="alert"` on the login error.
- **Contrast**: normal text needs at least 4.5:1. Large text and UI components need at least 3:1.

### Known issues

- The header and footer use `href="#"` placeholder links.
- The header menu links aren't wrapped in a `<nav>`.
- The footer's social icons are images rather than links.
- The home page has two `<h1>` elements.
- The login page has no `<h1>` or `<main>`, and its error message isn't announced to screen readers.
- `metadata.description` in `src/app/layout.tsx` is still the create-next-app default.

### Reporting an issue

Open a GitHub issue that includes:

- the page or URL
- the steps to reproduce the problem
- the browser and assistive technology you used, with versions
- the WCAG success criterion involved, if you know it
