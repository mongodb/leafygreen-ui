import React from 'react';
import { axe } from 'jest-axe';
import { getByText, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentedControlOption } from './SegmentedControlOption';
import { SegmentedControl } from './SegmentedControl';
import { typeIs } from '@leafygreen-ui/lib';

const testClassName = 'test-class-name';

const renderNewContainer = () => {
  const rendered = render(
    <SegmentedControl
      label="testLabel"
      name="testName"
      className={testClassName}
    >
      <SegmentedControlOption value="apple" data-testid="apple">
        Apple
      </SegmentedControlOption>
      <SegmentedControlOption value="banana" data-testid="banana">
        Banana
      </SegmentedControlOption>
    </SegmentedControl>,
  );

  const apple = getByText(rendered.container, 'Apple').parentElement
    ?.parentElement as Element;
  const banana = getByText(rendered.container, 'Banana').parentElement
    ?.parentElement as Element;

  return {
    ...rendered,
    apple,
    banana,
  };
};

const getComponentFromContainer = (container: HTMLElement) => {
  const { firstChild: component } = container;

  if (!typeIs.element(component)) {
    throw new Error(
      `Could not find segmented control container element in: ${container.outerHTML}`,
    );
  }

  return component;
};

describe('packages/segmented-control', () => {
  const { container } = renderNewContainer();

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const component = getComponentFromContainer(container);
      const results = await axe(component);
      expect(results).toHaveNoViolations();
    });

    test('tab should focus and unfocus the segmented control', () => {
      const { apple, banana } = renderNewContainer();

      expect(apple).not.toHaveFocus();
      expect(banana).not.toHaveFocus();
      userEvent.tab();
      expect(apple).toHaveFocus();
      expect(banana).not.toHaveFocus();
      userEvent.tab();
      expect(apple).not.toHaveFocus();
      expect(banana).not.toHaveFocus();
    });

    test('arrow keys should set focus on the next/previous option', () => {
      const { apple, banana } = renderNewContainer();

      userEvent.tab();
      expect(apple).toHaveFocus();

      userEvent.type(apple, '{arrowright}');
      expect(banana).toHaveFocus();

      userEvent.type(banana, '{arrowright}');
      expect(apple).toHaveFocus();

      userEvent.type(apple, '{arrowleft}');
      expect(banana).toHaveFocus();

      userEvent.type(banana, '{arrowleft}');
      expect(apple).toHaveFocus();
    });

    test('enter key should select an option', () => {
      const { apple, banana } = renderNewContainer();
      userEvent.tab();
      userEvent.type(apple, '{arrowright}');
      expect(banana).toHaveFocus();
      userEvent.type(banana, '{enter}');
      expect(banana).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('render', () => {
    test('renders the provided className in classList', () => {
      const { container } = renderNewContainer();
      const component = getComponentFromContainer(container);
      expect(component.classList).toContain(testClassName);
    });

    test('defaults to first option when no default value is provided', () => {
      const { apple } = renderNewContainer();
      expect(apple).toHaveAttribute('aria-selected', 'true');
    });

    test('Sets the clicked option to `checked`', () => {
      const { banana } = renderNewContainer();

      userEvent.click(banana);
      expect(banana).toHaveAttribute('aria-selected', 'true');
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

      const banana = getByText(container, 'Banana').parentElement
        ?.parentElement;
      expect(banana).toHaveAttribute('aria-selected', 'true');
    });
  });
});
