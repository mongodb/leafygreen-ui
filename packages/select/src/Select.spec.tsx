import React, { useState } from 'react';
import {
  fireEvent,
  getByText as getByTextFor,
  render,
  RenderResult,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { enforceExhaustive, keyMap } from '@leafygreen-ui/lib';
import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';
import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';
import { Option, OptionGroup, Select } from '.';
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

  test('renders placeholder', async () => {
    const { getByRole, findByRole, rerender } = render(
      <Select {...defaultProps} />,
    );

    let combobox = getByRole('combobox');
    expect(combobox).toBeVisible();
    expect(getByTextFor(combobox, 'Select')).toBeVisible();

    rerender(<Select {...defaultProps} placeholder="Explicit placeholder" />);

    combobox = getByRole('combobox');
    expect(getByTextFor(combobox, 'Explicit placeholder')).toBeVisible();

    userEvent.click(combobox);

    const listbox = await findByRole('listbox');
    expect(getByTextFor(listbox, 'Explicit placeholder')).toBeVisible();
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

      expect(getByTextFor(getByRole('combobox'), 'Blue')).toBeVisible();

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

      expect(getByTextFor(getByRole('combobox'), 'Blue')).toBeVisible();

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
      test('all valid options', async () => {
        const { findByRole, queryByText } = Context.within(
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

        const listbox = await findByRole('listbox');

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

      test('glyph', async () => {
        const { findByRole, getByRole, getAllByTitle } = render(
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

        await findByRole('listbox');

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
      test('by clicking', async () => {
        const { findByRole, getByRole, queryByRole } = render(
          <Select {...defaultProps} />,
        );

        const combobox = getByRole('combobox');

        expect(queryByRole('listbox')).not.toBeInTheDocument();

        userEvent.click(combobox);

        expect(await findByRole('listbox')).toBeVisible();
        expect(combobox).toHaveFocus();
      });

      test('by arrow down key', async () => {
        const { findByRole, getByRole, queryByRole } = render(
          <Select {...defaultProps} />,
        );

        expect(queryByRole('listbox')).not.toBeInTheDocument();

        fireEvent.keyDown(getByRole('combobox'), { keyCode: keyMap.ArrowDown });

        const listbox = await findByRole('listbox');
        expect(listbox).toBeVisible();

        // First option is focused
        expect(getByTextFor(listbox, 'Select').closest('li')).toHaveFocus();
      });

      test('by arrow up key', async () => {
        const { findByRole, getByRole, queryByRole, queryByText } = render(
          <Select {...defaultProps} />,
        );

        expect(queryByRole('listbox')).not.toBeInTheDocument();
        expect(queryByText('Yellow')).not.toBeInTheDocument();

        fireEvent.keyDown(getByRole('combobox'), { keyCode: keyMap.ArrowUp });

        const listbox = await findByRole('listbox');
        expect(listbox).toBeVisible();

        // Last enabled option is focused
        expect(getByTextFor(listbox, 'Yellow').closest('li')).toHaveFocus();
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
          fireEvent.keyDown(combobox, { keyCode: keyMap.ArrowDown });

          expect(queryByRole('listbox')).not.toBeInTheDocument();
        });

        test('by arrow up key', () => {
          const { getByRole, queryByRole } = render(
            <Select {...defaultProps} disabled />,
          );

          const combobox = getByRole('combobox');
          fireEvent.keyDown(combobox, { keyCode: keyMap.ArrowUp });

          expect(queryByRole('listbox')).not.toBeInTheDocument();
        });
      });
    });

    describe.each([
      ['menu button', 'combobox'],
      ['list menu', 'listbox'],
    ] as const)('closing when %p is focused', (_, focusedElementRole) => {
      let findByRole: RenderResult['findByRole'];
      let getByRole: RenderResult['getByRole'];

      beforeEach(() => {
        ({ findByRole, getByRole } = render(<Select {...defaultProps} />));

        userEvent.click(getByRole('combobox'));

        const focusedElement = getByRole(focusedElementRole);
        focusedElement.focus();
      });

      test('by clicking outside', async () => {
        userEvent.click(document.body);

        expect(document.body).toHaveFocus();

        await waitForElementToBeRemoved(getByRole('listbox'));
      });

      test('by clicking menu button', async () => {
        const combobox = getByRole('combobox');
        userEvent.click(combobox);

        expect(combobox).toHaveFocus();

        await waitForElementToBeRemoved(getByRole('listbox'));
      });

      test('by escape key', async () => {
        fireEvent.keyDown(getByRole(focusedElementRole), {
          keyCode: keyMap.Escape,
        });

        const combobox = getByRole('combobox');
        expect(combobox).toHaveFocus();

        await waitForElementToBeRemoved(getByRole('listbox'));
      });

      switch (focusedElementRole) {
        case 'combobox':
          test('by tab key', async () => {
            userEvent.tab();

            expect(document.body).toHaveFocus();

            await waitForElementToBeRemoved(getByRole('listbox'));
          });
          break;
        case 'listbox':
          test('does not occur by tab key', async () => {
            userEvent.tab();

            const listbox = await findByRole('listbox');
            expect(listbox).toHaveFocus();

            expect(listbox).toBeVisible();
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
      expect(getByTextFor(combobox, 'Blue')).toBeVisible();

      userEvent.tab();

      fireEvent.keyDown(combobox, { keyCode: keyMap.Escape });

      expect(getByTextFor(combobox, 'Select')).toBeVisible();
    });

    describe.each([
      ['uncontrolled', false],
      ['controlled', true],
    ])('when %p selecting', (_, controlled) => {
      let findByRole: RenderResult['findByRole'];
      let getByRole: RenderResult['getByRole'];

      let combobox: HTMLElement;
      let container: HTMLElement;
      let onChangeSpy: jest.MockedFunction<(value: string) => void>;

      beforeEach(() => {
        onChangeSpy = jest.fn();

        ({ container, findByRole, getByRole } = render(
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
          ['tab', keyMap.Tab],
          ['enter', keyMap.Enter],
        ])('by %p key', async (_, keyCode) => {
          userEvent.click(combobox);

          const listbox = await findByRole('listbox');
          expect(listbox).toBeVisible();

          const targetOption = getByTextFor(listbox, optionText).closest('li');
          expect(targetOption).not.toBe(null);

          act(() => targetOption!.focus());

          fireEvent.keyDown(targetOption!, { keyCode });

          expect(onChangeSpy).toHaveBeenCalledTimes(1);
          expect(onChangeSpy).toHaveBeenCalledWith(optionValue);

          await waitForElementToBeRemoved(listbox);

          expect(getByTextFor(combobox, optionText)).toBeVisible();
          expect(combobox).toHaveFocus();

          expect(getInput(container)).toHaveValue(optionValue);
        });

        test('by clicking', async () => {
          userEvent.click(combobox);

          const listbox = await findByRole('listbox');
          expect(listbox).toBeVisible();

          userEvent.click(getByTextFor(listbox, optionText));

          expect(onChangeSpy).toHaveBeenCalledTimes(1);
          expect(onChangeSpy).toHaveBeenCalledWith(optionValue);

          await waitForElementToBeRemoved(listbox);

          expect(getByTextFor(combobox, optionText)).toBeVisible();
          expect(combobox).toHaveFocus();

          expect(getInput(container)).toHaveValue(optionValue);
        });
      });

      describe.each([
        ['disabled option', 'Orange'],
        ['option in disabled group', 'Indigo'],
      ])('does not occur for %p', (_, optionText) => {
        test.each([
          ['tab', keyMap.Tab],
          ['enter', keyMap.Enter],
        ])('by %p key', async (_, keyCode) => {
          userEvent.click(combobox);

          const listbox = await findByRole('listbox');
          expect(listbox).toBeVisible();

          const targetOption = getByTextFor(listbox, optionText).closest('li');
          expect(targetOption).not.toBe(null);

          act(() => targetOption!.focus());
          fireEvent.keyDown(targetOption!, { keyCode });

          expect(onChangeSpy).not.toHaveBeenCalled();
          expect(listbox).toBeVisible();

          expect(getByTextFor(combobox, 'Select')).toBeVisible();
          expect(targetOption).toHaveFocus();

          expect(getInput(container)).toHaveValue('');
        });

        // eslint-disable-next-line jest/no-identical-title
        test('by clicking', async () => {
          userEvent.click(combobox);

          const listbox = await findByRole('listbox');
          expect(listbox).toBeVisible();

          userEvent.click(getByTextFor(listbox, optionText));

          expect(onChangeSpy).not.toHaveBeenCalled();
          expect(listbox).toBeVisible();

          expect(getByTextFor(combobox, 'Select')).toBeVisible();
          expect(getInput(container)).toHaveValue('');
        });
      });
    });

    describe('focus', () => {
      test('moves to next option by arrow down key', async () => {
        const { findByRole, getByRole } = render(<Select {...defaultProps} />);

        userEvent.click(getByRole('combobox'));

        const listbox = await findByRole('listbox');
        expect(listbox).toBeVisible();

        enabledOptions.forEach(expectedOptionText => {
          fireEvent.keyDown(listbox, { keyCode: keyMap.ArrowDown });

          expect(
            getByTextFor(listbox, expectedOptionText).closest('li'),
          ).toHaveFocus();
        });

        // Doesn't move when the end is reached
        fireEvent.keyDown(listbox, { keyCode: keyMap.ArrowDown });

        expect(getByTextFor(listbox, 'Yellow').closest('li')).toHaveFocus();
      });

      test('moves to previous option by arrow down key', async () => {
        const { findByRole, getByRole } = render(<Select {...defaultProps} />);

        userEvent.click(getByRole('combobox'));

        const listbox = await findByRole('listbox');
        expect(listbox).toBeVisible();

        [...enabledOptions].reverse().forEach(expectedOptionText => {
          fireEvent.keyDown(listbox, { keyCode: keyMap.ArrowUp });

          expect(
            getByTextFor(listbox, expectedOptionText).closest('li'),
          ).toHaveFocus();
        });

        // Doesn't move when the top is reached
        fireEvent.keyDown(listbox, { keyCode: keyMap.ArrowUp });

        expect(getByTextFor(listbox, 'Select').closest('li')).toHaveFocus();
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

    let findByRole: RenderResult['findByRole'];
    let getByRole: RenderResult['getByRole'];
    let rerender: RenderResult['rerender'];
    let combobox: HTMLElement;

    beforeEach(async () => {
      ({ findByRole, getByRole, rerender } = render(
        <Select label="Choice" name="choice">
          {selected}
          {nonselected}
        </Select>,
      ));

      combobox = getByRole('combobox');
      userEvent.click(combobox);

      const listbox = await findByRole('listbox');
      userEvent.click(getByTextFor(listbox, 'Selected Option'));
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
            <Option>select{'ed'}</Option>
          </Select>,
        );

        expect(getByTextFor(combobox, 'selected')).toBeVisible();
      });
    });
  });
});
