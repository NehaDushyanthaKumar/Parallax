import { getCollection, type CollectionEntry } from 'astro:content';
import site from '../data/site.json';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Adds the site's base path to an internal link or image path. */
export const url = (path: string) => (/^(https?:|mailto:)/.test(path) ? path : `${base}${path}`);

/** Uses a form link once it has been entered in the CMS; until then, explains that it is pending. */
const formLink = (value: string) => (value ? value : url('/coming-soon/'));
export const links = {
  upload: formLink(site.uploadArticleUrl),
  newsletter: formLink(site.newsletterUrl),
  join: formLink(site.joinCommitteeUrl),
  design: formLink(site.designForUsUrl),
  instagram: site.instagramUrl,
};

export const SECTIONS = ['Features', 'News', 'Perspectives', 'Profiles'] as const;
export const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export type Article = CollectionEntry<'articles'>;
export const articlePath = (a: Article) => `/articles/${a.data.section.toLowerCase()}/${a.id}/`;

export async function getArticles() {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Reduce a name to lowercase words, ignoring case, dots, extra spaces and middle names or initials. */
function nameKey(name: string) {
  const words = name.toLowerCase().replace(/[.,]/g, ' ').split(/\s+/).filter(Boolean);
  return words.length > 1 ? `${words[0]} ${words[words.length - 1]}` : words.join(' ');
}

/** True when an article's author and a writer profile name refer to the same person. */
export function sameWriter(author: string, name: string) {
  return nameKey(author) === nameKey(name);
}

/** Link to a writer's page, or null if no writer profile matches the author's name. */
export async function writerPath(author: string) {
  const writers = await getCollection('writers');
  const match = writers.find((w) => sameWriter(author, w.data.name));
  return match ? `/about/writers/${match.id}/` : null;
}
