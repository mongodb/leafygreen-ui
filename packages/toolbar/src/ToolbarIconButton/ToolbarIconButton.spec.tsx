import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Toolbar } from '../Toolbar';

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
      <Toolbar>
        <ToolbarIconButton glyph="Code" label="Code" onClick={onClick} />
      </Toolbar>,
    );
    getByRole('button').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('accepts a ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<ToolbarIconButton glyph="Code" label="Code" ref={ref} />);

    expect(ref.current).toBeDefined();
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  test('shows tooltip on hover when tooltipEnabled is true', async () => {
    const { getByRole, findByRole } = render(
      <Toolbar>
        <ToolbarIconButton
          glyph="Code"
          label="Code Tooltip"
          tooltipEnabled={true}
        />
      </Toolbar>,
    );

    const button = getByRole('button');
    userEvent.hover(button);

    // Tooltip should appear
    const tooltip = await findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Code Tooltip');
  });

  test('does not show tooltip on hover when tooltipEnabled is false', async () => {
    const { getByRole, queryByRole } = render(
      <Toolbar>
        <ToolbarIconButton
          glyph="Code"
          label="Code Tooltip"
          tooltipEnabled={false}
        />
      </Toolbar>,
    );

    const button = getByRole('button');
    userEvent.hover(button);

    // Wait a bit to ensure tooltip would have appeared if enabled
    await new Promise(resolve => setTimeout(resolve, 100));

    // Tooltip should not appear
    const tooltip = queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();
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
