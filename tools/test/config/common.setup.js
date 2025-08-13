/**
 * JSDOM does not support the popover API, so we polyfill it
 * https://github.com/jsdom/jsdom/issues/3721
 */
require('@oddbird/popover-polyfill');
require('@testing-library/jest-dom');

const { toHaveNoViolations } = require('jest-axe');
expect.extend(toHaveNoViolations);
