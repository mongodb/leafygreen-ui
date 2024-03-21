import React from 'react';
import {
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
    renderUtils.rerender(<Select {...defaultProps} {...props} />);
  };

  return {
    ...renderUtils,
    ...elements,
    ...utils,
    rerenderSelect,
  };
}

function waitForSelectTransitionDuration() {
  return new Promise(res => setTimeout(res, transitionDuration.slower));
}

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
    test('is "Select" by default', () => {
      const { getSelectValue } = renderSelect();
      expect(getSelectValue()).toBe('Select');
    });

    describe('value prop', () => {
      test('returns the value', () => {
        const { getSelectValue } = renderSelect({ value: 'Yellow' });
        expect(getSelectValue()).toBe('Yellow');
      });

      // needs onChange to update value
      test.skip('returns the updated value after clicking on an option', async () => {
        const { getSelectValue, clickTrigger, clickOption } = renderSelect({
          value: 'Blue',
        });

        expect(getSelectValue()).toBe('Blue');
        clickTrigger();
        await waitFor(() => {
          clickOption('Orange you glad');
        });
        await waitFor(() => {
          expect(getSelectValue()).toBe('Orange you glad');
        });
      });
    });

    describe('defaultValue prop', () => {
      test('returns the default value', () => {
        const { getSelectValue } = renderSelect({ defaultValue: 'Green' });
        expect(getSelectValue()).toBe('Green');
      });

      test('returns the updated value after clicking on an option', async () => {
        const { getSelectValue, clickTrigger, clickOption } = renderSelect({
          defaultValue: 'Green',
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

  describe('clickOption', () => {});
  describe('clickTrigger', () => {});
  describe('multiple selects', () => {});
});

// test errors
