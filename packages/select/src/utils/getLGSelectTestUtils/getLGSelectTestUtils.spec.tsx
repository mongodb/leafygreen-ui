import React, { useState } from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Option, OptionGroup, Select, SelectProps, State } from '../../';

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

  const { elements, utils } = getLGSelectTestUtils();

  return {
    ...renderUtils,
    ...elements,
    ...utils,
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
  const { elements, utils } = getLGSelectTestUtils();

  return {
    ...renderUtils,
    ...elements,
    ...utils,
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

  const { elements: testElements1, utils: testUtils1 } =
    getLGSelectTestUtils('lg-select-1');
  const { elements: testElements2, utils: testUtils2 } =
    getLGSelectTestUtils('lg-select-2');

  return {
    ...renderUtils,
    testElements1,
    testElements2,
    testUtils1,
    testUtils2,
  };
}

describe('packages/select/getLGSelectTestUtils', () => {
  test('throws error if select is not found', () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { getLabel } = renderSelect({ 'data-lgid': 'different-id' });
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

  describe('getLabel', () => {
    test('renders label', () => {
      const { getLabel } = renderSelect();
      expect(getLabel()).toBeInTheDocument();
    });

    test('does not render label', () => {
      const { getLabel } = renderSelect({ label: '' });
      expect(getLabel()).not.toBeInTheDocument();
    });
  });

  describe('getDescription', () => {
    test('renders description', () => {
      const { getDescription } = renderSelect();
      expect(getDescription()).toBeVisible();
    });

    test('does not render description', () => {
      const { getDescription } = renderSelect({ description: '' });
      expect(getDescription()).not.toBeInTheDocument();
    });
  });

  describe('getInput', () => {
    test('is in the document', () => {
      const { getInput } = renderSelect();

      expect(getInput()).toBeInTheDocument();
      expect(getInput()).toHaveTextContent('Select');
    });

    test('can be clicked', async () => {
      const { getInput, getPopover } = renderSelect({
        value: 'RED',
        readOnly: true,
      });

      const trigger = getInput();
      userEvent.click(trigger);
      await waitFor(() => {
        expect(getPopover()).toBeInTheDocument();
      });
    });
  });

  describe('getErrorMessage', () => {
    test('is in the document', () => {
      const { getErrorMessage } = renderSelect({
        state: State.Error,
        errorMessage: 'whoops',
      });

      expect(getErrorMessage()).toBeInTheDocument();
      expect(getErrorMessage()).toHaveTextContent('whoops');
    });

    test('is not in the document', async () => {
      const { getErrorMessage } = renderSelect();
      expect(getErrorMessage()).not.toBeInTheDocument();
    });
  });

  describe('getOptions', () => {
    describe.each([true, false])('usePortal={%p}', boolean => {
      test('returns all options', async () => {
        const { getOptions, clickTrigger } = renderSelect({
          usePortal: boolean,
        });

        clickTrigger();
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
        const { getOptionByValue, clickTrigger } = renderSelect({
          usePortal: boolean,
        });

        clickTrigger();
        await waitFor(() => {
          expect(getOptionByValue('Red')).toBeInTheDocument();
          expect(getOptionByValue('Orange you glad')).toBeInTheDocument();
        });
      });

      describe('is not in the document', () => {
        test('after awaiting waitFor', async () => {
          const { getOptionByValue, clickTrigger } = renderSelect({
            usePortal: boolean,
          });

          clickTrigger();
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
          const { getPopover, clickTrigger } = renderSelect({
            usePortal: boolean,
          });

          expect(getPopover()).not.toBeInTheDocument();
          clickTrigger();
          await waitFor(() => {
            expect(getPopover()).toBeInTheDocument();
          });
        });
      });

      describe('is not in the document ', () => {
        test('after clicking the trigger', async () => {
          const { getPopover, clickTrigger } = renderSelect({
            usePortal: boolean,
          });

          expect(getPopover()).not.toBeInTheDocument();
          clickTrigger();
          await waitFor(() => {
            expect(getPopover()).toBeInTheDocument();
          });
          clickTrigger();
          await waitForElementToBeRemoved(getPopover());
        });

        test('after clicking an option', async () => {
          const { getPopover, clickTrigger, clickOption } = renderSelect({
            usePortal: boolean,
          });

          expect(getPopover()).not.toBeInTheDocument();
          clickTrigger();
          await waitFor(() => {
            expect(getPopover()).toBeInTheDocument();
          });
          clickOption('Red');
          await waitForElementToBeRemoved(getPopover());
        });
      });
    });
  });

  describe('isDisabled', () => {
    test('is false', () => {
      const { isDisabled } = renderSelect();
      expect(isDisabled()).toBeFalsy();
    });

    test('is true', () => {
      const { isDisabled } = renderSelect({ disabled: true });
      expect(isDisabled()).toBeTruthy();
    });
  });

  describe('isError', () => {
    test('is false', () => {
      const { isError } = renderSelect();
      expect(isError()).toBeFalsy();
    });

    test('is true', () => {
      const { isError } = renderSelect({
        errorMessage: 'errrror',
        state: State.Error,
      });
      expect(isError()).toBeTruthy();
    });
  });

  describe('getInputValue', () => {
    test('returns the default value "Select"', () => {
      const { getInputValue } = renderSelect();
      expect(getInputValue()).toBe('Select');
    });

    describe('value prop', () => {
      test('returns the value', () => {
        const { getInputValue } = renderSelect({ value: 'Yellow' });
        expect(getInputValue()).toBe('Yellow');
      });

      describe.each([true, false])('when usePortal={%p}', boolean => {
        test('returns the updated value after clicking on an option', async () => {
          const { getInputValue, clickTrigger, clickOption } =
            renderSelectControlled({
              value: 'Blue',
              usePortal: boolean,
            });

          expect(getInputValue()).toBe('Blue');
          clickTrigger();
          await waitFor(() => {
            clickOption('Green');
          });
          await waitFor(() => {
            expect(getInputValue()).toBe('Green');
          });
        });
      });
    });

    describe('defaultValue prop', () => {
      test('returns the default value', () => {
        const { getInputValue } = renderSelect({ defaultValue: 'Green' });
        expect(getInputValue()).toBe('Green');
      });

      describe.each([true, false])('when usePortal={%p}', boolean => {
        test('returns the updated value after clicking on an option', async () => {
          const { getInputValue, clickTrigger, clickOption } = renderSelect({
            defaultValue: 'Green',
            usePortal: boolean,
          });

          expect(getInputValue()).toBe('Green');
          clickTrigger();
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
        const { getInputValue, clickTrigger, clickOption } = renderSelect({
          usePortal: boolean,
        });

        expect(getInputValue()).toBe('Select');
        clickTrigger();
        await waitFor(() => {
          clickOption('Yellow');
        });
        await waitFor(() => {
          expect(getInputValue()).toBe('Yellow');
        });
      });

      test('throws an error when the option does not exist', async () => {
        const { getInputValue, clickTrigger, clickOption } = renderSelect({
          usePortal: boolean,
        });

        expect(getInputValue()).toBe('Select');
        clickTrigger();

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
      const { clickTrigger, getPopover } = renderSelect();
      clickTrigger();
      await waitFor(() => {
        expect(getPopover()).toBeInTheDocument();
      });
    });

    test('closes the select menu', async () => {
      const { clickTrigger, getPopover } = renderSelect();
      clickTrigger();
      await waitFor(() => {
        expect(getPopover()).toBeInTheDocument();
      });
      clickTrigger();
      await waitForElementToBeRemoved(getPopover());
    });
  });

  describe('multiple selects', () => {
    test('both have correct default value', () => {
      const { testUtils1, testUtils2 } = renderMultipleSelects();

      expect(testUtils1.getInputValue()).toBe('Red');
      expect(testUtils2.getInputValue()).toBe('Blue');
    });

    describe('first select', () => {
      test('has correct number of options', async () => {
        const {
          testUtils1: { clickTrigger },
          testElements1: { getOptions },
        } = renderMultipleSelects();

        clickTrigger();
        await waitFor(() => {
          // `select` is an option
          expect(getOptions()).toHaveLength(8);
        });
      });
    });

    describe('second select', () => {
      test('has correct number of options', async () => {
        const {
          testUtils2: { clickTrigger },
          testElements2: { getOptions },
        } = renderMultipleSelects();

        clickTrigger();
        await waitFor(() => {
          // `select` is an option
          expect(getOptions()).toHaveLength(3);
        });
      });
    });
  });
});
