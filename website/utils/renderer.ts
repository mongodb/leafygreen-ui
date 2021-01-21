import { extractCritical } from '@leafygreen-ui/emotion';

export const renderStatic = async (callback: () => string) => {
  const html = callback();

  if (html === undefined) {
    throw new Error('did you forget to return html from renderToString?');
  }

  const { ids, css } = extractCritical(html);

  return { html, ids, css };
};
