import {
  handleHtmlDocument,
  HandleHtmlPageFuncOptions,
  makeGitDataSource,
} from 'mongodb-rag-core/dataSources';

export const leafygreenGithubSourceConstructor = async () => {
  return await makeGitDataSource({
    name: 'leafygreen-ui',
    repoUri: 'https://github.com/mongodb/leafygreen-ui.git',
    repoOptions: {
      '--depth': 1,
      '--branch': 'main',
    },
    metadata: {
      productName: 'LeafyGreen UI',
      version: '1.0.0',
      tags: ['leafygreen', 'docs'],
    },
    filter: (path: string) => path.endsWith('.md') || path.includes('types'),
    handlePage: async (path, content) =>
      await handleHtmlDocument(path, content, htmlParserOptions),
  });
};

const removeElements = (domDoc: Document) => [
  ...Array.from(domDoc.querySelectorAll('head')),
  ...Array.from(domDoc.querySelectorAll('script')),
  ...Array.from(domDoc.querySelectorAll('noscript')),
  ...Array.from(domDoc.querySelectorAll('#top')),
  ...Array.from(domDoc.querySelectorAll('.navpath')),
];

const extractTitle = (domDoc: Document) => {
  const title = domDoc.querySelector('title');

  return title?.textContent ?? undefined;
};

const extractMetadata = (domDoc: Document) => {
  const version = domDoc.querySelector('#projectnumber')?.textContent;
  return { version };
};

const pathToPageUrl = (pathInRepo: string) => {
  const baseUrl = 'https://mongodb.github.io/leafygreen-ui';
  const path = pathInRepo
    .replace(/^\/docs\//, '')
    .replace(/\.md$/, '')
    .replace(/index$/, '');
  return `${baseUrl}${path}`;
};

const htmlParserOptions: Omit<HandleHtmlPageFuncOptions, 'sourceName'> = {
  pathToPageUrl,
  removeElements,
  extractTitle,
  extractMetadata,
};
