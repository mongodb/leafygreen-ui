import createEmotion from 'create-emotion';

export default (() => {
  const head = document.head;
  const config = {
    container: document.createElement('div'),
    key: 'leafygreen-ui',
  };

  head.insertBefore(config.container, head.firstChild);

  return createEmotion({}, config);
})();
