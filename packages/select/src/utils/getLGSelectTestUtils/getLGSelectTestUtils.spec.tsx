import React from 'react';
import { render, waitFor } from '@testing-library/react';

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
  });

  describe('mega', () => {
    test('with value', async () => {
      render(<Select {...defaultProps} />);
      const {
        elements: { getOptions },
        utils: { clickTrigger },
      } = getLGSelectTestUtils();

      clickTrigger();
      await waitFor(() => {
        const allOptions = getOptions();
        // `select` is counted as an option
        expect(allOptions).toHaveLength(8);
      });
    });
  });
});
