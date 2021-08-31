import React from 'react';
import { axe } from 'jest-axe';
import {
  fireEvent,
  getByLabelText,
  render,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SegmentedControlOption from './SegmentedControlOption';
import SegmentedControl from './SegmentedControl';
import { typeIs } from '@leafygreen-ui/lib';

const testClassName = 'test-class-name';

const { container } = render(
  <SegmentedControl label="testLabel" name="testName" className={testClassName}>
    <SegmentedControlOption value="a">A</SegmentedControlOption>
    <SegmentedControlOption value="b">B</SegmentedControlOption>
  </SegmentedControl>,
);

describe('packages/segmented-control', () => {
  const { firstChild: component } = container;

  if (!typeIs.element(component)) {
    throw new Error('Could not find segmented control container element');
  }

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const results = await axe(component);
      expect(results).toHaveNoViolations();
    });

    test.todo('tab should focus and unfocus the segmented control');

    test.todo('arrow keys should select the next option');
  });

  describe('render', () => {
    test('renders the provided className in classList', () => {
      expect(component.classList).toContain(testClassName);
    });

    test('defaults to first option when no default value is provided', () => {
      const inputs = [...component.querySelectorAll('input')];
      expect(inputs[0].checked).toBeTruthy();
    });

    test.todo('Sets the clicked option to `checked`');

    test('sets default value when provided', () => {
      const { container } = render(
        <SegmentedControl label="testLabel" name="testName" defaultValue={'b'}>
          <SegmentedControlOption value="a">A</SegmentedControlOption>
          <SegmentedControlOption value="b">B</SegmentedControlOption>
        </SegmentedControl>,
      );

      const inputs = [...container.querySelectorAll('input')];
      expect(inputs[1].checked).toBeTruthy();
    });
  });
});
