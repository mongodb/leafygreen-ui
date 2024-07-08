import React, { useState } from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Option, OptionGroup, Select, State } from '../../';

import { getTestUtils } from './getTestUtils';

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

describe('packages/select/getTestUtils', () => {
  test('throws error if select is not found', () => {
    try {
      renderSelect({ 'data-lgid': 'different-id' });
      const _utils = getTestUtils();
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
        const { getLabel } = getTestUtils();
        expect(getLabel()).toBeInTheDocument();
      });

      test('is not in the document', () => {
        renderSelect({ label: '' });
        const { getLabel } = getTestUtils();
        expect(getLabel()).not.toBeInTheDocument();
      });
    });

    describe('getDescription', () => {
      test('is in the document', () => {
        renderSelect();
        const { getDescription } = getTestUtils();
        expect(getDescription()).toBeVisible();
      });

      test('is not in the document', () => {
        renderSelect({ description: '' });
        const { getDescription } = getTestUtils();
        expect(getDescription()).not.toBeInTheDocument();
      });
    });

    describe('getInput', () => {
      test('is in the document', () => {
        renderSelect();
        const { getInput } = getTestUtils();
        expect(getInput()).toBeInTheDocument();
        expect(getInput()).toHaveTextContent('Select');
      });

      test('can be clicked', async () => {
        renderSelect();
        const { getInput, getPopover } = getTestUtils();

        const trigger = getInput();
        userEvent.click(trigger);
        expect(getPopover()).toBeInTheDocument();
      });

      test('can close the popover', async () => {
        renderSelect();
        const { getInput, getPopover } = getTestUtils();

        const trigger = getInput();
        userEvent.click(trigger);
        expect(getPopover()).toBeInTheDocument();
        userEvent.click(trigger);
        await waitForElementToBeRemoved(getPopover());
      });
    });

    describe('getErrorMessage', () => {
      test('is in the document', () => {
        renderSelect({
          state: State.Error,
          errorMessage: 'whoops',
        });
        const { getErrorMessage } = getTestUtils();

        expect(getErrorMessage()).toBeInTheDocument();
        expect(getErrorMessage()).toHaveTextContent('whoops');
      });

      test('is not in the document', async () => {
        renderSelect();
        const { getErrorMessage } = getTestUtils();
        expect(getErrorMessage()).not.toBeInTheDocument();
      });
    });

    describe('getOptions', () => {
      describe.each([true, false])('usePortal={%p}', boolean => {
        test('returns all options', async () => {
          renderSelect({
            usePortal: boolean,
          });
          const { getInput, getOptions } = getTestUtils();

          userEvent.click(getInput());
          // `select` is an option
          expect(getOptions()).toHaveLength(8);
        });
      });
    });

    describe('getOptionByValue', () => {
      describe.each([true, false])('usePortal={%p}', boolean => {
        test('is in the document', async () => {
          renderSelect({
            usePortal: boolean,
          });
          const { getInput, getOptionByValue } = getTestUtils();

          userEvent.click(getInput());
          expect(getOptionByValue('Red')).toBeInTheDocument();
          expect(getOptionByValue('Orange you glad')).toBeInTheDocument();
        });

        test('is not in the document', async () => {
          renderSelect({
            usePortal: boolean,
          });
          const { getInput, getOptionByValue } = getTestUtils();

          userEvent.click(getInput());
          expect(getOptionByValue('Not an option')).not.toBeInTheDocument();
        });

        test('can be clicked', async () => {
          renderSelect({
            usePortal: boolean,
          });
          const { getInput, getOptionByValue, getInputValue } = getTestUtils();

          userEvent.click(getInput());
          userEvent.click(getOptionByValue('Red')!);
          expect(getInputValue()).toBe('Red');
        });

        test('throws an error if the option does not exist', async () => {
          renderSelect({
            usePortal: boolean,
          });
          const { getInput, getOptionByValue } = getTestUtils();

          userEvent.click(getInput());
          expect(() => userEvent.click(getOptionByValue('Jellow')!)).toThrow();
        });

        test('prevents a click on a disabled option', async () => {
          renderSelect({
            usePortal: boolean,
          });
          const { getInput, getOptionByValue, getPopover, getInputValue } =
            getTestUtils();

          userEvent.click(getInput());
          userEvent.click(getOptionByValue('Orange you glad')!);

          expect(getPopover()).toBeInTheDocument();
          expect(getInputValue()).toBe('Select');
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
            const { getInput, getPopover } = getTestUtils();

            expect(getPopover()).not.toBeInTheDocument();
            userEvent.click(getInput());
            expect(getPopover()).toBeInTheDocument();
          });
        });

        describe('is not in the document ', () => {
          test('after clicking the trigger', async () => {
            renderSelect({
              usePortal: boolean,
            });
            const { getInput, getPopover } = getTestUtils();

            expect(getPopover()).not.toBeInTheDocument();
            userEvent.click(getInput());
            expect(getPopover()).toBeInTheDocument();
            userEvent.click(getInput());
            await waitForElementToBeRemoved(getPopover());
          });

          test('after clicking an option', async () => {
            renderSelect({
              usePortal: boolean,
            });
            const { getInput, getPopover, getOptionByValue } = getTestUtils();

            expect(getPopover()).not.toBeInTheDocument();
            userEvent.click(getInput());
            expect(getPopover()).toBeInTheDocument();
            userEvent.click(getOptionByValue('Red')!);
            await waitForElementToBeRemoved(getPopover());
          });
        });
      });
    });

    describe('isDisabled', () => {
      test('is false', () => {
        renderSelect();
        const { isDisabled } = getTestUtils();
        expect(isDisabled()).toBeFalsy();
      });

      test('is true', () => {
        renderSelect({ disabled: true });
        const { isDisabled } = getTestUtils();
        expect(isDisabled()).toBeTruthy();
      });
    });

    describe('isError', () => {
      test('is false', () => {
        renderSelect();
        const { isError } = getTestUtils();
        expect(isError()).toBeFalsy();
      });

      test('is true', () => {
        renderSelect({
          errorMessage: 'errrror',
          state: State.Error,
        });
        const { isError } = getTestUtils();
        expect(isError()).toBeTruthy();
      });
    });

    describe('getInputValue', () => {
      test('returns the default value "Select"', () => {
        renderSelect();
        const { getInputValue } = getTestUtils();
        expect(getInputValue()).toBe('Select');
      });

      describe('value prop', () => {
        test('returns the value', () => {
          renderSelect({ value: 'Yellow' });
          const { getInputValue } = getTestUtils();
          expect(getInputValue()).toBe('Yellow');
        });

        describe.each([true, false])('when usePortal={%p}', boolean => {
          test('returns the updated value after clicking on an option', async () => {
            renderSelectControlled({
              value: 'Blue',
              usePortal: boolean,
            });
            const { getInput, getInputValue, getOptionByValue } =
              getTestUtils();

            expect(getInputValue()).toBe('Blue');
            userEvent.click(getInput());
            userEvent.click(getOptionByValue('Green')!);
            expect(getInputValue()).toBe('Green');
          });
        });
      });

      describe('defaultValue prop', () => {
        test('returns the default value', () => {
          renderSelect({ defaultValue: 'Green' });
          const { getInputValue } = getTestUtils();
          expect(getInputValue()).toBe('Green');
        });

        describe.each([true, false])('when usePortal={%p}', boolean => {
          test('returns the updated value after clicking on an option', async () => {
            renderSelect({
              defaultValue: 'Green',
              usePortal: boolean,
            });
            const { getInput, getInputValue, getOptionByValue } =
              getTestUtils();

            expect(getInputValue()).toBe('Green');
            userEvent.click(getInput());
            userEvent.click(getOptionByValue('Yellow')!);
            expect(getInputValue()).toBe('Yellow');
          });
        });
      });
    });
  });

  describe('multiple selects', () => {
    test('both have correct default value', () => {
      renderMultipleSelects();

      const testUtils1 = getTestUtils('lg-select-1');
      const testUtils2 = getTestUtils('lg-select-2');

      expect(testUtils1.getInputValue()).toBe('Red');
      expect(testUtils2.getInputValue()).toBe('Blue');
    });

    describe('first select', () => {
      test('has correct number of options', async () => {
        renderMultipleSelects();
        const { getInput, getOptions } = getTestUtils('lg-select-1');

        userEvent.click(getInput());
        // `select` is an option
        expect(getOptions()).toHaveLength(8);
      });
    });

    describe('second select', () => {
      test('has correct number of options', async () => {
        renderMultipleSelects();
        const { getInput, getOptions } = getTestUtils('lg-select-2');

        userEvent.click(getInput());
        // `select` is an option
        expect(getOptions()).toHaveLength(3);
      });
    });
  });
});
