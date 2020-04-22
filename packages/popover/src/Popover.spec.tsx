import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import Popover from './Popover';

function renderPopover(props = {}) {
  const utils = render(
    <>
      <button data-testid="button-test-id">Trigger Element</button>
      <Popover {...props} data-testid="popover-test-id">
        Popover Content
      </Popover>
    </>,
  );
  const button = utils.getByTestId('button-test-id');
  return { ...utils, button };
}

describe('packages/popover', () => {
  test('displays popover when the "active" prop is set', () => {
    const { getByTestId } = renderPopover({ active: true });
    expect(getByTestId('popover-test-id')).toBeInTheDocument();
  });

  test('does not display popover when "active" prop is not set', () => {
    const { container } = renderPopover();
    expect(container.innerHTML.includes('popover-test-id')).toBe(false);
  });

  test('portals popover content to end of DOM, when "usePortal" is not set', () => {
    const { container, getByTestId } = renderPopover({ active: true });
    expect(container).not.toContain(getByTestId('popover-test-id'));
  });

  test('does not portal popover content to end of DOM when "usePortal" is false', () => {
    const { container } = renderPopover({
      active: true,
      usePortal: false,
    });

    expect(container.innerHTML.includes('popover-test-id')).toBe(true);
  });

  test('removes Popover instance on unmound', () => {
    const { container, unmount } = renderPopover();
    unmount();
    expect(container.innerHTML).toBe('');
  });
});
