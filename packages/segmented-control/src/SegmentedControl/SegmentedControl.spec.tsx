import React, { useState } from 'react';
import { fireEvent, getByText, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { typeIs } from '@leafygreen-ui/lib';
import { H1 } from '@leafygreen-ui/typography';

import { SegmentedControlOption } from '../SegmentedControlOption/SegmentedControlOption';

import { SegmentedControl } from './SegmentedControl';

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
      <SegmentedControlOption
        value="banana"
        data-testid="banana"
        glyph={<Icon glyph="Code" data-testid="glyph" />}
      >
        Banana
      </SegmentedControlOption>
    </SegmentedControl>,
  );

  const apple = getByText(rendered.container, 'Apple').closest(
    'button',
  ) as Element;
  const banana = getByText(rendered.container, 'Banana').closest(
    'button',
  ) as Element;

  return {
    ...rendered,
    apple,
    banana,
  };
};

const ExternallyControlledExample = () => {
  const [selected, setSelected] = useState('foo');

  return (
    <div>
      <SegmentedControl
        value={selected}
        onChange={val => {
          setSelected(val);
        }}
      >
        <SegmentedControlOption value="foo">Foo</SegmentedControlOption>
        <SegmentedControlOption value="bar">Bar</SegmentedControlOption>
      </SegmentedControl>
      <br />
      <Button
        onClick={() => {
          setSelected('bar');
        }}
      >
        Select Bar
      </Button>
    </div>
  );
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
  describe('a11y', () => {
    // Segmented Control needs to be accessible, but this should not block our React 18 migration work.
    // https://jira.mongodb.org/browse/LG-2922
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('does not have basic accessibility issues', async () => {
      const { container } = renderNewContainer();
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

      const banana = getByText(container, 'Banana').closest('button');
      expect(banana).toHaveAttribute('aria-selected', 'true');
    });

    test('glyph', () => {
      const { getByTestId } = renderNewContainer();
      expect(getByTestId('glyph')).toBeInTheDocument();
    });

    test('warning if LeafyGreen UI Glyph is not passed as Glyph', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <SegmentedControl
          label="testLabel"
          name="testName"
          defaultValue={'banana'}
        >
          <SegmentedControlOption value="apple" glyph={<H1>You caught me</H1>}>
            Apple
          </SegmentedControlOption>
          <SegmentedControlOption value="banana">Banana</SegmentedControlOption>
          <SegmentedControlOption value="orange">Orange</SegmentedControlOption>
        </SegmentedControl>,
      );

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(
        'Please provide a LeafyGreen UI Icon or Glyph component.',
      );
      spy.mockClear();
    });
  });

  describe('when uncontrolled', () => {
    test('clicking a new option changes the selected option', () => {
      const { apple, banana } = renderNewContainer();

      userEvent.click(banana);
      expect(banana).toHaveAttribute('aria-selected', 'true');
      userEvent.click(apple);
      expect(apple).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('when controlled', () => {
    test('changing the "value" prop changes the selected option', () => {
      const testControlledComponent = (value: string) => {
        return (
          <SegmentedControl
            label="testLabel"
            name="testName"
            className={testClassName}
            value={value}
          >
            <SegmentedControlOption value="apple" data-testid="apple">
              Apple
            </SegmentedControlOption>
            <SegmentedControlOption
              value="banana"
              data-testid="banana"
              glyph={<Icon glyph="Code" data-testid="glyph" />}
            >
              Banana
            </SegmentedControlOption>
          </SegmentedControl>
        );
      };

      const { container, rerender } = render(testControlledComponent('banana'));

      const banana = getByText(container, 'Banana').closest('button');
      const apple = getByText(container, 'Apple').closest('button');

      expect(banana).toHaveAttribute('aria-selected', 'true');
      rerender(testControlledComponent('apple'));
      expect(apple).toHaveAttribute('aria-selected', 'true');
    });

    test('when controlled externally', () => {
      const { container } = render(<ExternallyControlledExample />);

      const foo = getByText(container, 'Foo').closest('button');
      const bar = getByText(container, 'Bar').closest('button');
      const button = getByText(container, 'Select Bar').closest('button');

      expect(foo).toHaveAttribute('aria-selected', 'true');
      fireEvent.click(button!);
      expect(bar).toHaveAttribute('aria-selected', 'true');
      fireEvent.click(foo!);
      expect(foo).toHaveAttribute('aria-selected', 'true');
    });
  });
});
