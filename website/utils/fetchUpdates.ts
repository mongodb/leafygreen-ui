import fs from 'fs';
import util from 'util';
import { join } from 'path';
import matter from 'gray-matter';

export interface UpdateProps {
  date: string;
  story: string;
  route?: string;
  updateURL?: string;
}

const getDirContent = util.promisify(fs.readdir);
const getFileContent = util.promisify(fs.readFile);

const updatesDirectory = join(process.cwd(), 'updates');

async function getUpdateFileNames() {
  const fileNames = await getDirContent(updatesDirectory);
  return fileNames;
}

async function getIndividualUpdate(fileName: string): Promise<UpdateProps> {
  const slug = fileName.replace(/\.md$/, '');
  const fullPath = join(updatesDirectory, `${slug}.md`);
  const fileContents = await getFileContent(fullPath, 'utf-8');
  const { data } = matter(fileContents);

  return data as UpdateProps;
}

export async function getAllUpdates(): Promise<Array<UpdateProps>> {
  const fileNames = await getUpdateFileNames();
  const updates = await Promise.all(
    fileNames.map(fileName => getIndividualUpdate(fileName)),
  );

  return updates.sort((update1, update2) =>
    update1.date > update2.date ? -1 : 1,
  );
}
