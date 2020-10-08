import React, { useState } from 'react';
import {
  fireEvent,
  getByText as getByTextFor,
  render,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { enforceExhaustive } from '@leafygreen-ui/lib';
import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';
import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';
import Select, { Option, OptionGroup } from '.';
import { act } from 'react-dom/test-utils';

const Color = {
  Red: 'Explicit value: Red',
  Blue: 'Blue',
  Green: 'Green',
  Yellow: 'Yellow',
  Orange: 'Orange',
  Indigo: 'Indigo',
  Violet: 'Violet',
} as const;

const enabledOptions = ['None', 'Red', 'Blue', 'Green', 'Yellow'] as const;

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
    <OptionGroup key="enabled group" label="Enabled">
      <Option>Green</Option>
      <Option>Yellow</Option>
    </OptionGroup>,
    <OptionGroup key="disabled group" label="Disabled" disabled>
      <Option>Indigo</Option>
      <>
        <Option>Violet</Option>
      </>
    </OptionGroup>,
  ],
} as const;

function getInput(container: HTMLElement): HTMLInputElement {
  const inputs = container.getElementsByTagName('input');
  expect(inputs).toHaveLength(1);
  return inputs[0];
}

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

let offsetParentSpy: jest.SpyInstance;
beforeAll(() => {
  offsetParentSpy = jest.spyOn(HTMLElement.prototype, 'offsetParent', 'get');

  // JSDOM doesn't implement `HTMLElement.prototype.offsetParent`, so this
  // falls back to the parent element since it doesn't matter for these tests.
  offsetParentSpy.mockImplementation(function (this: HTMLElement) {
    return this.parentElement;
  });
});

afterAll(() => {
  if (offsetParentSpy.mock.calls.length === 0) {
    throw Error('`HTMLElement.prototype.offsetParent` was never called');
  }
  offsetParentSpy.mockRestore();
});

describe('packages/select', () => {
  test('renders label and description', () => {
    const { getByText } = render(<Select {...defaultProps} />);
    expect(getByText(defaultProps.label)).toBeVisible();
    expect(getByText(defaultProps.description)).toBeVisible();
  });

  test('renders placeholder', () => {
    const { getByRole, rerender } = render(<Select {...defaultProps} />);

    let combobox = getByRole('combobox');
    expect(combobox).toBeVisible();
    expect(getByTextFor(combobox, 'Select')).toBeVisible();

    rerender(<Select {...defaultProps} placeholder="Explicit placeholder" />);

    combobox = getByRole('combobox');
    expect(getByTextFor(combobox, 'Explicit placeholder')).toBeVisible();
  });

  test('renders hidden input', () => {
    const { container, rerender } = render(<Select {...defaultProps} />);

    let hiddenInput = getInput(container);
    expect(hiddenInput).not.toBeVisible();

    expect(hiddenInput.name).toEqual(defaultProps.name);
    expect(hiddenInput.value).toEqual('');
    expect(hiddenInput.disabled).toEqual(false);

    rerender(<Select {...defaultProps} name="explicit_name" />);

    hiddenInput = getInput(container);
    expect(hiddenInput.name).toEqual('explicit_name');

    hiddenInput = getInput(container);
    rerender(<Select {...defaultProps} disabled />);
    expect(hiddenInput.disabled).toEqual(true);
  });

  test('must render options in <Select>', () => {
    Context.within(Jest.spyContext(console, 'error'), spy => {
      spy.mockImplementation();

      expect(() => {
        render(<Option>bad</Option>);
      }).toThrowError('`Option` must be a child of a `Select` instance');

      expect(() => {
        render(
          <OptionGroup label="bad">
            <Option>bad</Option>
          </OptionGroup>,
        );
      }).toThrowError('`OptionGroup` must be a child of a `Select` instance');
    });
  });

  describe('tab order', () => {
    test('contains component when enabled', () => {
      const { getByRole } = render(<Select {...defaultProps} />);

      expect(document.body).toHaveFocus();

      userEvent.tab();
      const combobox = getByRole('combobox');
      expect(combobox).toHaveFocus();

      userEvent.tab();
      expect(document.body).toHaveFocus();
    });

    test('does not contain component when disabled', () => {
      render(<Select {...defaultProps} disabled />);

      expect(document.body).toHaveFocus();

      userEvent.tab();
      expect(document.body).toHaveFocus();
    });
  });

  describe.each([
    ['enabled', true],
    ['disabled', false],
  ])('has initially selected option when %p', (_, enabled) => {
    test('when uncontrolled', () => {
      const { container, getByRole } = render(
        <Select
          {...defaultProps}
          disabled={!enabled}
          defaultValue={Color.Blue}
        />,
      );

      expect(
        getByTextFor(getByRole('combobox'), 'Blue', { selector: ':not(li)' }),
      ).toBeVisible();

      const input = getInput(container);
      expect(input.value).toEqual('Blue');
    });

    test('when controlled', () => {
      const onChangeSpy = jest.fn();
      const { container, getByRole } = render(
        <Select
          {...defaultProps}
          value={Color.Blue}
          onChange={onChangeSpy}
          disabled={!enabled}
        />,
      );

      expect(
        getByTextFor(getByRole('combobox'), 'Blue', { selector: ':not(li)' }),
      ).toBeVisible();

      const input = getInput(container);
      expect(input.value).toEqual('Blue');

      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });

  test('warns when controlled component has no `onChange` handler', () => {
    Context.within(Jest.spyContext(console, 'warn'), spy => {
      spy.mockImplementation();

      // @ts-expect-error
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
    describe.each([
      ['dark', true],
      ['light', false],
    ])('renders in %p mode', (_, darkMode) => {
      test('all valid options', () => {
        const { getByRole, queryByText } = Context.within(
          Jest.spyContext(console, 'error'),
          spy => {
            spy.mockImplementation();

            const result = render(
              <Select {...defaultProps} darkMode={darkMode}>
                {defaultProps.children}
                <Option glyph={<BeakerIcon />}>White</Option>
                <div>Invalid element</div>
              </Select>,
            );

            userEvent.click(result.getByRole('combobox'));

            expect(spy).toHaveBeenCalledWith(
              '`Select` instance received child that is not `Option` or `OptionGroup`.',
            );

            return result;
          },
        );

        const listbox = getByRole('listbox');

        Object.keys(Color).forEach(color => {
          expect(getByTextFor(listbox, color)).toBeVisible();
        });

        expect(queryByText('Invalid element')).not.toBeInTheDocument();
      });

      test('omitting empty elements', () => {
        Context.within(Jest.spyContext(console, 'error'), spy => {
          spy.mockImplementation();

          const { getByRole } = render(
            <Select {...defaultProps} darkMode={darkMode}>
              {defaultProps.children}
              <></>
              {}
              {''}
              {false}
              {null}
              {undefined}
            </Select>,
          );

          userEvent.click(getByRole('combobox'));

          expect(spy).not.toHaveBeenCalled();
        });
      });

      test('glyph', () => {
        const { getByRole, getAllByTitle } = render(
          <Select {...defaultProps} darkMode={darkMode} defaultValue="selected">
            <Option glyph={<BeakerIcon />} value="nonselected">
              Non-selected with glyph
            </Option>
            <Option glyph={<BeakerIcon />} value="selected">
              Selected with glyph
            </Option>
          </Select>,
        );

        userEvent.click(getByRole('combobox'));

        getAllByTitle('Beaker Icon').forEach(element =>
          expect(element.closest('svg')).toBeVisible(),
        );
      });

      test('invalid glyph', () => {
        Context.within(Jest.spyContext(console, 'error'), spy => {
          spy.mockImplementation();

          const { getByRole } = render(
            <Select {...defaultProps} darkMode={darkMode}>
              <Option glyph={<div />}>Bad icon</Option>
            </Select>,
          );

          userEvent.click(getByRole('combobox'));

          expect(spy).toHaveBeenCalledWith(
            '`Option` instance did not render icon because it is not a known glyph element.',
          );
        });
      });
    });

    describe('opening', () => {
      test('by clicking', () => {
        const { getByRole, queryByRole } = render(<Select {...defaultProps} />);

        const combobox = getByRole('combobox');

        expect(queryByRole('listbox')).not.toBeInTheDocument();

        userEvent.click(combobox);

        expect(getByRole('listbox')).toBeVisible();
        expect(combobox).toHaveFocus();
      });

      test('by arrow down key', () => {
        const { getByRole, queryByRole, getByText, queryByText } = render(
          <Select {...defaultProps} />,
        );

        expect(queryByRole('listbox')).not.toBeInTheDocument();
        expect(queryByText('None')).not.toBeInTheDocument();

        fireEvent.keyDown(getByRole('combobox'), {
          key: 'ArrowDown',
          keyCode: 40,
        });

        expect(getByRole('listbox')).toBeVisible();

        // First option is focused
        expect(getByText('None').closest('li')).toHaveFocus();
      });

      test('by arrow up key', () => {
        const { getByRole, queryByRole, getByText, queryByText } = render(
          <Select {...defaultProps} />,
        );

        expect(queryByRole('listbox')).not.toBeInTheDocument();
        expect(queryByText('Yellow')).not.toBeInTheDocument();

        fireEvent.keyDown(getByRole('combobox'), {
          key: 'ArrowUp',
          keyCode: 38,
        });

        expect(getByRole('listbox')).toBeVisible();

        // Last enabled option is focused
        expect(getByText('Yellow').closest('li')).toHaveFocus();
      });

      describe('is not allowed when disabled', () => {
        test('by clicking', () => {
          const { getByRole, queryByRole } = render(
            <Select {...defaultProps} disabled />,
          );

          const combobox = getByRole('combobox');
          userEvent.click(combobox);

          expect(combobox).not.toHaveFocus();

          expect(queryByRole('listbox')).not.toBeInTheDocument();
        });

        test('by arrow down key', () => {
          const { getByRole, queryByRole } = render(
            <Select {...defaultProps} disabled />,
          );

          const combobox = getByRole('combobox');
          fireEvent.keyDown(combobox, { key: 'ArrowDown', keyCode: 40 });

          expect(queryByRole('listbox')).not.toBeInTheDocument();
        });

        test('by arrow up key', () => {
          const { getByRole, queryByRole } = render(
            <Select {...defaultProps} disabled />,
          );

          const combobox = getByRole('combobox');
          fireEvent.keyDown(combobox, { key: 'ArrowUp', keyCode: 38 });

          expect(queryByRole('listbox')).not.toBeInTheDocument();
        });
      });
    });

    describe.each([
      ['menu button', 'combobox'],
      ['list menu', 'listbox'],
    ] as const)('closing when %p is focused', (_, focusedElementRole) => {
      let getByRole: RenderResult['getByRole'];
      let queryByRole: RenderResult['queryByRole'];

      beforeEach(() => {
        ({ getByRole, queryByRole } = render(<Select {...defaultProps} />));

        userEvent.click(getByRole('combobox'));

        const focusedElement = getByRole(focusedElementRole);
        focusedElement.focus();
      });

      test('by clicking outside', () => {
        userEvent.click(document.body);

        expect(document.body).toHaveFocus();

        expect(queryByRole('listbox')).not.toBeInTheDocument();
      });

      test('by clicking menu button', () => {
        const combobox = getByRole('combobox');
        userEvent.click(combobox);

        expect(combobox).toHaveFocus();

        expect(queryByRole('listbox')).not.toBeInTheDocument();
      });

      test('by escape key', () => {
        fireEvent.keyDown(getByRole(focusedElementRole), {
          key: 'Escape',
          keyCode: 27,
        });

        const combobox = getByRole('combobox');
        expect(combobox).toHaveFocus();

        expect(queryByRole('listbox')).not.toBeInTheDocument();
      });

      switch (focusedElementRole) {
        case 'combobox':
          test('by tab key', () => {
            userEvent.tab();

            expect(document.body).toHaveFocus();

            expect(queryByRole('listbox')).not.toBeInTheDocument();
          });
          break;
        case 'listbox':
          test('does not occur by tab key', () => {
            userEvent.tab();

            const listbox = getByRole('listbox');
            expect(listbox).toHaveFocus();

            expect(listbox).toBeInTheDocument();
          });
          break;
        default:
          enforceExhaustive(focusedElementRole);
      }
    });

    test('Escape key clears selected option', () => {
      const { getByRole } = render(
        <Select {...defaultProps} defaultValue={Color.Blue} />,
      );

      const combobox = getByRole('combobox');
      expect(
        getByTextFor(combobox, 'Blue', { selector: ':not(li)' }),
      ).toBeVisible();

      userEvent.tab();

      fireEvent.keyDown(combobox, { key: 'Escape', keyCode: 27 });

      expect(getByTextFor(combobox, 'Select')).toBeVisible();
    });

    describe.each([
      ['uncontrolled', false],
      ['controlled', true],
    ])('when %p selecting', (_, controlled) => {
      let getByRole: RenderResult['getByRole'];
      let getByText: RenderResult['getByText'];
      let queryByRole: RenderResult['queryByRole'];
      let combobox: HTMLElement;
      let container: HTMLElement;
      let onChangeSpy: jest.MockedFunction<(value: string) => void>;

      beforeEach(() => {
        onChangeSpy = jest.fn();

        ({ container, getByRole, getByText, queryByRole } = render(
          controlled ? (
            <Controller initialValue="">
              {(value, setValue) => (
                <Select
                  {...defaultProps}
                  value={value}
                  onChange={value => {
                    setValue(value);
                    onChangeSpy(value);
                  }}
                />
              )}
            </Controller>
          ) : (
            <Select {...defaultProps} onChange={onChangeSpy} />
          ),
        ));

        combobox = getByRole('combobox');
      });

      describe.each([
        ['option', 'Red', Color.Red],
        ['option in group', 'Green', Color.Green],
      ])('%p', (_, optionText, optionValue) => {
        test.each([
          ['tab', 'Tab', 9],
          ['enter', 'Enter', 13],
        ])('by %p key', (_, key, keyCode) => {
          userEvent.click(combobox);

          const targetOption = getByText(optionText).closest('li');
          expect(targetOption).not.toBe(null);

          act(() => targetOption!.focus());

          fireEvent.keyDown(targetOption!, { key, keyCode });

          expect(onChangeSpy).toHaveBeenCalledTimes(1);
          expect(onChangeSpy).toHaveBeenCalledWith(optionValue);

          expect(queryByRole('listbox')).not.toBeInTheDocument();

          expect(
            getByTextFor(combobox, optionText, { selector: ':not(li)' }),
          ).toBeVisible();
          expect(combobox).toHaveFocus();

          expect(getInput(container)).toHaveValue(optionValue);
        });

        test('by clicking', () => {
          userEvent.click(combobox);
          userEvent.click(getByText(optionText));

          expect(onChangeSpy).toHaveBeenCalledTimes(1);
          expect(onChangeSpy).toHaveBeenCalledWith(optionValue);

          expect(queryByRole('listbox')).not.toBeInTheDocument();

          expect(
            getByTextFor(combobox, optionText, { selector: ':not(li)' }),
          ).toBeVisible();
          expect(combobox).toHaveFocus();

          expect(getInput(container)).toHaveValue(optionValue);
        });
      });

      describe.each([
        ['disabled option', 'Orange'],
        ['option in disabled group', 'Indigo'],
      ])('does not occur for %p', (_, optionText) => {
        test.each([
          ['tab', 'Tab', 9],
          ['enter', 'Enter', 13],
        ])('by %p key', (_, key, keyCode) => {
          userEvent.click(combobox);

          const targetOption = getByText(optionText).closest('li');
          expect(targetOption).not.toBe(null);

          act(() => targetOption!.focus());
          fireEvent.keyDown(targetOption!, { key, keyCode });

          expect(onChangeSpy).not.toHaveBeenCalled();

          expect(getByRole('listbox')).toBeVisible();

          expect(getByTextFor(combobox, 'Select')).toBeVisible();
          expect(targetOption).toHaveFocus();

          expect(getInput(container)).toHaveValue('');
        });

        // eslint-disable-next-line jest/no-identical-title
        test('by clicking', () => {
          userEvent.click(combobox);
          userEvent.click(getByText(optionText));

          expect(onChangeSpy).not.toHaveBeenCalled();

          expect(getByRole('listbox')).toBeVisible();

          expect(getByTextFor(combobox, 'Select')).toBeVisible();
          expect(getInput(container)).toHaveValue('');
        });
      });
    });

    describe('focus', () => {
      test('moves to next option by arrow down key', () => {
        const { getByRole, getByText } = render(<Select {...defaultProps} />);

        userEvent.click(getByRole('combobox'));

        const listbox = getByRole('listbox');

        enabledOptions.forEach(expectedOptionText => {
          fireEvent.keyDown(listbox, { key: 'ArrowDown', keyCode: 40 });

          expect(getByText(expectedOptionText).closest('li')).toHaveFocus();
        });

        // Doesn't move when the end is reached
        fireEvent.keyDown(listbox, { key: 'ArrowDown', keyCode: 40 });

        expect(getByText('Yellow').closest('li')).toHaveFocus();
      });

      test('moves to previous option by arrow down key', () => {
        const { getByRole, getByText } = render(<Select {...defaultProps} />);

        userEvent.click(getByRole('combobox'));

        const listbox = getByRole('listbox');

        [...enabledOptions].reverse().forEach(expectedOptionText => {
          fireEvent.keyDown(listbox, { key: 'ArrowUp', keyCode: 38 });

          expect(getByText(expectedOptionText).closest('li')).toHaveFocus();
        });

        // Doesn't move when the top is reached
        fireEvent.keyDown(listbox, { key: 'ArrowUp', keyCode: 38 });

        expect(getByText('None').closest('li')).toHaveFocus();
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

    let getByRole: RenderResult['getByRole'];
    let getByText: RenderResult['getByText'];
    let rerender: RenderResult['rerender'];
    let combobox: HTMLElement;

    beforeEach(() => {
      ({ getByRole, getByText, rerender } = render(
        <Select label="Choice" name="choice">
          {selected}
          {nonselected}
        </Select>,
      ));

      combobox = getByRole('combobox');
      userEvent.click(combobox);

      userEvent.click(getByText('Selected Option'));
    });

    test('when selected option is removed', () => {
      rerender(
        <Select label="Choice" name="choice">
          {nonselected}
        </Select>,
      );

      expect(getByTextFor(combobox, 'Select')).toBeVisible();
    });

    test('when options are re-ordered', () => {
      rerender(
        <Select label="Choice" name="choice">
          {nonselected}
          {selected}
        </Select>,
      );

      expect(getByTextFor(combobox, 'Selected Option')).toBeVisible();
    });

    describe('when selected option is replaced', () => {
      test('with different object identity', () => {
        rerender(
          <Select label="Choice" name="choice">
            {nonselected}
            <Option value="selected">Selected Option</Option>
          </Select>,
        );

        expect(getByTextFor(combobox, 'Selected Option')).toBeVisible();
      });

      test('with same explicit value and different text', () => {
        rerender(
          <Select label="Choice" name="choice">
            {nonselected}
            <Option>selected</Option>
            <Option value="selected">Different text</Option>
          </Select>,
        );

        expect(getByTextFor(combobox, 'Different text')).toBeVisible();
      });

      test('with same computed value', () => {
        rerender(
          <Select label="Choice" name="choice">
            {nonselected}
            <Option>selected</Option>
          </Select>,
        );

        expect(getByTextFor(combobox, 'selected')).toBeVisible();
      });
    });
  });
});
