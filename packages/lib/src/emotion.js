import createEmotion from 'create-emotion';

// In case the original emotion, and create-emotion packages become unsupported,
// we should consider implementing our own wrapper around createCache like what's
// being done here:
//
// https://github.com/emotion-js/emotion/blob/master/packages/create-emotion/src/index.js
function createEmotionInstance() {
  const head = document.head;
  const config = {
    container: document.createElement('div'),
    key: 'leafygreen-ui',
  };

  head.insertBefore(config.container, head.firstChild);

  return createEmotion(config);
}

export default createEmotionInstance();
