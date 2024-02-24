require('@testing-library/jest-dom');
require('@lg-tools/jest-matchers');

const { toHaveNoViolations } = require('jest-axe');
expect.extend(toHaveNoViolations);
