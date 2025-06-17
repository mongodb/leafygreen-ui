import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { JsonChecklistItem } from './JsonChecklistItem';
import { Status } from './JsonChecklistItem.types';

const renderJsonChecklistItem = (props = {}) => {
  return render(
    <ul>
      <JsonChecklistItem
        label="Test Label"
        onAddClick={jest.fn()}
        status={Status.Missing}
        {...props}
      />
    </ul>,
  );
};

describe('packages/code-editor/JsonChecklistItem', () => {
  describe('a11y', () => {
    test('does not have basic accessibility violations', async () => {
      const { container } = renderJsonChecklistItem();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('forwards ref to the li element', () => {
    const ref = React.createRef<HTMLLIElement>();
    renderJsonChecklistItem({
      ref,
    });
    expect(ref.current).toBeDefined();
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });

  test('renders label', () => {
    const { getByText } = renderJsonChecklistItem({
      label: 'Test Label',
    });
    expect(getByText('Test Label')).toBeVisible();
  });

  test('renders description when provided', () => {
    const { getByText } = renderJsonChecklistItem({
      description: 'Test Description',
    });
    expect(getByText('Test Description')).toBeVisible();
  });

  test('renders a single badge when provided as an object', () => {
    const { getByText } = renderJsonChecklistItem({
      badges: { children: 'Badge Text' },
    });
    expect(getByText('Badge Text')).toBeInTheDocument();
  });

  test('renders multiple badges when provided as an array', () => {
    const { getByText } = renderJsonChecklistItem({
      badges: [{ children: 'Badge 1' }, { children: 'Badge 2' }],
    });
    expect(getByText('Badge 1')).toBeInTheDocument();
    expect(getByText('Badge 2')).toBeInTheDocument();
  });

  describe('status', () => {
    test(`renders 'Add' button when status is ${Status.Missing}`, () => {
      const { getByRole } = renderJsonChecklistItem({
        status: Status.Missing,
      });
      expect(getByRole('button', { name: 'Add' })).toBeVisible();
    });

    test(`calls onAddClick when 'Add' button is clicked`, () => {
      const onClickMock = jest.fn();

      const { getByRole } = renderJsonChecklistItem({
        onAddClick: onClickMock,
        status: Status.Missing,
      });

      const button = getByRole('button');
      userEvent.click(button);
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test(`renders icon and 'Added!' text when status is ${Status.Present}`, () => {
      const { getByText, getByRole } = renderJsonChecklistItem({
        status: Status.Present,
      });
      expect(getByText('Added!')).toBeVisible();
      expect(getByRole('img')).toBeVisible();
    });
  });
});
