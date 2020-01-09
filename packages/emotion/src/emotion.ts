import createEmotion from 'create-emotion';

// __TARGET__ is a global variable that indicates the webpack build target.
//
// We're typing this here because doing it globally was proving problematic.
// We should solve for this if we need to use __TARGET__ elsewhere.
declare const __TARGET__: 'web' | 'node';

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

  if (__TARGET__ === 'web') {
    config.container = document.createElement('div');

    const head = document.head;
    head.insertBefore(config.container, head.firstChild);
  }

  return createEmotion(config);
}

export default createEmotionInstance();
