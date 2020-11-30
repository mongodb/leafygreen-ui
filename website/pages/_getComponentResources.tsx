import fs from 'fs';
import path from 'path';
import util from 'util';
import markdownToHtml from 'utils/markdownToHtml';
import type { BaseLayoutProps } from 'utils/types';

export default function () {
  return null;
}

const getFileContent = util.promisify(fs.readFile);

export const getStaticProps = async (
  component: BaseLayoutProps['component'],
) => {
  if (typeof component !== 'string') {
    return { props: { component: null } };
  }

  const props: Partial<BaseLayoutProps> = { component };

  let changelogMarkdown: '' | Buffer = '';
  let readmeMarkdown = '';

  try {
    changelogMarkdown = await getFileContent(
      path.join('../packages/', component, '/CHANGELOG.md'),
    );
  } catch (error) {
    console.warn(error);
  }

  try {
    readmeMarkdown = await getFileContent(
      path.join('../packages/', component, '/README.md'),
      'utf-8',
    );
  } catch (error) {
    console.warn(error);
  }

  props.changelog = await markdownToHtml(changelogMarkdown);

  props.readme = readmeMarkdown;

  return {
    props,
  };
};
