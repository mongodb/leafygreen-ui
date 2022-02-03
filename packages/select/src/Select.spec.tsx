import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import {
  fireEvent,
  getByText as getByTextFor,
  render,
  RenderResult,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';
import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';
import { Option, OptionGroup, Select, State } from '.';
import { keyMap } from '@leafygreen-ui/lib';

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
    // throw Error('`HTMLElement.prototype.offsetParent` was never called');
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
    const { getByRole, rerender } = render(<Select {...defaultProps} />);

    let combobox = getByRole('button');
    expect(combobox).toBeVisible();
    expect(getByTextFor(combobox, 'Select')).toBeVisible();

    rerender(<Select {...defaultProps} placeholder="Explicit placeholder" />);

    combobox = getByRole('button');
    expect(getByTextFor(combobox, 'Explicit placeholder')).toBeVisible();

    userEvent.click(combobox);

    const listbox = await waitFor(() => {
      const listbox = getByRole('listbox');
      expect(listbox).toBeVisible();
      return listbox;
    });

    expect(getByTextFor(listbox, 'Explicit placeholder')).toBeVisible();
  });

  test('combobox button has selected value', () => {
    const { getByRole, rerender } = render(<Select {...defaultProps} />);

    const combobox = getByRole('button') as HTMLButtonElement;
    expect(combobox).toBeInstanceOf(HTMLButtonElement);

    expect(combobox.name).toEqual(defaultProps.name);
    expect(combobox.disabled).toEqual(false);
    expect(combobox).toHaveValue('');

    rerender(<Select {...defaultProps} name="explicit_name" />);
    expect(combobox.name).toEqual('explicit_name');

    rerender(<Select {...defaultProps} disabled />);
    expect(combobox.disabled).toEqual(true);
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
      const combobox = getByRole('button');
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
      const { getByRole } = render(
        <Select
          {...defaultProps}
          disabled={!enabled}
          defaultValue={Color.Blue}
        />,
      );

      const combobox = getByRole('button') as HTMLButtonElement;
      expect(getByTextFor(combobox, 'Blue')).toBeVisible();
      expect(combobox).toHaveValue('Blue');
    });

    test('when controlled', () => {
      const onChangeSpy = jest.fn();
      const { getByRole } = render(
        <Select
          {...defaultProps}
          value={Color.Blue}
          onChange={onChangeSpy}
          disabled={!enabled}
        />,
      );

      const combobox = getByRole('button') as HTMLButtonElement;
      expect(getByTextFor(combobox, 'Blue')).toBeVisible();
      expect(combobox).toHaveValue('Blue');

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
    test('allowDeselect prevents placeholder from being rendered', () => {
      const { getByRole, queryByText } = render(
        <Select
          {...defaultProps}
          defaultValue={Color.Red}
          allowDeselect={false}
        >
          {defaultProps.children}
        </Select>,
      );

      userEvent.click(getByRole('button'));
      expect(queryByText('Select')).not.toBeInTheDocument();
    });

    describe.each([
      ['dark', true],
      ['light', false],
    ])('renders in %p mode', (_, darkMode) => {
      test('all valid options', async () => {
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

            userEvent.click(result.getByRole('button'));

            expect(spy).toHaveBeenCalledWith(
              '`Select` instance received child that is not `Option` or `OptionGroup`.',
            );

            return result;
          },
        );

        const listbox = await waitFor(() => {
          const listbox = getByRole('listbox');
          expect(listbox).toBeVisible();
          return listbox;
        });

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

          userEvent.click(getByRole('button'));

          expect(spy).not.toHaveBeenCalled();
        });
      });

      test('glyph', async () => {
        const { getByRole, getAllByLabelText } = render(
          <Select {...defaultProps} darkMode={darkMode} defaultValue="selected">
            <Option glyph={<BeakerIcon />} value="nonselected">
              Non-selected with glyph
            </Option>
            <Option glyph={<BeakerIcon />} value="selected">
              Selected with glyph
            </Option>
          </Select>,
        );

        userEvent.click(getByRole('button'));

        await waitFor(() => {
          expect(getByRole('listbox')).toBeVisible();
        });

        getAllByLabelText('Beaker Icon').forEach(element =>
          expect(element).toBeVisible(),
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

          userEvent.click(getByRole('button'));

          expect(spy).toHaveBeenCalledWith(
            '`Option` instance did not render icon because it is not a known glyph element.',
          );
        });
      });
    });

    describe('opening', () => {
      test('by clicking', async () => {
        const { getByRole, queryByRole } = render(<Select {...defaultProps} />);

        const combobox = getByRole('button');

        expect(queryByRole('listbox')).not.toBeInTheDocument();

        userEvent.click(combobox);

        await waitFor(() => {
          expect(getByRole('listbox')).toBeVisible();
        });

        expect(combobox).toHaveFocus();
      });

      test('by arrow down key', async () => {
        const { getByRole, queryByRole } = render(<Select {...defaultProps} />);

        // focus on button element
        userEvent.tab();

        expect(queryByRole('listbox')).not.toBeInTheDocument();

        userEvent.type(getByRole('button'), '{arrowdown}');

        const listbox = await waitFor(() => {
          const listbox = getByRole('listbox');
          expect(listbox).toBeVisible();
          return listbox;
        });

        // First option is focused
        expect(getByTextFor(listbox, 'Select').closest('li')).toHaveFocus();
      });

      test('by arrow up key', async () => {
        const { getByRole, queryByRole, queryByText } = render(
          <Select {...defaultProps} />,
        );

        // focus on button element
        userEvent.tab();

        expect(queryByRole('listbox')).not.toBeInTheDocument();
        expect(queryByText('Yellow')).not.toBeInTheDocument();

        userEvent.type(getByRole('button'), '{arrowup}');

        const listbox = await waitFor(() => {
          const listbox = getByRole('listbox');
          expect(listbox).toBeVisible();
          return listbox;
        });

        // Last enabled option is focused
        expect(getByTextFor(listbox, 'Yellow').closest('li')).toHaveFocus();
      });

      describe('is not allowed when disabled', () => {
        test('by clicking', () => {
          const { getByRole, queryByRole } = render(
            <Select {...defaultProps} disabled />,
          );

          const combobox = getByRole('button');
          userEvent.click(combobox);

          expect(combobox).not.toHaveFocus();

          expect(queryByRole('listbox')).not.toBeInTheDocument();
        });

        test('by arrow down key', () => {
          const { getByRole, queryByRole } = render(
            <Select {...defaultProps} disabled />,
          );

          const combobox = getByRole('button');
          userEvent.type(combobox, '{arrowdown}');

          expect(queryByRole('listbox')).not.toBeInTheDocument();
        });

        test('by arrow up key', () => {
          const { getByRole, queryByRole } = render(
            <Select {...defaultProps} disabled />,
          );

          const combobox = getByRole('button');
          userEvent.type(combobox, '{arrowup}');

          expect(queryByRole('listbox')).not.toBeInTheDocument();
        });
      });
    });

    describe.each([
      ['menu button', 'button'],
      ['list menu', 'listbox'],
    ] as const)('closing when %p is focused', (_, focusedElementRole) => {
      let getByRole: RenderResult['getByRole'];
      let getByText: RenderResult['getByText'];
      let getByTestId: RenderResult['getByTestId'];

      beforeEach(async () => {
        ({ getByRole, getByText, getByTestId } = render(
          <Select {...defaultProps} />,
        ));

        userEvent.click(getByRole('button'));

        await waitFor(() => {
          // eslint-disable-next-line jest/no-standalone-expect
          expect(getByRole('listbox')).toBeVisible();
        });

        const focusedElement = getByRole(focusedElementRole);
        act(() => focusedElement.focus());
      });

      test('by clicking outside', async () => {
        userEvent.click(document.body);

        expect(document.body).toHaveFocus();

        await waitForElementToBeRemoved(getByRole('listbox'));
      });

      test('by clicking menu button', async () => {
        const combobox = getByRole('button');
        userEvent.click(combobox);

        expect(combobox).toHaveFocus();

        await waitForElementToBeRemoved(getByRole('listbox'));
      });

      test('by escape key', async () => {
        userEvent.type(getByRole(focusedElementRole), '{esc}');

        const combobox = getByTestId('leafygreen-ui-select-menubutton');
        expect(combobox).toHaveFocus();

        await waitForElementToBeRemoved(getByRole('listbox'));
      });

      test('does not occur by clicking on option group label', async () => {
        userEvent.click(getByText('Enabled group'));

        const listbox = await waitFor(() => {
          const listbox = getByRole('listbox');
          expect(listbox).toBeVisible();
          return listbox;
        });

        expect(listbox).toHaveFocus();
      });
    });

    describe.each([
      ['uncontrolled', false],
      ['controlled', true],
    ])('when %p selecting', (_, controlled) => {
      let getByRole: RenderResult['getByRole'];

      let combobox: HTMLElement;
      let onChangeSpy: jest.MockedFunction<
        (
          value: string,
          event: React.MouseEvent | KeyboardEvent | React.KeyboardEvent,
        ) => void
      >;

      beforeEach(() => {
        onChangeSpy = jest.fn();

        ({ getByRole } = render(
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
        ));

        combobox = getByRole('button');
      });

      describe.each([
        ['option', 'Red', Color.Red],
        ['option in group', 'Green', Color.Green],
      ])('%p', (_, optionText, optionValue) => {
        test('by Enter key', async () => {
          userEvent.click(combobox);

          const listbox = await waitFor(() => {
            const listbox = getByRole('listbox');
            expect(listbox).toBeVisible();
            return listbox;
          });

          const targetOption = getByTextFor(listbox, optionText).closest('li');
          expect(targetOption).not.toBe(null);

          act(() => targetOption!.focus());

          fireEvent.keyDown(targetOption!, {
            key: 'Enter',
            keyCode: keyMap.Enter,
          });

          expect(onChangeSpy).toHaveBeenCalledTimes(1);
          expect(onChangeSpy).toHaveBeenCalledWith(
            optionValue,
            expect.anything(),
          );

          await waitForElementToBeRemoved(listbox);

          expect(getByTextFor(combobox, optionText)).toBeVisible();
          expect(combobox).toHaveFocus();
          expect(combobox).toHaveValue(optionValue);
        });

        test('by clicking', async () => {
          userEvent.click(combobox);

          const listbox = await waitFor(() => {
            const listbox = getByRole('listbox');
            expect(listbox).toBeVisible();
            return listbox;
          });

          userEvent.click(getByTextFor(listbox, optionText));

          expect(onChangeSpy).toHaveBeenCalledTimes(1);
          expect(onChangeSpy).toHaveBeenCalledWith(
            optionValue,
            expect.anything(),
          );

          await waitForElementToBeRemoved(listbox);

          expect(getByTextFor(combobox, optionText)).toBeVisible();
          expect(combobox).toHaveFocus();
          expect(combobox).toHaveValue(optionValue);
        });
      });

      describe.each([
        ['disabled option', 'Orange'],
        ['option in disabled group', 'Indigo'],
      ])('does not occur for %p', (_, optionText) => {
        // eslint-disable-next-line jest/no-identical-title
        test('by Enter key', async () => {
          userEvent.click(combobox);

          const listbox = await waitFor(() => {
            const listbox = getByRole('listbox');
            expect(listbox).toBeVisible();
            return listbox;
          });

          const targetOption = getByTextFor(listbox, optionText).closest('li');
          expect(targetOption).not.toBe(null);

          act(() => targetOption!.focus());
          fireEvent.keyDown(targetOption!, {
            key: 'Enter',
            keyCode: keyMap.Enter,
          });

          expect(onChangeSpy).not.toHaveBeenCalled();
          expect(listbox).toBeVisible();

          expect(getByTextFor(combobox, 'Select')).toBeVisible();
          expect(targetOption).toHaveFocus();

          expect(combobox).toHaveValue('');
        });

        // eslint-disable-next-line jest/no-identical-title
        test('by clicking', async () => {
          userEvent.click(combobox);

          const listbox = await waitFor(() => {
            const listbox = getByRole('listbox');
            expect(listbox).toBeVisible();
            return listbox;
          });

          userEvent.click(getByTextFor(listbox, optionText));

          expect(onChangeSpy).not.toHaveBeenCalled();
          expect(listbox).toBeVisible();

          expect(getByTextFor(combobox, 'Select')).toBeVisible();
          expect(combobox).toHaveValue('');
        });
      });
    });

    describe('focus', () => {
      test('moves to next option by arrow down key', async () => {
        const { getByRole } = render(<Select {...defaultProps} />);

        userEvent.click(getByRole('button'));

        const listbox = await waitFor(() => {
          const listbox = getByRole('listbox');
          expect(listbox).toBeVisible();
          return listbox;
        });

        enabledOptions.forEach(expectedOptionText => {
          userEvent.type(listbox, '{arrowdown}');

          expect(
            getByTextFor(listbox, expectedOptionText).closest('li'),
          ).toHaveFocus();
        });

        // Moves to first option when the end is reached
        userEvent.type(listbox, '{arrowdown}');

        expect(getByTextFor(listbox, 'Select').closest('li')).toHaveFocus();
      });

      test('moves to previous option by arrow down key', async () => {
        const { getByRole } = render(<Select {...defaultProps} />);

        userEvent.click(getByRole('button'));

        const listbox = await waitFor(() => {
          const listbox = getByRole('listbox');
          expect(listbox).toBeVisible();
          return listbox;
        });

        [...enabledOptions].reverse().forEach(expectedOptionText => {
          userEvent.type(listbox, '{arrowup}');

          expect(
            getByTextFor(listbox, expectedOptionText).closest('li'),
          ).toHaveFocus();
        });

        // Moves to last option when the top is reached
        userEvent.type(listbox, '{arrowup}');

        expect(getByTextFor(listbox, 'Yellow').closest('li')).toHaveFocus();
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
    let rerender: RenderResult['rerender'];
    let combobox: HTMLElement;

    beforeEach(async () => {
      ({ getByRole, rerender } = render(
        <Select label="Choice" name="choice">
          {selected}
          {nonselected}
        </Select>,
      ));

      combobox = getByRole('button');
      userEvent.click(combobox);

      const listbox = await waitFor(() => {
        const listbox = getByRole('listbox');
        // eslint-disable-next-line jest/no-standalone-expect
        expect(listbox).toBeVisible();
        return listbox;
      });

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

    describe('when the "state" is "error"', () => {
      test('error message is present', () => {
        const { container } = render(
          <Select
            {...defaultProps}
            state={State.Error}
            errorMessage={errorMessage}
          />,
        );
        expect(container.innerHTML).toContain(errorMessage);
      });

      test('error message is not present if "errorMessage" is empty', () => {
        const { container } = render(
          <Select {...defaultProps} state={State.Error} />,
        );
        expect(container.innerHTML).not.toContain(errorMessage);
      });
    });

    describe('when the "state" is "none"', () => {
      test('error message is not present', () => {
        const { container } = render(<Select {...defaultProps} />);
        expect(container.innerHTML).not.toContain(errorMessage);
      });
    });
  });
});
