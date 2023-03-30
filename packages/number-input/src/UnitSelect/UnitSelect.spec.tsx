import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { UnitSelect } from '.';

const selectProps = {
  onChange: jest.fn(),
  unit: 'day',
  unitOptions: [
    {
      displayName: 'day',
      value: 'day',
    },
    {
      displayName: 'month',
      value: 'month',
    },
    {
      displayName: 'year',
      value: 'year',
    },
  ],
};

function renderSelect(props = {}) {
  // @ts-ignore - missing props
  const utils = render(<UnitSelect data-testid="select-input" {...props} />);
  const select = utils.getByTestId('select-input');
  return {
    ...utils,
    select,
  };
}

// These are the same test from `NumberInput.spec.tsx`
describe('packages/number-input/select', () => {
  test('a collapsed select is rendered, with an active state based on the language prop', () => {
    const { getByRole } = renderSelect({ ...selectProps });
    expect(getByRole('button', { name: selectProps.unit })).toBeInTheDocument();
  });

  test('clicking the collapsed select menu button opens a select', () => {
    const { getByRole } = renderSelect({ ...selectProps });
    const trigger = getByRole('button', { name: selectProps.unit });
    fireEvent.click(trigger);
    expect(getByRole('listbox')).toBeInTheDocument();
  });

  test('options displayed in select are based on the languageOptions prop', () => {
    const { getByRole } = renderSelect({ ...selectProps });
    const trigger = getByRole('button', { name: selectProps.unit });
    fireEvent.click(trigger);

    // First option has a checkmark next to it
    selectProps.unitOptions.slice(0, 1).forEach(lang => {
      expect(
        getByRole('option', { name: `Checkmark Icon ${lang.displayName}` }),
      ).toBeInTheDocument();
    });

    selectProps.unitOptions.slice(1).forEach(lang => {
      expect(
        getByRole('option', { name: lang.displayName }),
      ).toBeInTheDocument();
    });
  });

  test('onChange prop gets called when new unit is selected', () => {
    const { getByRole } = renderSelect({ ...selectProps });

    const trigger = getByRole('button', { name: selectProps.unit });
    fireEvent.click(trigger);

    fireEvent.click(
      getByRole('option', { name: selectProps.unitOptions[1].displayName }),
    );
    expect(selectProps.onChange).toHaveBeenCalled();
  });

  test('onChange prop is called with an object that represents the newly selected unit when called', () => {
    const { getByRole } = renderSelect({ ...selectProps });

    const trigger = getByRole('button', { name: selectProps.unit });
    fireEvent.click(trigger);

    fireEvent.click(
      getByRole('option', { name: selectProps.unitOptions[1].displayName }),
    );

    expect(selectProps.onChange).toHaveBeenCalledWith({
      displayName: selectProps.unitOptions[1].displayName,
      value: selectProps.unitOptions[1].value,
    });
  });
});
