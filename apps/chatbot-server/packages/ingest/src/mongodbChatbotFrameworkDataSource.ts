import {
  makeMdOnGithubDataSource,
  MakeMdOnGithubDataSourceParams,
} from 'mongodb-rag-core/dataSources';

const mongodbChatbotFrameworkDocsConfig: MakeMdOnGithubDataSourceParams = {
  name: 'mongodb-rag-framework',
  repoUrl: 'https://github.com/mongodb/chatbot/',
  repoLoaderOptions: {
    branch: 'main',
  },
  filter: path =>
    path.startsWith('/docs') &&
    path.endsWith('.md') &&
    !path.endsWith('README.md'),
  pathToPageUrl(pathInRepo) {
    const baseUrl = 'https://mongodb.github.io/chatbot/';
    const path = pathInRepo
      .replace(/^\/docs\/docs\//, '')
      .replace(/\.md$/, '')
      .replace(/index$/, '');
    return `${baseUrl}${path}`;
  },
  extractTitle: (pageContent, frontmatter) =>
    (frontmatter?.title as string) ?? extractFirstH1(pageContent),
};

// Helper function
function extractFirstH1(markdownText: string) {
  const lines = markdownText.split('\n');

  for (const line of lines) {
    if (line.startsWith('# ')) {
      // Remove '# ' and any leading or trailing whitespace
      return line.substring(2).trim();
    }
  }

  return null;
}

export const mongoDbChatbotFrameworkDocsDataSourceConstructor = async () =>
  await makeMdOnGithubDataSource(mongodbChatbotFrameworkDocsConfig);
