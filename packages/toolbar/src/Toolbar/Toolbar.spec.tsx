import React from 'react';
import { axe } from 'jest-axe';
import { renderToolbar } from '../utils/render.testutils';
import { getTestUtils } from '../utils';
import { Toolbar } from './Toolbar';
import { ToolbarIconButton } from '../ToolbarIconButton';

describe('packages/toolbar', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderToolbar({});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('renders the correct number of buttons', () => {
    renderToolbar({});
    const { getAllToolbarIconButtons } = getTestUtils();
    const buttons = getAllToolbarIconButtons();
    expect(buttons.length).toBe(5);
  });

  /* eslint-disable jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('TextInput throws error when no label is supplied', () => {
      <>
        {/* @ts-expect-error - children are required */}
        <Toolbar />;
        <Toolbar>
          <ToolbarIconButton glyph="Code" label="Code" />
        </Toolbar>
        {/* @ts-expect-error - data-lgid should start with lg */}
        <Toolbar data-lgid="toolbar">
          <ToolbarIconButton glyph="Code" label="Code" />
        </Toolbar>
        <Toolbar data-lgid="lg-toolbar">
          <ToolbarIconButton glyph="Code" label="Code" />
        </Toolbar>
      </>;
    });
  });
});
