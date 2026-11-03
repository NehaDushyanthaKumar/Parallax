import { defineConfig } from 'astro/config';

// If you connect a custom domain, put it here, e.g. 'https://parallaxmagazine.org',
// and add a public/CNAME file containing the same domain (without https://).
const CUSTOM_DOMAIN = '';

// On GitHub, the owner and repository name are detected automatically.
const [owner = 'localhost', repo = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isRootSite = CUSTOM_DOMAIN || !repo || repo === `${owner}.github.io`;
const base = isRootSite ? '/' : `/${repo}/`;

// Keeps images placed inside article text working when the site lives in a sub-folder.
function prefixImages() {
  const walk = (node) => {
    if (node.tagName === 'img' && node.properties?.src?.startsWith('/images/')) {
      node.properties.src = base.replace(/\/$/, '') + node.properties.src;
    }
    node.children?.forEach(walk);
  };
  return walk;
}

export default defineConfig({
  site: CUSTOM_DOMAIN || (repo ? `https://${owner}.github.io` : 'http://localhost:4321'),
  base,
  trailingSlash: 'always',
  markdown: { rehypePlugins: [prefixImages] },
});
