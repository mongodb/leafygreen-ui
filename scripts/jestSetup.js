require('core-js/stable');
require('regenerator-runtime/runtime');

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
