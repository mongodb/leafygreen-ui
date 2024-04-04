import React, { createRef, PropsWithChildren, useState } from 'react';
import {
  act,
  fireEvent,
  getByText as getByTextFor,
  render,
  RenderResult,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';
import { PopoverContext } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';

import { getTestUtils } from '../utils/getTestUtils/getTestUtils';
import { TestUtilsReturnType } from '../utils/getTestUtils/getTestUtils.types';
import { Option, OptionGroup, Select } from '..';

import { SelectProps, State } from './Select.types';

const Color = {
  Red: 'Explicit value: Red',
  Blue: 'Blue',
  Green: 'Green',
  Yellow: 'Yellow',
  Orange: 'Orange',
  Indigo: 'Indigo',
  Violet: 'Violet',
} as const;

const errorMessage = 'This is the error message';

const enabledOptions = ['Select', 'Red', 'Blue', 'Green', 'Yellow'] as const;

const defaultProps = {
  label: 'Label',
  name: 'pet',
  description: 'Description',
  children: [
    <Option key="red" value={Color.Red}>
      Red
    </Option>,
    <Option key="blue">Blue</Option>,
    <Option key="orange" disabled>
      Orange
    </Option>,
    <OptionGroup key="enabled group" label="Enabled group">
      <Option>Green</Option>
      <Option>Yellow</Option>
    </OptionGroup>,
    <OptionGroup key="disabled group" label="Disabled group" disabled>
      <Option>Indigo</Option>
      <>
        <Option>Violet</Option>
      </>
    </OptionGroup>,
  ],
} as const;

function Controller({
  children,
  initialValue,
}: {
  children: (
    value: string,
    setValue: (value: React.SetStateAction<string>) => void,
  ) => React.ReactNode;
  initialValue: string;
}) {
  const [value, setValue] = useState<string>(initialValue);
  return <>{children(value, setValue)}</>;
}

function renderSelect(props = {}) {
  const renderUtils = render(<Select {...defaultProps} {...props} />);

  const utils = getTestUtils();

  const rerenderSelect = (newProps?: Partial<SelectProps>) => {
    const allProps = { ...props, ...newProps };

    renderUtils.rerender(<Select {...defaultProps} {...allProps} />);
  };

  return {
    ...renderUtils,
    ...utils,
    rerenderSelect,
  };
}

describe('packages/select', () => {
  test('renders label and description', () => {
    const { getLabel, getDescription } = renderSelect();
    expect(getLabel()).toBeVisible();
    expect(getDescription()).toBeVisible();
  });

  test('renders placeholder', async () => {
    const { getInput, getOptionByValue, rerenderSelect } = renderSelect();

    expect(getInput()).toHaveTextContent('Select');
    rerenderSelect({ placeholder: 'Explicit placeholder' });
    expect(getInput()).toHaveTextContent('Explicit placeholder');
    userEvent.click(getInput());
    expect(getOptionByValue('Explicit placeholder')).toBeInTheDocument();
  });

  test('accepts a ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Select ref={ref} {...defaultProps} />);
    expect(ref.current).toBeDefined();
    expect(ref.current).toBe(container.firstElementChild);
  });

  test('must render options in <Select>', () => {
    Context.within(Jest.spyContext(console, 'error'), spy => {
      spy.mockImplementation();

      expect(() => {
        render(<Option>bad</Option>);
      }).toThrow('`Option` must be a child of a `Select` instance');

      expect(() => {
        render(
          <OptionGroup label="bad">
            <Option>bad</Option>
          </OptionGroup>,
        );
      }).toThrow('`OptionGroup` must be a child of a `Select` instance');
    });
  });

  test('console errors if missing label, aria-label, or aria-labelledby', () => {
    Context.within(Jest.spyContext(console, 'error'), spy => {
      spy.mockImplementation();
      render(
        // @ts-expect-error - label missing
        <Select {...defaultProps} label={undefined}>
          <Option>Option</Option>
        </Select>,
      );
      expect(console.error).toHaveBeenCalled();
    });
  });

  test('does not console error when one of: label, aria-label, or aria-labelledby is set', () => {
    Context.within(Jest.spyContext(console, 'error'), spy => {
      spy.mockImplementation();

      render(
        <Select {...defaultProps}>
          <Option>Option</Option>
        </Select>,
      );
      expect(console.error).not.toHaveBeenCalled();

      render(
        <Select {...defaultProps} aria-label="test aria-label">
          <Option>Option</Option>
        </Select>,
      );
      expect(console.error).not.toHaveBeenCalled();

      render(
        <Select
          {...defaultProps}
          label={undefined}
          aria-labelledby="test aria-labelledby"
        >
          <Option>Option</Option>
        </Select>,
      );
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  test('option & group passes through data props', async () => {
    const { queryByTestId } = render(
      <Select label="Label">
        <OptionGroup label="Group" data-testid="lg-group">
          <Option data-testid="lg-option">Option</Option>
        </OptionGroup>
      </Select>,
    );

    const { getInput } = getTestUtils();

    userEvent.click(getInput());

    const group = queryByTestId('lg-group');
    const option = queryByTestId('lg-option');
    expect(group).toBeInTheDocument();
    expect(option).toBeInTheDocument();
  });

  describe('tab order', () => {
    test('contains component when enabled', () => {
      const { getInput } = renderSelect();

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(getInput()).toHaveFocus();

      userEvent.tab();
      expect(document.body).toHaveFocus();
    });

    // Select should still be focusable when disabled
    test('and contains component when disabled', () => {
      const { getInput } = renderSelect({ disabled: true });

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(getInput()).toHaveFocus();

      userEvent.tab();
      expect(document.body).toHaveFocus();
    });
  });

  describe.each([
    ['enabled', true],
    ['disabled', false],
  ])('has initially selected option when %p', (_, enabled) => {
    const isDisabled = !enabled;

    test('when uncontrolled', () => {
      const {
        getInput,
        isDisabled: utilsIsDisabled,
        getInputValue,
      } = renderSelect({
        disabled: isDisabled,
        defaultValue: Color.Blue,
      });

      expect(getInput()).toBeVisible();
      expect(getInputValue()).toBe('Blue');
      expect(utilsIsDisabled()).toBe(isDisabled);
    });

    test('when controlled', () => {
      const onChangeSpy = jest.fn();
      const {
        getInput,
        isDisabled: utilsIsDisabled,
        getInputValue,
      } = renderSelect({
        disabled: isDisabled,
        value: Color.Blue,
        onChange: onChangeSpy,
      });

      expect(getInput()).toBeVisible();
      expect(getInputValue()).toBe('Blue');
      expect(utilsIsDisabled()).toBe(isDisabled);
      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });

  test('warns when controlled component has no `onChange` handler', () => {
    Context.within(Jest.spyContext(console, 'warn'), spy => {
      spy.mockImplementation();

      // @ts-expect-error - expecting `readOnly` prop
      render(<Select {...defaultProps} value="" />);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(
        'You provided a `value` prop to a form field without an `onChange` handler. ' +
          'This will render a read-only field. ' +
          'If the field should be mutable use `defaultValue`. ' +
          'Otherwise, set either `onChange` or `readOnly`.',
      );

      spy.mockClear();

      render(<Select {...defaultProps} defaultValue="" />);
      render(<Select {...defaultProps} value="" readOnly />);
      render(<Select {...defaultProps} value="" onChange={() => {}} />);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('list menu', () => {
    test('allowDeselect prevents placeholder from being rendered', async () => {
      const { getInput, queryByText } = renderSelect({
        allowDeselect: false,
        defaultValue: Color.Red,
      });

      userEvent.click(getInput());
      expect(queryByText('Select')).not.toBeInTheDocument();
    });

    test('does not render invalid  option', async () => {
      const { queryByText } = Context.within(
        Jest.spyContext(console, 'error'),
        spy => {
          spy.mockImplementation();

          const result = render(
            <Select {...defaultProps}>
              {defaultProps.children}
              <Option glyph={<BeakerIcon />}>White</Option>
              <div>Invalid element</div>
            </Select>,
          );

          const { getInput } = getTestUtils();

          userEvent.click(getInput());
          expect(spy).toHaveBeenCalledWith(
            '`Select` instance received child that is not `Option` or `OptionGroup`.',
          );

          return result;
        },
      );
      expect(queryByText('Invalid element')).not.toBeInTheDocument();
    });

    test('omitting empty elements', () => {
      Context.within(Jest.spyContext(console, 'error'), spy => {
        spy.mockImplementation();

        render(
          <Select {...defaultProps}>
            {defaultProps.children}
            <></>
            {}
            {''}
            {false}
            {null}
            {undefined}
          </Select>,
        );

        const { getInput } = getTestUtils();
        act(() => {
          userEvent.click(getInput());
        });
        expect(spy).not.toHaveBeenCalled();
      });
    });

    test('glyph', async () => {
      const { getAllByLabelText } = render(
        <Select {...defaultProps} defaultValue="selected">
          <Option glyph={<BeakerIcon />} value="nonselected">
            Non-selected with glyph
          </Option>
          <Option glyph={<BeakerIcon />} value="selected">
            Selected with glyph
          </Option>
        </Select>,
      );

      const { getPopover, getInput } = getTestUtils();

      userEvent.click(getInput());

      await waitFor(() => {
        expect(getPopover()).toBeVisible();
        getAllByLabelText('Beaker Icon').forEach(element =>
          expect(element).toBeVisible(),
        );
      });
    });

    test('invalid glyph', () => {
      Context.within(Jest.spyContext(console, 'error'), spy => {
        spy.mockImplementation();

        render(
          <Select {...defaultProps}>
            <Option glyph={<div />}>Bad icon</Option>
          </Select>,
        );

        const { getInput } = getTestUtils();

        userEvent.click(getInput());

        expect(spy).toHaveBeenCalledWith(
          '`Option` instance did not render icon because it is not a known glyph element.',
        );
      });
    });

    describe('opening', () => {
      test('by clicking', async () => {
        const { getPopover, getInput } = renderSelect();

        userEvent.click(getInput());

        await waitFor(() => {
          expect(getPopover()).toBeVisible();
        });

        expect(getInput()).toHaveFocus();
      });

      test('by arrow down key', async () => {
        const { getOptionByValue, getPopover, getInput } = renderSelect();

        // focus on button element
        userEvent.tab();
        userEvent.type(getInput(), '{arrowdown}');

        await waitFor(() => {
          expect(getPopover()).toBeVisible();
        });

        const firstOption = getOptionByValue('Select');
        // First option is focused
        expect(firstOption).toHaveFocus();
      });

      test('by arrow up key', async () => {
        const { getOptionByValue, getPopover, getInput } = renderSelect();

        // focus on button element
        userEvent.tab();
        userEvent.type(getInput(), '{arrowup}');

        await waitFor(() => {
          expect(getPopover()).toBeVisible();
        });

        const lastOption = getOptionByValue('Yellow');
        // Last enabled option is focused
        expect(lastOption).toHaveFocus();
      });

      describe('is not allowed when disabled', () => {
        test('by clicking', () => {
          const { getPopover, getInput } = renderSelect({
            disabled: true,
          });

          expect(() => userEvent.click(getInput())).toThrow();
          expect(getPopover()).not.toBeInTheDocument();
        });

        test('by arrow down key', () => {
          const { getPopover, getInput } = renderSelect({
            disabled: true,
          });

          // console.error
          // Error: unable to click element as it has or inherits pointer-events set to "none".
          userEvent.type(getInput(), '{arrowdown}');
          expect(getPopover()).not.toBeInTheDocument();
        });

        test('by arrow up key', () => {
          const { getPopover, getInput } = renderSelect({
            disabled: true,
          });

          // console.error
          // Error: unable to click element as it has or inherits pointer-events set to "none".
          userEvent.type(getInput(), '{arrowup}');
          expect(getPopover()).not.toBeInTheDocument();
        });
      });
    });

    describe('fires Popover callbacks', () => {
      test('opening the select fires the `onEnter*` callbacks', async () => {
        const onEnter = jest.fn();
        const onEntering = jest.fn();
        const onEntered = jest.fn();

        const { getInput } = renderSelect({
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered,
        });

        userEvent.click(getInput());
        expect(onEnter).toHaveBeenCalled();
        expect(onEntering).toHaveBeenCalled();
        await waitFor(() => expect(onEntered).toHaveBeenCalled());
      });

      test('closing the select fires the `onExit*` callbacks', async () => {
        const onExit = jest.fn();
        const onExiting = jest.fn();
        const onExited = jest.fn();

        const { getInput } = renderSelect({
          onExit: onExit,
          onExiting: onExiting,
          onExited: onExited,
        });

        userEvent.click(getInput());
        userEvent.click(getInput());

        expect(onExit).toHaveBeenCalled();
        expect(onExiting).toHaveBeenCalled();
        await waitFor(() => expect(onExited).toHaveBeenCalled());
      });
    });

    describe('closing', () => {
      describe('selecting an option closes menu', () => {
        test('on mouse click', async () => {
          const { getInput, getPopover, getOptionByValue } = renderSelect();

          userEvent.click(getInput());
          await waitFor(() => {
            expect(getPopover()).toBeVisible();
          });

          userEvent.click(getOptionByValue('Red')!);
          await waitForElementToBeRemoved(getPopover());
          expect(getPopover()).not.toBeInTheDocument();
        });

        test('on enter', async () => {
          const { getInput, getPopover } = renderSelect();

          userEvent.type(getInput(), '{arrowdown}');
          await waitFor(() => {
            expect(getPopover()).toBeVisible();
          });
          // first option is focused by default
          userEvent.keyboard('{enter}');
          await waitForElementToBeRemoved(getPopover());
          expect(getPopover()).not.toBeInTheDocument();
        });

        test('on space', async () => {
          const { getInput, getPopover } = renderSelect();

          userEvent.type(getInput(), '{arrowdown}');
          await waitFor(() => {
            expect(getPopover()).toBeVisible();
          });
          // first option is focused by default
          userEvent.keyboard('{space}');
          await waitForElementToBeRemoved(getPopover());
          expect(getPopover()).not.toBeInTheDocument();
        });
      });
    });

    describe.each([
      ['menu button', 'button'],
      ['list menu', 'listbox'],
    ] as const)('closing when %p is focused', (_, focusedElementRole) => {
      let getByRole: RenderResult['getByRole'];
      let getByText: RenderResult['getByText'];
      let getPopover: () => HTMLDivElement | null;
      let getInput: () => HTMLButtonElement;

      beforeEach(async () => {
        ({ getPopover, getByRole, getByText, getInput } = renderSelect());

        userEvent.click(getInput());

        await waitFor(() => {
          // eslint-disable-next-line jest/no-standalone-expect
          expect(getPopover()).toBeVisible();
        });

        const focusedElement = getByRole(focusedElementRole);
        act(() => focusedElement.focus());
      });

      test('by clicking outside', async () => {
        userEvent.click(document.body);

        expect(document.body).toHaveFocus();
        await waitForElementToBeRemoved(getPopover());
      });

      test('by clicking menu button', async () => {
        const button = getInput();
        userEvent.click(button);

        expect(button).toHaveFocus();
        await waitForElementToBeRemoved(getPopover());
      });

      test('by escape key', async () => {
        userEvent.type(getByRole(focusedElementRole), '{esc}');

        const button = getInput();
        expect(button).toHaveFocus();
        await waitForElementToBeRemoved(getPopover());
      });

      test('does not occur by clicking on option group label', async () => {
        userEvent.click(getByText('Enabled group'));

        await waitFor(() => {
          expect(getPopover()).toBeVisible();
        });

        expect(getPopover()).toHaveFocus();
      });
    });

    describe.each([
      ['uncontrolled', false],
      ['controlled', true],
    ])('when %p selecting', (_, controlled) => {
      let button: HTMLElement;
      let onChangeSpy: jest.MockedFunction<
        (
          value: string,
          event: React.MouseEvent | KeyboardEvent | React.KeyboardEvent,
        ) => void
      >;
      let selectUtils: TestUtilsReturnType;

      beforeEach(() => {
        onChangeSpy = jest.fn();

        render(
          controlled ? (
            <Controller initialValue="">
              {(value, setValue) => (
                <Select
                  {...defaultProps}
                  value={value}
                  onChange={(value, event) => {
                    setValue(value);
                    onChangeSpy(value, event);
                  }}
                />
              )}
            </Controller>
          ) : (
            <Select {...defaultProps} onChange={onChangeSpy} />
          ),
        );

        const utils = getTestUtils();

        button = utils.getInput();
        selectUtils = utils;
      });

      describe.each([
        ['option', 'Red', Color.Red],
        ['option in group', 'Green', Color.Green],
      ])('%p', (_, optionText, optionValue) => {
        test('by Enter key', async () => {
          userEvent.click(button);

          const listbox = await waitFor(() => {
            const listbox = selectUtils.getPopover();
            return listbox;
          });

          const targetOption = selectUtils.getOptionByValue(optionText);
          expect(targetOption).not.toBe(null);

          act(() => targetOption!.focus());

          userEvent.keyboard('[Enter]');

          expect(onChangeSpy).toHaveBeenCalledTimes(1);
          expect(onChangeSpy).toHaveBeenCalledWith(
            optionValue,
            expect.anything(),
          );

          await waitForElementToBeRemoved(listbox);

          expect(getByTextFor(button, optionText)).toBeVisible();
          expect(button).toHaveFocus();
          expect(button).toHaveValue(optionValue);
        });

        test('by space key', async () => {
          userEvent.click(button);

          const listbox = await waitFor(() => {
            const listbox = selectUtils.getPopover();
            return listbox;
          });

          const targetOption = selectUtils.getOptionByValue(optionText);
          expect(targetOption).not.toBe(null);

          act(() => targetOption!.focus());

          userEvent.keyboard('[Space]');

          expect(onChangeSpy).toHaveBeenCalledTimes(1);
          expect(onChangeSpy).toHaveBeenCalledWith(
            optionValue,
            expect.anything(),
          );

          await waitForElementToBeRemoved(listbox);

          expect(getByTextFor(button, optionText)).toBeVisible();
          expect(button).toHaveFocus();
          expect(button).toHaveValue(optionValue);
        });

        test('by clicking', async () => {
          userEvent.click(button);

          const listbox = await waitFor(() => {
            const listbox = selectUtils.getPopover();
            return listbox;
          });

          const targetOption = selectUtils.getOptionByValue(optionText);
          userEvent.click(targetOption!);

          expect(onChangeSpy).toHaveBeenCalledTimes(1);
          expect(onChangeSpy).toHaveBeenCalledWith(
            optionValue,
            expect.anything(),
          );

          await waitForElementToBeRemoved(listbox);

          expect(getByTextFor(button, optionText)).toBeVisible();
          expect(button).toHaveFocus();
          expect(button).toHaveValue(optionValue);
        });
      });

      describe.each([
        ['disabled option', 'Orange'],
        ['option in disabled group', 'Indigo'],
      ])('does not occur for %p', (_, optionText) => {
        // eslint-disable-next-line jest/no-identical-title
        test('by Enter key', async () => {
          userEvent.click(button);

          const listbox = await waitFor(() => {
            const listbox = selectUtils.getPopover();
            return listbox;
          });

          const targetOption = selectUtils.getOptionByValue(optionText);
          expect(targetOption).not.toBe(null);

          act(() => targetOption!.focus());
          fireEvent.keyDown(targetOption!, {
            key: keyMap.Enter,
          });

          expect(onChangeSpy).not.toHaveBeenCalled();
          expect(listbox).toBeInTheDocument();

          expect(getByTextFor(button, 'Select')).toBeVisible();
          expect(targetOption).toHaveFocus();

          expect(button).toHaveValue('');
        });

        // eslint-disable-next-line jest/no-identical-title
        test('by clicking', async () => {
          userEvent.click(button);

          const listbox = await waitFor(() => {
            const listbox = selectUtils.getPopover();
            return listbox;
          });

          const targetOption = selectUtils.getOptionByValue(optionText);
          userEvent.click(targetOption!);

          expect(onChangeSpy).not.toHaveBeenCalled();
          expect(listbox).toBeInTheDocument();

          expect(getByTextFor(button, 'Select')).toBeVisible();
          expect(button).toHaveValue('');
        });
      });
    });

    describe('focus', () => {
      test('moves to next option by arrow down key', async () => {
        const { getPopover, getOptionByValue, getOptions, getInput } =
          renderSelect();

        userEvent.click(getInput());

        const listbox = (await waitFor(() => {
          const listbox = getPopover();
          expect(listbox).toBeInTheDocument();
          return listbox;
        })) as HTMLDivElement;

        enabledOptions.forEach(expectedOptionText => {
          userEvent.type(listbox, '{arrowdown}');
          expect(getOptionByValue(expectedOptionText)).toHaveFocus();
        });

        // Moves to first option when the end is reached
        userEvent.type(listbox, '{arrowdown}');

        expect(getOptions()[0]).toHaveFocus();
      });

      test('moves to previous option by arrow down key', async () => {
        const { getInput, getPopover, getOptionByValue } = renderSelect();

        userEvent.click(getInput());

        const listbox = (await waitFor(() => {
          const listbox = getPopover();
          expect(listbox).toBeInTheDocument();
          return listbox;
        })) as HTMLDivElement;

        [...enabledOptions].reverse().forEach(expectedOptionText => {
          userEvent.type(listbox, '{arrowup}');

          expect(getOptionByValue(expectedOptionText)).toHaveFocus();
        });

        // Moves to last option when the top is reached
        userEvent.type(listbox, '{arrowup}');

        expect(getOptionByValue('Yellow')).toHaveFocus();
      });
    });
  });

  describe('selected option is stable', () => {
    const selected: JSX.Element = (
      <Option value="selected">Selected Option</Option>
    );
    const nonselected: JSX.Element = (
      <Option value="nonselected">Non-selected Option</Option>
    );

    let rerender: RenderResult['rerender'];
    let button: HTMLElement;
    let selectUtils: TestUtilsReturnType;

    beforeEach(async () => {
      ({ rerender } = render(
        <Select label="Choice" name="choice">
          {selected}
          {nonselected}
        </Select>,
      ));

      const utils = getTestUtils();

      button = utils.getInput();
      selectUtils = utils;

      userEvent.click(button);

      const targetOption = selectUtils.getOptionByValue('Selected Option');
      userEvent.click(targetOption!);
    });

    test('when selected option is removed', () => {
      rerender(
        <Select label="Choice" name="choice">
          {nonselected}
        </Select>,
      );

      expect(button).toHaveTextContent('Select');
    });

    test('when options are re-ordered', () => {
      rerender(
        <Select label="Choice" name="choice">
          {nonselected}
          {selected}
        </Select>,
      );

      expect(button).toHaveTextContent('Selected Option');
    });

    describe('when selected option is replaced', () => {
      test('with different object identity', () => {
        rerender(
          <Select label="Choice" name="choice">
            {nonselected}
            <Option value="selected">Selected Option</Option>
          </Select>,
        );

        expect(button).toHaveTextContent('Selected Option');
      });

      test('with same explicit value and different text', () => {
        rerender(
          <Select label="Choice" name="choice">
            {nonselected}
            <Option>selected</Option>
            <Option value="selected">Different text</Option>
          </Select>,
        );

        expect(button).toHaveTextContent('Different text');
      });

      test('with same computed value', () => {
        rerender(
          <Select label="Choice" name="choice">
            {nonselected}
            <Option>select{'ed'}</Option>
          </Select>,
        );

        expect(button).toHaveTextContent('selected');
      });
    });
  });

  describe('when the "state" is "error"', () => {
    test('error message is present', () => {
      const { isError, getErrorMessage } = renderSelect({
        state: State.Error,
        errorMessage: errorMessage,
      });
      expect(isError).toBeTruthy();
      expect(getErrorMessage()).toBeInTheDocument();
    });

    test('error message is not present if "errorMessage" is empty', () => {
      const { isError, getErrorMessage } = renderSelect({
        state: State.Error,
      });
      expect(isError).toBeTruthy();
      expect(getErrorMessage()).not.toBeInTheDocument();
    });
  });

  describe('when the "state" is "none"', () => {
    test('error message is not present', () => {
      const { getErrorMessage } = renderSelect();
      expect(getErrorMessage()).not.toBeInTheDocument();
    });
  });

  describe('without Portal (usePortal="false")', () => {
    test('menu opens', async () => {
      const { getInput, getPopover } = renderSelect({ usePortal: false });

      userEvent.click(getInput());
      await waitFor(() => expect(getPopover()).toBeVisible());
    });

    test('menu renders as a child of button', async () => {
      const { getPopover, getInput } = renderSelect({
        usePortal: false,
      });

      userEvent.click(getInput());

      await waitFor(() => {
        const popover = getPopover();
        expect(popover).toBeInTheDocument();
        expect(getInput()).toContainElement(popover);
      });
    });

    describe('fires onChange when selecting an option', () => {
      test('on mouse click', async () => {
        const onChange = jest.fn();

        const { getInput, getOptionByValue } = renderSelect({
          usePortal: false,
          onChange: onChange,
        });

        userEvent.click(getInput());
        userEvent.click(getOptionByValue('Red')!);
        expect(onChange).toHaveBeenCalled();
      });

      test('on enter', async () => {
        const onChange = jest.fn();
        const { getInput } = renderSelect({
          usePortal: false,
          onChange: onChange,
        });

        const button = getInput();
        userEvent.type(button, '{arrowdown}');
        // first option is focused by default
        userEvent.keyboard('{enter}');
        expect(onChange).toHaveBeenCalled();
      });

      test('on space', async () => {
        const onChange = jest.fn();
        const { getInput } = renderSelect({
          usePortal: false,
          onChange: onChange,
        });

        const button = getInput();
        userEvent.type(button, '{arrowdown}');
        // first option is focused by default
        userEvent.keyboard('{space}');
        expect(onChange).toHaveBeenCalled();
      });
    });

    describe('closing', () => {
      describe('selecting an option closes menu', () => {
        test('on mouse click', async () => {
          const { getInput, getPopover, getOptionByValue } = renderSelect({
            usePortal: false,
          });
          userEvent.click(getInput());
          await waitFor(() => {
            expect(getPopover()).toBeVisible();
          });
          userEvent.click(getOptionByValue('Red')!);
          await waitForElementToBeRemoved(getPopover());
          expect(getPopover()).not.toBeInTheDocument();
        });

        test('on enter', async () => {
          const { getInput, getPopover } = renderSelect({
            usePortal: false,
          });

          const button = getInput();
          userEvent.type(button, '{arrowdown}');
          await waitFor(() => {
            expect(getPopover()).toBeInTheDocument();
          });
          // first option is focused by default
          userEvent.keyboard('{enter}');
          await waitForElementToBeRemoved(getPopover());
          expect(getPopover()).not.toBeInTheDocument();
        });

        test('on space', async () => {
          const { getInput, getPopover } = renderSelect({
            usePortal: false,
          });

          const button = getInput();
          userEvent.type(button, '{arrowdown}');
          await waitFor(() => {
            expect(getPopover()).toBeInTheDocument();
          });
          // first option is focused by default
          userEvent.keyboard('{space}');
          await waitForElementToBeRemoved(getPopover());
          expect(getPopover()).not.toBeInTheDocument();
        });
      });
    });

    describe('fires Popover callbacks', () => {
      test('opening the select fires the `onEnter*` callbacks', async () => {
        const onEnter = jest.fn();
        const onEntering = jest.fn();
        const onEntered = jest.fn();

        const { getInput } = renderSelect({
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered,
          usePortal: false,
        });

        userEvent.click(getInput());
        expect(onEnter).toHaveBeenCalled();
        expect(onEntering).toHaveBeenCalled();
        await waitFor(() => expect(onEntered).toHaveBeenCalled());
      });

      test('closing the select fires the `onExit*` callbacks', async () => {
        const onExit = jest.fn();
        const onExiting = jest.fn();
        const onExited = jest.fn();

        const { getInput } = renderSelect({
          onExit: onExit,
          onExiting: onExiting,
          onExited: onExited,
          usePortal: false,
        });

        userEvent.click(getInput());
        userEvent.click(getInput());

        expect(onExit).toHaveBeenCalled();
        expect(onExiting).toHaveBeenCalled();
        await waitFor(() => expect(onExited).toHaveBeenCalled());
      });
    });
  });

  describe('with PopoverContext', () => {
    const mockSetIsPopoverOpen = jest.fn();

    const MockPopoverProvider = ({ children }: PropsWithChildren<{}>) => {
      return (
        <PopoverContext.Provider
          value={{
            isPopoverOpen: false,
            setIsPopoverOpen: mockSetIsPopoverOpen,
          }}
        >
          {children}
        </PopoverContext.Provider>
      );
    };

    beforeEach(() => {
      mockSetIsPopoverOpen.mockClear();
    });

    test('calls `setIsPopoverOpen`', async () => {
      render(
        <MockPopoverProvider>
          <Select {...defaultProps} />
        </MockPopoverProvider>,
      );

      const { getInput } = getTestUtils();

      userEvent.click(getInput());
      await waitFor(() =>
        expect(mockSetIsPopoverOpen).toHaveBeenCalledWith(true),
      );
      userEvent.click(getInput());
      await waitFor(() =>
        expect(mockSetIsPopoverOpen).toHaveBeenCalledWith(false),
      );
    });

    test('calls `setIsPopoverOpen` when `usePortal == false`', async () => {
      render(
        <MockPopoverProvider>
          <Select usePortal={false} {...defaultProps} />
        </MockPopoverProvider>,
      );

      const { getInput } = getTestUtils();

      userEvent.click(getInput());
      await waitFor(() =>
        expect(mockSetIsPopoverOpen).toHaveBeenCalledWith(true),
      );
      userEvent.click(getInput());
      await waitFor(() =>
        expect(mockSetIsPopoverOpen).toHaveBeenCalledWith(false),
      );
    });
  });
});
