import React from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { transitionDuration } from '@leafygreen-ui/tokens';

import { Option, OptionGroup, Select } from '../../';

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

function waitForSelectTransitionDuration() {
  return new Promise(res => setTimeout(res, transitionDuration.slower));
}

describe('packages/select/getLGSelectTestUtils', () => {
  describe('getLabel', () => {
    test('renders label', () => {
      render(<Select {...defaultProps} />);
      const {
        elements: { getLabel },
      } = getLGSelectTestUtils();

      expect(getLabel()).toBeVisible();
    });

    test('does not render label', () => {
      render(<Select {...defaultProps} label="" />);
      const {
        elements: { getLabel },
      } = getLGSelectTestUtils();

      expect(getLabel()).not.toBeInTheDocument();
    });
  });

  describe('getDescription', () => {
    test('renders description', () => {
      render(<Select {...defaultProps} />);
      const {
        elements: { getDescription },
      } = getLGSelectTestUtils();

      expect(getDescription()).toBeVisible();
    });

    test('does not render description', () => {
      render(<Select {...defaultProps} description="" />);
      const {
        elements: { getDescription },
      } = getLGSelectTestUtils();

      expect(getDescription()).not.toBeInTheDocument();
    });
  });

  describe('getSelect', () => {
    test('default', () => {
      render(<Select {...defaultProps} />);
      const {
        elements: { getSelect },
      } = getLGSelectTestUtils();

      expect(getSelect()).toHaveTextContent('Select');
    });

    test('with value', () => {
      render(<Select {...defaultProps} value="RED" readOnly />);
      const {
        elements: { getSelect },
      } = getLGSelectTestUtils();

      expect(getSelect()).toHaveTextContent('Red');
    });

    test('click', async () => {
      render(<Select {...defaultProps} value="RED" readOnly />);
      const {
        elements: { getSelect, getOptions },
      } = getLGSelectTestUtils();

      const trigger = getSelect();
      userEvent.click(trigger);
      await waitFor(() => {
        const allOptions = getOptions();
        // `select` is counted as an option
        expect(allOptions).toHaveLength(8);
      });
    });
  });

  describe('mega', () => {
    test('1', async () => {
      render(<Select {...defaultProps} />);
      const {
        elements: { getOptions, getPopover },
        utils: { clickTrigger },
      } = getLGSelectTestUtils();

      clickTrigger();
      await waitFor(() => {
        const allOptions = getOptions();
        // `select` is counted as an option
        expect(allOptions).toHaveLength(8);
      });

      clickTrigger();
      await waitForElementToBeRemoved(getPopover());
    });

    test('2', async () => {
      render(<Select {...defaultProps} />);
      const {
        elements: { getOptionByValue },
        utils: { clickTrigger },
      } = getLGSelectTestUtils();

      clickTrigger();
      await waitFor(() => {
        expect(getOptionByValue('Red')).toBeInTheDocument();
        expect(getOptionByValue('Orange you glad')).toBeInTheDocument();
        expect(getOptionByValue('Not an option')).not.toBeInTheDocument();
      });
    });

    test('3', async () => {
      render(<Select {...defaultProps} />);
      const {
        elements: { getOptionByValue },
        utils: { clickTrigger },
      } = getLGSelectTestUtils();

      clickTrigger();
      await waitForSelectTransitionDuration();
      expect(getOptionByValue('Red')).toBeInTheDocument();
      expect(getOptionByValue('Orange you glad')).toBeInTheDocument();
      expect(getOptionByValue('Not an option')).not.toBeInTheDocument();
    });

    test('4', async () => {
      render(<Select {...defaultProps} />);
      const {
        elements: { getPopover },
        utils: { clickTrigger, clickOption, getSelectValue },
      } = getLGSelectTestUtils();

      expect(getSelectValue()).toBe('Select');
      clickTrigger();
      await waitForSelectTransitionDuration();
      clickOption('Red');
      await waitForElementToBeRemoved(getPopover());
      expect(getSelectValue()).toBe('Red');
    });
  });
});

// without portal
