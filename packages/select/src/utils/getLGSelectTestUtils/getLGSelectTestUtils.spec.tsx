import React, { useState } from 'react';
import {
  act,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Option, OptionGroup, Select, State } from '../../';

import { getLGSelectTestUtils } from './getLGSelectTestUtils';

const defaultProps = {
  label: 'Label',
  name: 'pet',
  description: 'Description',
} as const;

const children = [
  <Option key="red" value="RED">
    Red
  </Option>,
  <Option key="blue">Blue</Option>,
  <Option key="orange" disabled>
    Orange you glad
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
];

function renderSelect(props = {}) {
  const renderUtils = render(
    <Select {...defaultProps} {...props}>
      {children}
    </Select>,
  );

  return {
    ...renderUtils,
  };
}

function renderSelectControlled(props = {}) {
  const ControlledSelect = (props = {}) => {
    // @ts-expect-error
    // eslint-disable-next-line react/prop-types
    const { value: propValue, ...rest } = props;
    const [value, setValue] = useState(propValue);

    return (
      <Select {...defaultProps} {...rest} value={value} onChange={setValue}>
        {children}
      </Select>
    );
  };

  const renderUtils = render(<ControlledSelect {...props} />);

  return {
    ...renderUtils,
  };
}

function renderMultipleSelects() {
  const renderUtils = render(
    <>
      <Select {...defaultProps} defaultValue="RED" data-lgid="lg-select-1">
        {children}
      </Select>
      <Select {...defaultProps} defaultValue="Blue" data-lgid="lg-select-2">
        {children.slice(0, 2)}
      </Select>
    </>,
  );

  return {
    ...renderUtils,
  };
}

describe('packages/select/getLGSelectTestUtils', () => {
  test('throws error if select is not found', () => {
    try {
      renderSelect({ 'data-lgid': 'different-id' });
      const _utils = getLGSelectTestUtils();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        'message',
        expect.stringMatching(
          /Unable to find an element by: \[data-lgid="lg-select"\]/,
        ),
      );
    }
  });

  describe('single select', () => {
    describe('getLabel', () => {
      test('is in the document', () => {
        renderSelect();
        const { getLabel } = getLGSelectTestUtils();
        expect(getLabel()).toBeInTheDocument();
      });

      test('is not in the document', () => {
        renderSelect({ label: '' });
        const { getLabel } = getLGSelectTestUtils();
        expect(getLabel()).not.toBeInTheDocument();
        // expect(queryByTestId('lg-form_field-label')).not.toBeInTheDocument();
      });
    });

    describe('getDescription', () => {
      test('is in the document', () => {
        renderSelect();
        const { getDescription } = getLGSelectTestUtils();
        expect(getDescription()).toBeVisible();
      });

      test('is not in the document', () => {
        renderSelect({ description: '' });
        const { getDescription } = getLGSelectTestUtils();
        expect(getDescription()).not.toBeInTheDocument();
      });
    });

    describe('getInput', () => {
      test('is in the document', () => {
        renderSelect();
        const { getInput } = getLGSelectTestUtils();
        expect(getInput()).toBeInTheDocument();
        expect(getInput()).toHaveTextContent('Select');
      });

      test('can be clicked', async () => {
        renderSelect({
          value: 'RED',
          readOnly: true,
        });
        const { getInput, getPopover } = getLGSelectTestUtils();

        const trigger = getInput();
        userEvent.click(trigger);
        await waitFor(() => {
          expect(getPopover()).toBeInTheDocument();
        });
      });
    });

    describe('getErrorMessage', () => {
      test('is in the document', () => {
        renderSelect({
          state: State.Error,
          errorMessage: 'whoops',
        });
        const { getErrorMessage } = getLGSelectTestUtils();

        expect(getErrorMessage()).toBeInTheDocument();
        expect(getErrorMessage()).toHaveTextContent('whoops');
      });

      test('is not in the document', async () => {
        renderSelect();
        const { getErrorMessage } = getLGSelectTestUtils();
        expect(getErrorMessage()).not.toBeInTheDocument();
      });
    });

    describe('getOptions', () => {
      describe.each([true, false])('usePortal={%p}', boolean => {
        test('returns all options', async () => {
          renderSelect({
            usePortal: boolean,
          });
          const { clickTrigger, getOptions } = getLGSelectTestUtils();

          act(() => clickTrigger());
          await waitFor(() => {
            // `select` is an option
            expect(getOptions()).toHaveLength(8);
          });
        });
      });
    });

    describe('getOptionByValue', () => {
      describe.each([true, false])('usePortal={%p}', boolean => {
        test('is in the document', async () => {
          renderSelect({
            usePortal: boolean,
          });
          const { clickTrigger, getOptionByValue } = getLGSelectTestUtils();

          act(() => clickTrigger());
          await waitFor(() => {
            expect(getOptionByValue('Red')).toBeInTheDocument();
            expect(getOptionByValue('Orange you glad')).toBeInTheDocument();
          });
        });

        describe('is not in the document', () => {
          test('after awaiting waitFor', async () => {
            renderSelect({
              usePortal: boolean,
            });
            const { clickTrigger, getOptionByValue } = getLGSelectTestUtils();

            act(() => clickTrigger());
            await waitFor(() => {
              expect(getOptionByValue('Not an option')).not.toBeInTheDocument();
            });
          });
        });
      });
    });

    describe('getPopover', () => {
      describe.each([true, false])('when usePortal={%p}', boolean => {
        describe('is in the document', () => {
          test('after awaiting waitFor', async () => {
            renderSelect({
              usePortal: boolean,
            });
            const { clickTrigger, getPopover } = getLGSelectTestUtils();

            expect(getPopover()).not.toBeInTheDocument();
            act(() => clickTrigger());
            await waitFor(() => {
              expect(getPopover()).toBeInTheDocument();
            });
          });
        });

        describe('is not in the document ', () => {
          test('after clicking the trigger', async () => {
            renderSelect({
              usePortal: boolean,
            });
            const { clickTrigger, getPopover } = getLGSelectTestUtils();

            expect(getPopover()).not.toBeInTheDocument();
            act(() => clickTrigger());
            await waitFor(() => {
              expect(getPopover()).toBeInTheDocument();
            });
            act(() => clickTrigger());
            await waitForElementToBeRemoved(getPopover());
          });

          test('after clicking an option', async () => {
            renderSelect({
              usePortal: boolean,
            });
            const { clickTrigger, getPopover, clickOption } =
              getLGSelectTestUtils();

            expect(getPopover()).not.toBeInTheDocument();
            act(() => clickTrigger());
            await waitFor(() => {
              expect(getPopover()).toBeInTheDocument();
            });
            act(() => clickOption('Red'));
            await waitForElementToBeRemoved(getPopover());
          });
        });
      });
    });

    describe('isDisabled', () => {
      test('is false', () => {
        renderSelect();
        const { isDisabled } = getLGSelectTestUtils();
        expect(isDisabled()).toBeFalsy();
      });

      test('is true', () => {
        renderSelect({ disabled: true });
        const { isDisabled } = getLGSelectTestUtils();
        expect(isDisabled()).toBeTruthy();
      });
    });

    describe('isError', () => {
      test('is false', () => {
        renderSelect();
        const { isError } = getLGSelectTestUtils();
        expect(isError()).toBeFalsy();
      });

      test('is true', () => {
        renderSelect({
          errorMessage: 'errrror',
          state: State.Error,
        });
        const { isError } = getLGSelectTestUtils();
        expect(isError()).toBeTruthy();
      });
    });

    describe('getInputValue', () => {
      test('returns the default value "Select"', () => {
        renderSelect();
        const { getInputValue } = getLGSelectTestUtils();
        expect(getInputValue()).toBe('Select');
      });

      describe('value prop', () => {
        test('returns the value', () => {
          renderSelect({ value: 'Yellow' });
          const { getInputValue } = getLGSelectTestUtils();
          expect(getInputValue()).toBe('Yellow');
        });

        describe.each([true, false])('when usePortal={%p}', boolean => {
          test('returns the updated value after clicking on an option', async () => {
            renderSelectControlled({
              value: 'Blue',
              usePortal: boolean,
            });
            const { clickTrigger, getInputValue, clickOption } =
              getLGSelectTestUtils();

            expect(getInputValue()).toBe('Blue');
            act(() => clickTrigger());
            act(() => clickOption('Green'));
            await waitFor(() => {
              expect(getInputValue()).toBe('Green');
            });
          });
        });
      });

      describe('defaultValue prop', () => {
        test('returns the default value', () => {
          renderSelect({ defaultValue: 'Green' });
          const { getInputValue } = getLGSelectTestUtils();
          expect(getInputValue()).toBe('Green');
        });

        describe.each([true, false])('when usePortal={%p}', boolean => {
          test('returns the updated value after clicking on an option', async () => {
            renderSelect({
              defaultValue: 'Green',
              usePortal: boolean,
            });
            const { clickTrigger, getInputValue, clickOption } =
              getLGSelectTestUtils();

            expect(getInputValue()).toBe('Green');
            act(() => clickTrigger());
            await waitFor(() => {
              clickOption('Yellow');
            });
            await waitFor(() => {
              expect(getInputValue()).toBe('Yellow');
            });
          });
        });
      });
    });

    describe('clickOption', () => {
      describe.each([true, false])('when usePortal={%p}', boolean => {
        test('clicks an option', async () => {
          renderSelect({
            usePortal: boolean,
          });
          const { clickTrigger, getInputValue, clickOption } =
            getLGSelectTestUtils();

          expect(getInputValue()).toBe('Select');
          act(() => clickTrigger());
          await waitFor(() => {
            clickOption('Yellow');
          });
          await waitFor(() => {
            expect(getInputValue()).toBe('Yellow');
          });
        });

        test('throws an error when the option does not exist', async () => {
          renderSelect({
            usePortal: boolean,
          });
          const { clickTrigger, getInputValue, clickOption } =
            getLGSelectTestUtils();

          expect(getInputValue()).toBe('Select');
          act(() => clickTrigger());

          await waitFor(() => {
            expect(() => clickOption('Jellow')).toThrow();
          });

          try {
            await waitFor(() => {
              clickOption('Jellow');
            });
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              'message',
              expect.stringMatching(
                /Unable to find option with the value 'Jellow'/,
              ),
            );
          }
        });
      });
    });

    describe('clickTrigger', () => {
      test('opens the select menu', async () => {
        renderSelect();
        const { clickTrigger, getPopover } = getLGSelectTestUtils();

        act(() => clickTrigger());
        await waitFor(() => {
          expect(getPopover()).toBeInTheDocument();
        });
      });

      test('closes the select menu', async () => {
        renderSelect();
        const { clickTrigger, getPopover } = getLGSelectTestUtils();

        act(() => clickTrigger());
        await waitFor(() => {
          expect(getPopover()).toBeInTheDocument();
        });
        act(() => clickTrigger());
        await waitForElementToBeRemoved(getPopover());
      });
    });
  });

  describe('multiple selects', () => {
    test('both have correct default value', () => {
      renderMultipleSelects();

      const testUtils1 = getLGSelectTestUtils('lg-select-1');
      const testUtils2 = getLGSelectTestUtils('lg-select-2');

      expect(testUtils1.getInputValue()).toBe('Red');
      expect(testUtils2.getInputValue()).toBe('Blue');
    });

    describe('first select', () => {
      test('has correct number of options', async () => {
        renderMultipleSelects();
        const { clickTrigger, getOptions } =
          getLGSelectTestUtils('lg-select-1');

        act(() => clickTrigger());
        await waitFor(() => {
          // `select` is an option
          expect(getOptions()).toHaveLength(8);
        });
      });
    });

    describe('second select', () => {
      test('has correct number of options', async () => {
        renderMultipleSelects();
        const { clickTrigger, getOptions } =
          getLGSelectTestUtils('lg-select-2');

        act(() => clickTrigger());
        await waitFor(() => {
          // `select` is an option
          expect(getOptions()).toHaveLength(3);
        });
      });
    });
  });
});
