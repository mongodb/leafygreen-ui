import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ToolbarIconButton } from '.';

describe('packages/toolbar-icon-button', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(
        <ToolbarIconButton glyph="Code" label="Code" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ToolbarIconButton glyph="Code" label="Code" onClick={onClick} />,
    );
    getByRole('button').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // FIXME: IconButton forwardRef returns null
  test.skip('accepts a ref', () => {
    const ref = createRef<HTMLButtonElement>();
    <ToolbarIconButton glyph="Code" label="Code" ref={ref} />;

    expect(ref.current).toBeDefined();
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

/* eslint-disable jest/no-disabled-tests */
describe.skip('types behave as expected', () => {
  test('TextInput throws error when no label is supplied', () => {
    <>
      {/* @ts-expect-error - label and glyph are required */}
      <ToolbarIconButton />;
      <ToolbarIconButton
        glyph="Code"
        label="Code"
        onClick={() => {}}
        active
        disabled
      />
    </>;
  });
});
