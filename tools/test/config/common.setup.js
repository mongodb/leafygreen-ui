require('@testing-library/jest-dom');

const { toHaveNoViolations } = require('jest-axe');
expect.extend(toHaveNoViolations);
