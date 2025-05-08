import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { Document as LangChainDocument } from '@langchain/core/documents';

interface LoadedPageContents {
  doc: LangChainDocument;
  title: string;
  links: Array<string>;
}

/**
 * Load the contents of a webpage using LangChain's CheerioWebBaseLoader
 * and return the document, title, and links found on the page.
 */
export const loadPageContents = async (
  url: string,
): Promise<LoadedPageContents> => {
  // Use LangChain's CheerioWebBaseLoader to load the URL content
  const loader = new CheerioWebBaseLoader(url, {
    selector: 'body',
  });

  // Remove script and style tags to clean up content
  const O = await loader.scrape();

  // Remove script and style tags to clean up content
  O('script').remove();
  O('style').remove();

  // Find all links on the page
  const links = O('a')
    .get()
    .map(link => link.attribs.href);

  // Extract title, H1, or use URL as fallback
  const title =
    O('title').text() || O('h1').text() || url.replace(/^(https?:\/\/)/, '');

  const text = O(loader.selector).text();

  const metadata = { source: loader.webPath, title };
  const doc = new LangChainDocument({ pageContent: text, metadata });

  return {
    doc,
    title,
    links,
  };
};
