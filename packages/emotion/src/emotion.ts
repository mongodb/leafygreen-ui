import createEmotion from 'create-emotion';

// We're doing this here because doing it globally was proving problematic.
// We should solve for this if we need to use __TARGET__ elsewhere in the future.
declare const __TARGET__:
  | 'web'
  | 'node'
  | 'async-node'
  | 'electron-main'
  | 'electron-renderer'
  | 'electron-preload'
  | 'node-webkit'
  | 'webworker';

// In case the original emotion, and create-emotion packages become unsupported,
// we should consider implementing our own wrapper around createCache like what's
// being done here:
//
// https://github.com/emotion-js/emotion/blob/master/packages/create-emotion/src/index.js
function createEmotionInstance() {
  const key = 'leafygreen-ui';

  if (__TARGET__ === 'web') {
    const head = document.head;
    const config = {
      container: document.createElement('div'),
      key,
    };

    head.insertBefore(config.container, head.firstChild);

    return createEmotion(config);
  }

  return createEmotion({ key });
}

export default createEmotionInstance();
