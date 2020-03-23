require('core-js/stable');

global.MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
