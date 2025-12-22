import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getTestUtils as getSelectTestUtils } from '@leafygreen-ui/select/testing';

import { getLgIds } from '../utils';

import { TimeInputSelect, TimeInputSelectProps } from '.';

const lgIds = getLgIds();

const renderTimeInputSelect = (props: TimeInputSelectProps) => {
  const result = render(<TimeInputSelect {...props} />);

  const testUtils = getSelectTestUtils(lgIds.select);

  return {
    ...result,
    ...testUtils,
  };
};

describe('packages/time-input-select', () => {
  describe('Rendering', () => {
    test('is in the document', () => {
      const { getInput } = renderTimeInputSelect({
        unit: 'AM',
        onChange: () => {},
      });
      expect(getInput()).toBeInTheDocument();
    });

    test('shows the correct value', () => {
      const { getInput } = renderTimeInputSelect({
        unit: 'AM',
        onChange: () => {},
      });
      expect(getInput()).toHaveValue('AM');
    });

    test('has AM and PM options', () => {
      const { getInput, getOptionByValue, getOptions } = renderTimeInputSelect({
        unit: 'AM',
        onChange: () => {},
      });

      userEvent.click(getInput());
      expect(getOptions()).toHaveLength(2);
      expect(getOptionByValue('AM')).toBeInTheDocument();
      expect(getOptionByValue('PM')).toBeInTheDocument();
    });
  });

  describe('onChange', () => {
    test('is called with the selected option', () => {
      const onChange = jest.fn();
      const { getInput, getOptionByValue } = renderTimeInputSelect({
        unit: 'AM',
        onChange,
      });

      userEvent.click(getInput());
      userEvent.click(getOptionByValue('PM')!);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          displayName: 'PM',
          value: 'PM',
        }),
      );
    });
  });
});
