import React from 'react';
import { axe } from 'jest-axe';
import { getByLabelText, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SegmentedControlOption from './SegmentedControlOption';
import SegmentedControl from './SegmentedControl';
import { typeIs } from '@leafygreen-ui/lib';

const testClassName = 'test-class-name';

const renderNewContainer = () => {
  return render(
    <SegmentedControl
      label="testLabel"
      name="testName"
      className={testClassName}
    >
      <SegmentedControlOption value="apple">Apple</SegmentedControlOption>
      <SegmentedControlOption value="banana">Banana</SegmentedControlOption>
    </SegmentedControl>,
  );
};

const getComponentFromContainer = container => {
  const { firstChild: component } = container;

  if (!typeIs.element(component)) {
    throw new Error('Could not find segmented control container element');
  }

  return component;
};

describe('packages/segmented-control', () => {
  const { container } = renderNewContainer();
  const component = getComponentFromContainer(container);

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const results = await axe(component);
      expect(results).toHaveNoViolations();
    });

    test('tab should focus and unfocus the segmented control', () => {
      const { container } = renderNewContainer();
      const apple = getByLabelText(container, 'Apple');
      const banana = getByLabelText(container, 'Banana');
      expect(apple).not.toHaveFocus();
      expect(banana).not.toHaveFocus();
      userEvent.tab();
      expect(apple).toHaveFocus();
      expect(banana).not.toHaveFocus();
      userEvent.tab();
      expect(apple).not.toHaveFocus();
      expect(banana).not.toHaveFocus();
    });

    test('arrow keys should select the next/previous option', () => {
      const { container } = renderNewContainer();

      const apple = getByLabelText(container, 'Apple');
      const banana = getByLabelText(container, 'Banana');

      userEvent.tab();
      expect(apple).toHaveFocus();
      userEvent.keyboard('{arrowright}');
      expect(banana).toHaveFocus();
    });
  });

  describe('render', () => {
    test('renders the provided className in classList', () => {
      expect(component.classList).toContain(testClassName);
    });

    test('defaults to first option when no default value is provided', () => {
      const { container } = renderNewContainer();
      const apple = getByLabelText(container, 'Apple');
      expect(apple).toBeChecked();
    });

    test('Sets the clicked option to `checked`', () => {
      const { container } = renderNewContainer();
      const banana = getByLabelText(container, 'Banana');
      const bananaLabel = banana.parentElement;
      userEvent.click(bananaLabel);
      expect(banana).toBeChecked();
    });

    test('sets default value when provided', async () => {
      const { container } = render(
        <SegmentedControl
          label="testLabel"
          name="testName"
          defaultValue={'banana'}
        >
          <SegmentedControlOption value="apple">Apple</SegmentedControlOption>
          <SegmentedControlOption value="banana">Banana</SegmentedControlOption>
        </SegmentedControl>,
      );

      const banana = getByLabelText(container, 'Banana');
      expect(banana).toBeChecked();
    });
  });
});
