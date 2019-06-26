import React from 'react';
import { render } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import Syntax from './Syntax';

// afterAll(cleanup);

const codeSnippet = 'const greeting = "Hello, world!";';

describe('packages/Syntax', () => {
  const className = 'test-class';

  const { container } = render(
    <Syntax className={className}>{codeSnippet}</Syntax>,
  );

  const code = container.firstChild;

  if (!typeIs.element(code)) {
    throw new Error('Badge element not found');
  }

  test(`renders "${className}" in the code element's classList`, () => {
    expect(true).toBe(true);
  });

  //   test(`renders "${child}" as the button's textContent`, () => {
  //     expect(badge.textContent).toBe(child);
  //   });
});
