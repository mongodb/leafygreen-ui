import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';

import emotion from './emotion';

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache,
} = emotion;

export { CacheProvider };

export const {
  extractCritical,
  renderStylesToString,
  renderStylesToNodeStream,
} = createEmotionServer(cache);

export default emotion;
