import { extractCritical as lgExtractCritical } from '@leafygreen-ui/emotion';
import createEmotionServer from '@emotion/server/create-instance';
import { cache } from '@emotion/css';

export const renderStatic = async (callback: () => string) => {
  const html = callback();

  if (html === undefined) {
    throw new Error('did you forget to return html from renderToString?');
  }

  const { extractCritical: websiteExtractCritical } = createEmotionServer(
    cache,
  );

  const { ids: websiteIds, css: websiteCss } = websiteExtractCritical(html);
  const { ids: lgIds, css: lgCss } = lgExtractCritical(html);

  const ids = [...websiteIds, ...lgIds];
  const css = websiteCss + lgCss;

  return { html, ids, css };
};
