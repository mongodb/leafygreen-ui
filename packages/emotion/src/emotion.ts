import createEmotion, { Options } from '@emotion/css/create-instance';

import { VERSION } from './version';

// In case the original emotion, and create-emotion packages become unsupported,
// we should consider implementing our own wrapper around createCache like what's
// being done here:
//
// https://github.com/emotion-js/emotion/blob/emotion%4010.0.6/packages/create-emotion/src/index.js
function createEmotionInstance() {
  const config: Options = {
    key: 'leafygreen-ui',
    nonce: VERSION,
    prepend: true,
  };

  return createEmotion(config);
}

export default createEmotionInstance();
