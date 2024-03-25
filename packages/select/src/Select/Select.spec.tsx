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

import { getLGSelectTestUtils } from '../utils/getLGSelectTestUtils/getLGSelectTestUtils';
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

  const { elements, utils } = getLGSelectTestUtils();

  const rerenderSelect = (newProps?: Partial<SelectProps>) => {
    const allProps = { ...props, ...newProps };
    renderUtils.rerender(<Select {...defaultProps} {...allProps} />);
  };

  return {
    ...renderUtils,
    ...elements,
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
    const { getSelect, clickTrigger, getOptionByValue, rerenderSelect } =
      renderSelect();

    expect(getSelect()).toHaveTextContent('Select');
    rerenderSelect({ placeholder: 'Explicit placeholder' });
    expect(getSelect()).toHaveTextContent('Explicit placeholder');
    clickTrigger();

    await waitFor(() => {
      expect(getOptionByValue('Explicit placeholder')).toBeInTheDocument();
    });
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

    const {
      utils: { clickTrigger },
    } = getLGSelectTestUtils();

    await waitFor(() => {
      clickTrigger();
    });

    const group = queryByTestId('lg-group');
    const option = queryByTestId('lg-option');
    expect(group).toBeInTheDocument();
    expect(option).toBeInTheDocument();
  });

  describe('tab order', () => {
    test('contains component when enabled', () => {
      const { getSelect } = renderSelect();

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(getSelect()).toHaveFocus();

      userEvent.tab();
      expect(document.body).toHaveFocus();
    });

    // Select should still be focusable when disabled
    test('and contains component when disabled', () => {
      const { getSelect } = renderSelect({ disabled: true });

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(getSelect()).toHaveFocus();

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
      const { getSelect, isDisabled: utilsIsDisabled } = renderSelect({
        disabled: isDisabled,
        defaultValue: Color.Blue,
      });

      expect(getSelect()).toBeVisible();
      expect(getSelect()).toHaveValue('Blue');
      expect(utilsIsDisabled()).toBe(isDisabled);
    });

    test('when controlled', () => {
      const onChangeSpy = jest.fn();
      const { getSelect, isDisabled: utilsIsDisabled } = renderSelect({
        disabled: isDisabled,
        value: Color.Blue,
        onChange: onChangeSpy,
      });

      expect(getSelect()).toBeVisible();
      expect(getSelect()).toHaveValue('Blue');
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
      const { clickTrigger, queryByText } = renderSelect({
        allowDeselect: false,
        defaultValue: Color.Red,
      });

      await waitFor(() => {
        clickTrigger();
      });
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

          const {
            elements: { getSelect },
          } = getLGSelectTestUtils();

          userEvent.click(getSelect());
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

        const {
          elements: { getSelect },
        } = getLGSelectTestUtils();

        act(() => {
          userEvent.click(getSelect());
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

      const {
        elements: { getPopover },
        utils: { clickTrigger },
      } = getLGSelectTestUtils();

      clickTrigger();

      await waitFor(() => {
        expect(getPopover()).toBeVisible();
      });

      getAllByLabelText('Beaker Icon').forEach(element =>
        expect(element).toBeVisible(),
      );
    });

    test('invalid glyph', () => {
      Context.within(Jest.spyContext(console, 'error'), spy => {
        spy.mockImplementation();

        render(
          <Select {...defaultProps}>
            <Option glyph={<div />}>Bad icon</Option>
          </Select>,
        );

        const {
          elements: { getSelect },
        } = getLGSelectTestUtils();

        act(() => {
          userEvent.click(getSelect());
        });

        expect(spy).toHaveBeenCalledWith(
          '`Option` instance did not render icon because it is not a known glyph element.',
        );
      });
    });

    describe('opening', () => {
      test('by clicking', async () => {
        const { clickTrigger, getPopover, getSelect } = renderSelect();

        clickTrigger();

        await waitFor(() => {
          expect(getPopover()).toBeVisible();
        });

        expect(getSelect()).toHaveFocus();
      });

      test('by arrow down key', async () => {
        const { getOptionByValue, getPopover, getSelect } = renderSelect();

        // focus on button element
        userEvent.tab();
        userEvent.type(getSelect(), '{arrowdown}');

        await waitFor(() => {
          expect(getPopover()).toBeVisible();
        });

        const firstOption = getOptionByValue('Select');
        // First option is focused
        expect(firstOption).toHaveFocus();
      });

      test('by arrow up key', async () => {
        const { getOptionByValue, getPopover, getSelect } = renderSelect();

        // focus on button element
        userEvent.tab();
        userEvent.type(getSelect(), '{arrowup}');

        await waitFor(() => {
          expect(getPopover()).toBeVisible();
        });

        const lastOption = getOptionByValue('Yellow');
        // Last enabled option is focused
        expect(lastOption).toHaveFocus();
      });

      describe('is not allowed when disabled', () => {
        test('by clicking', () => {
          const { getPopover, getSelect } = renderSelect({
            disabled: true,
          });

          expect(() => userEvent.click(getSelect())).toThrow();
          expect(getPopover()).not.toBeInTheDocument();
        });

        test('by arrow down key', () => {
          const { getPopover, getSelect } = renderSelect({
            disabled: true,
          });

          userEvent.type(getSelect(), '{arrowdown}');
          expect(getPopover()).not.toBeInTheDocument();
        });

        test('by arrow up key', () => {
          const { getPopover, getSelect } = renderSelect({
            disabled: true,
          });

          userEvent.type(getSelect(), '{arrowup}');
          expect(getPopover()).not.toBeInTheDocument();
        });
      });
    });

    describe('fires Popover callbacks', () => {
      test('opening the select fires the `onEnter*` callbacks', async () => {
        const onEnter = jest.fn();
        const onEntering = jest.fn();
        const onEntered = jest.fn();

        const { clickTrigger } = renderSelect({
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered,
        });

        await waitFor(() => clickTrigger());
        expect(onEnter).toHaveBeenCalled();
        expect(onEntering).toHaveBeenCalled();
        await waitFor(() => expect(onEntered).toHaveBeenCalled());
      });

      test('closing the select fires the `onExit*` callbacks', async () => {
        const onExit = jest.fn();
        const onExiting = jest.fn();
        const onExited = jest.fn();

        const { clickTrigger } = renderSelect({
          onExit: onExit,
          onExiting: onExiting,
          onExited: onExited,
        });

        await waitFor(() => clickTrigger());
        await waitFor(() => clickTrigger());

        expect(onExit).toHaveBeenCalled();
        expect(onExiting).toHaveBeenCalled();
        await waitFor(() => expect(onExited).toHaveBeenCalled());
      });
    });

    describe('closing', () => {
      describe('selecting an option closes menu', () => {
        test('on mouse click', async () => {
          const { clickTrigger, getPopover, clickOption } = renderSelect();

          clickTrigger();
          await waitFor(() => {
            expect(getPopover()).toBeVisible();
          });

          clickOption('Red');
          await waitForElementToBeRemoved(getPopover());
          expect(getPopover()).not.toBeInTheDocument();
        });

        test('on enter', async () => {
          const { getSelect, getPopover } = renderSelect();

          userEvent.type(getSelect(), '{arrowdown}');
          await waitFor(() => {
            expect(getPopover()).toBeVisible();
          });
          // first option is focused by default
          userEvent.keyboard('{enter}');
          await waitForElementToBeRemoved(getPopover());
          expect(getPopover()).not.toBeInTheDocument();
        });

        test('on space', async () => {
          const { getSelect, getPopover } = renderSelect();

          userEvent.type(getSelect(), '{arrowdown}');
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

    describe.only.each([
      ['menu button', 'button'],
      ['list menu', 'listbox'],
    ] as const)('closing when %p is focused', (_, focusedElementRole) => {
      let getByRole: RenderResult['getByRole'];
      let getByText: RenderResult['getByText'];
      let clickTrigger: () => void;
      let getPopover: () => HTMLDivElement | null;
      let getSelect: () => HTMLButtonElement;

      beforeEach(async () => {
        ({ clickTrigger, getPopover, getByRole, getByText, getSelect } =
          renderSelect());

        clickTrigger();

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
        const button = getSelect();
        userEvent.click(button);

        expect(button).toHaveFocus();
        await waitForElementToBeRemoved(getPopover());
      });

      test('by escape key', async () => {
        userEvent.type(getByRole(focusedElementRole), '{esc}');

        const button = getSelect();
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
      // FIXME: fix when types are updateed
      let elements: any;
      let utils: any;

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

        const { elements: lGElements, utils: LGUtils } = getLGSelectTestUtils();

        button = lGElements.getSelect();
        elements = lGElements;
        utils = LGUtils;
      });

      describe.each([
        ['option', 'Red', Color.Red],
        ['option in group', 'Green', Color.Green],
      ])('%p', (_, optionText, optionValue) => {
        test('by Enter key', async () => {
          userEvent.click(button);

          const listbox = await waitFor(() => {
            const listbox = elements.getPopover();
            return listbox;
          });

          const targetOption = elements.getOptionByValue(optionText);
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
            const listbox = elements.getPopover();
            return listbox;
          });

          const targetOption = elements.getOptionByValue(optionText);
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
            const listbox = elements.getPopover();
            return listbox;
          });

          utils.clickOption(optionText);

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
            const listbox = elements.getPopover();
            return listbox;
          });

          const targetOption = elements.getOptionByValue(optionText);
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
            const listbox = elements.getPopover();
            return listbox;
          });

          utils.clickOption(optionText);

          expect(onChangeSpy).not.toHaveBeenCalled();
          expect(listbox).toBeInTheDocument();

          expect(getByTextFor(button, 'Select')).toBeVisible();
          expect(button).toHaveValue('');
        });
      });
    });

    describe('focus', () => {
      test('moves to next option by arrow down key', async () => {
        const { clickTrigger, getPopover, getOptionByValue, getOptions } =
          renderSelect();

        clickTrigger();

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
        const { clickTrigger, getPopover, getOptionByValue } = renderSelect();

        clickTrigger();

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
    // FIXME:
    let utils: any;

    beforeEach(async () => {
      ({ rerender } = render(
        <Select label="Choice" name="choice">
          {selected}
          {nonselected}
        </Select>,
      ));

      const { elements: lGElements, utils: LGUtils } = getLGSelectTestUtils();

      button = lGElements.getSelect();
      utils = LGUtils;

      userEvent.click(button);
      utils.clickOption('Selected Option');
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
      const { clickTrigger, getPopover } = renderSelect({ usePortal: false });

      clickTrigger();

      await waitFor(() => expect(getPopover()).toBeInTheDocument());
    });

    test('menu renders as a child of button', async () => {
      const { clickTrigger, getPopover, getSelect } = renderSelect({
        usePortal: false,
      });

      clickTrigger();

      await waitFor(() => {
        const popover = getPopover();
        expect(popover).toBeInTheDocument();
        expect(getSelect()).toContainElement(popover);
      });
    });

    describe('fires onChange when selecting an option', () => {
      test('on mouse click', async () => {
        const onChange = jest.fn();

        const { clickTrigger, clickOption } = renderSelect({
          usePortal: false,
          onChange: onChange,
        });

        clickTrigger();

        await waitFor(() => clickOption('Red'));

        expect(onChange).toHaveBeenCalled();
      });

      test('on enter', async () => {
        const onChange = jest.fn();
        const { getSelect } = renderSelect({
          usePortal: false,
          onChange: onChange,
        });

        const button = getSelect();
        userEvent.type(button, '{arrowdown}');
        // first option is focused by default
        userEvent.keyboard('{enter}');
        expect(onChange).toHaveBeenCalled();
      });

      test('on space', async () => {
        const onChange = jest.fn();
        const { getSelect } = renderSelect({
          usePortal: false,
          onChange: onChange,
        });

        const button = getSelect();
        userEvent.type(button, '{arrowdown}');
        // first option is focused by default
        userEvent.keyboard('{space}');
        expect(onChange).toHaveBeenCalled();
      });
    });

    describe('closing', () => {
      describe('selecting an option closes menu', () => {
        test('on mouse click', async () => {
          const { clickTrigger, getPopover, clickOption } = renderSelect({
            usePortal: false,
          });
          clickTrigger();
          await waitFor(() => {
            expect(getPopover()).toBeInTheDocument();
          });
          clickOption('Red');
          await waitForElementToBeRemoved(getPopover());
          expect(getPopover()).not.toBeInTheDocument();
        });

        test('on enter', async () => {
          const { getSelect, getPopover } = renderSelect({
            usePortal: false,
          });

          const button = getSelect();
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
          const { getSelect, getPopover } = renderSelect({
            usePortal: false,
          });

          const button = getSelect();
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

        const { clickTrigger } = renderSelect({
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered,
          usePortal: false,
        });

        await waitFor(() => clickTrigger());
        expect(onEnter).toHaveBeenCalled();
        expect(onEntering).toHaveBeenCalled();
        await waitFor(() => expect(onEntered).toHaveBeenCalled());
      });

      test('closing the select fires the `onExit*` callbacks', async () => {
        const onExit = jest.fn();
        const onExiting = jest.fn();
        const onExited = jest.fn();

        const { clickTrigger } = renderSelect({
          onExit: onExit,
          onExiting: onExiting,
          onExited: onExited,
          usePortal: false,
        });

        await waitFor(() => clickTrigger());
        await waitFor(() => clickTrigger());

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

      const {
        utils: { clickTrigger },
      } = getLGSelectTestUtils();

      clickTrigger();
      await waitFor(() =>
        expect(mockSetIsPopoverOpen).toHaveBeenCalledWith(true),
      );
      clickTrigger();
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

      const {
        utils: { clickTrigger },
      } = getLGSelectTestUtils();

      clickTrigger();
      await waitFor(() =>
        expect(mockSetIsPopoverOpen).toHaveBeenCalledWith(true),
      );
      clickTrigger();
      await waitFor(() =>
        expect(mockSetIsPopoverOpen).toHaveBeenCalledWith(false),
      );
    });
  });
});
