import React, { useState } from 'react';
import {
  act,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { transitionDuration } from '@leafygreen-ui/tokens';

import { Option, OptionGroup, Select, SelectProps, State } from '../../';

import { getLGSelectTestUtils } from './getLGSelectTestUtils';

const defaultProps = {
  label: 'Label',
  name: 'pet',
  description: 'Description',
  children: [
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
  ],
} as const;

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

function renderSelectControlled(props = {}) {
  const ControlledSelect = (props = {}) => {
    const { value: propValue, ...rest } = props;
    const [value, setValue] = useState(propValue);

    return (
      <Select {...defaultProps} {...rest} value={value} onChange={setValue} />
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

// function waitForSelectTransitionDuration() {
//   return new Promise(res => setTimeout(res, transitionDuration.slower));
// }

describe('packages/select/getLGSelectTestUtils', () => {
  describe('getLabel', () => {
    test('renders label', () => {
      const { getLabel } = renderSelect();
      expect(getLabel()).toBeVisible();
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

  describe('getSelect', () => {
    test('is in the document', () => {
      const { getSelect } = renderSelect();

      expect(getSelect()).toBeInTheDocument();
      expect(getSelect()).toHaveTextContent('Select');
    });

    test('can be clicked', async () => {
      const { getSelect, getPopover } = renderSelect({
        value: 'RED',
        readOnly: true,
      });

      const trigger = getSelect();
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
      test('returns all options then await waitFor', async () => {
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
      describe('is in the document', () => {
        test('after awaiting waitFor', async () => {
          const { getOptionByValue, clickTrigger } = renderSelect({
            usePortal: boolean,
          });

          clickTrigger();
          await waitFor(() => {
            expect(getOptionByValue('Red')).toBeInTheDocument();
            expect(getOptionByValue('Orange you glad')).toBeInTheDocument();
          });
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
      expect(isDisabled()).toBe(false);
    });

    test('is true', () => {
      const { isDisabled } = renderSelect({ disabled: true });
      expect(isDisabled()).toBe(true);
    });
  });

  describe('isError', () => {
    test('is false', () => {
      const { isError } = renderSelect();
      expect(isError()).toBe(false);
    });

    test('is true', () => {
      const { isError } = renderSelect({
        errorMessage: 'errrror',
        state: State.Error,
      });
      expect(isError()).toBe(true);
    });
  });

  describe('getSelectValue', () => {
    test('returns the value', () => {
      const { getSelectValue } = renderSelect();
      expect(getSelectValue()).toBe('Select');
    });

    describe('value prop', () => {
      test('returns the value', () => {
        const { getSelectValue } = renderSelect({ value: 'Yellow' });
        expect(getSelectValue()).toBe('Yellow');
      });

      describe.each([true, false])('when usePortal={%p}', boolean => {
        test('returns the updated value after clicking on an option', async () => {
          const { getSelectValue, clickTrigger, clickOption } =
            renderSelectControlled({
              value: 'Blue',
              usePortal: boolean,
            });

          expect(getSelectValue()).toBe('Blue');
          clickTrigger();
          await waitFor(() => {
            clickOption('Green');
          });
          await waitFor(() => {
            expect(getSelectValue()).toBe('Green');
          });
        });
      });
    });

    describe('defaultValue prop', () => {
      test('returns the default value', () => {
        const { getSelectValue } = renderSelect({ defaultValue: 'Green' });
        expect(getSelectValue()).toBe('Green');
      });

      describe.each([true, false])('when usePortal={%p}', boolean => {
        test('returns the updated value after clicking on an option', async () => {
          const { getSelectValue, clickTrigger, clickOption } = renderSelect({
            defaultValue: 'Green',
            usePortal: boolean,
          });

          expect(getSelectValue()).toBe('Green');
          clickTrigger();
          await waitFor(() => {
            clickOption('Yellow');
          });
          await waitFor(() => {
            expect(getSelectValue()).toBe('Yellow');
          });
        });
      });
    });
  });

  describe('clickOption', () => {
    describe.each([true, false])('when usePortal={%p}', boolean => {
      test('clicks an option', async () => {
        const { getSelectValue, clickTrigger, clickOption } = renderSelect({
          usePortal: boolean,
        });

        expect(getSelectValue()).toBe('Select');
        clickTrigger();
        await waitFor(() => {
          clickOption('Yellow');
        });
        await waitFor(() => {
          expect(getSelectValue()).toBe('Yellow');
        });
      });

      test('throws an error when the option does not exist', async () => {
        const { getSelectValue, clickTrigger, clickOption } = renderSelect({
          usePortal: boolean,
        });

        expect(getSelectValue()).toBe('Select');
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
              /Could not find option with the value 'Jellow'/,
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

  describe('multiple selects', () => {});
});
