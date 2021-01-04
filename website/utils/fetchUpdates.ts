import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface UpdateProps {
  date: string;
  story: string;
  route?: string;
  updateURL?: string;
}

const updatesDirectory = join(process.cwd(), 'updates');

function getUpdateSlugs() {
  return fs.readdirSync(updatesDirectory);
}

function getIndividualUpdate(updateName) {
  const slug = updateName.replace(/\.md$/, '');
  const fullPath = join(updatesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  return data;
}

export function getAllUpdates() {
  const slugs = getUpdateSlugs();
  return slugs.map(slug => getIndividualUpdate(slug));
}
