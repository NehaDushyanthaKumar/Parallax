# PARALLAX website

Built with Astro. Pushing to `main` on GitHub publishes the site automatically.

## Everyday editing
Sign in at https://app.pagescms.org and open this repository.

- **Articles:** add or edit an article, then save. It goes live within a few minutes.
- **Draft:** tick this to keep an article off the website.
- **Author:** must match a name in **Writers** exactly for the profile link to work.
- **Form and social links:** paste form links here. Until then, buttons lead to the Coming soon page.

## Developers
- `npm install`, then `npm run dev`, then open http://localhost:4321
- Colours, spacing and type: `src/styles/global.css`
- Header and footer: `src/layouts/Base.astro`
- Pages: `src/pages/`; content: `src/content/`; CMS fields: `.pages.yml`

## Images to replace
Export these from Figma and upload them to `public/images/` with the same names:
`turning-down-the-volume.jpg`, `the-queen-of-problems.jpg`, `logo-mark.png`, `logo-nav.png`.

## Custom domain
Set `CUSTOM_DOMAIN` in `astro.config.mjs`, add `public/CNAME` containing the domain, then set the domain under Settings > Pages.
