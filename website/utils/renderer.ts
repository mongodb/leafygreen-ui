import { extractCritical } from '@leafygreen-ui/emotion';

export const renderStatic = async (callback: () => string) => {
  const html = callback();

  if (html === undefined) {
    throw new Error('did you forget to return html from renderToString?');
  }

  // Extracts critical styles from the custom LeafyGreen UI Emotion Server
  // https://github.com/mongodb/leafygreen-ui/tree/main/packages/emotion#server-side-rendering
  const { ids, css } = extractCritical(html);

  return { html, ids, css };
};
