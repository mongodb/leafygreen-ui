import { simpleGit } from 'simple-git';

export const getRepositoryRoot = async (): Promise<string> => {
  try {
    const git = simpleGit();
    const rootDir = await git.revparse(['--show-toplevel']);
    return rootDir.trim();
  } catch (err) {
    console.error(err);
    return '';
  }
};
