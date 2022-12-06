import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { typeIs } from '@leafygreen-ui/lib';

import WindowChrome from './WindowChrome';

afterAll(cleanup);

const title = 'chrome/title.js';

describe('packages/Syntax', () => {
  const { container } = render(<WindowChrome chromeTitle={title} />);

  const windowChromeContainer = container.firstChild as HTMLElement;

  if (!windowChromeContainer || !typeIs.element(windowChromeContainer)) {
    throw new Error('Code element not found');
  }

  test(`renders ${title} within the simulated window chrome`, () => {
    expect(windowChromeContainer.textContent).toBe(title);
  });
});
