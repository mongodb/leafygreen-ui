import createEmotion from 'create-emotion';

interface CreateEmotionConfig {
  key: string;
  container?: HTMLElement;
}

// In case the original emotion, and create-emotion packages become unsupported,
// we should consider implementing our own wrapper around createCache like what's
// being done here:
//
// https://github.com/emotion-js/emotion/blob/master/packages/create-emotion/src/index.js
function createEmotionInstance() {
  const config: CreateEmotionConfig = {
    key: 'leafygreen-ui',
  };

  if (typeof window !== 'undefined') {
    config.container = document.createElement('div');

    const head = document.head;
    head.insertBefore(config.container, head.firstChild);
  }

  return createEmotion(config);
}

export default createEmotionInstance();
