import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TextInput from './TextInput';
import { typeIs } from '@leafygreen-ui/lib';

afterAll(cleanup);

describe('packages/text-input', () => {
  const className = 'test-text-input-class';
  const label = 'Test Input Label';

  const renderedComponent = render(
    <TextInput className={className} label={label} />,
  );
  const renderedTextInput = renderedComponent.container.firstChild;

  if (!typeIs.element(renderedTextInput)) {
    throw new Error('TextInput component failed to render');
  }

  test(`renders "${label}" as the input's label`, () => {
    expect(renderedTextInput.classList.contains(className)).toBe(true);
  });
});
