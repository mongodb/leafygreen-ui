import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MarketingModal from '.';

function renderModal(
  props: Partial<React.ComponentProps<typeof MarketingModal>> = {},
) {
  return render(
    <MarketingModal
      title="Title text"
      cover={<img alt="" src="" aria-label="Cover image" />}
      primaryActionProps={{
        label: 'Primary action',
      }}
      secondaryActionProps={{
        label: 'Secondary action',
      }}
      {...props}
    >
      {props.children ?? 'Content text'}
    </MarketingModal>,
  );
}

describe('packages/confirmation-modal', () => {
  test('does not render if closed', () => {
    renderModal();
    expect(document.body.innerHTML).toEqual('<div></div>');
  });

  test('renders if open', () => {
    const { getByText, getByLabelText } = renderModal({ open: true });
    expect(getByLabelText('Cover image')).toBeVisible();
    expect(getByText('Title text')).toBeVisible();
    expect(getByText('Content text')).toBeVisible();
    expect(getByText('Primary action')).toBeVisible();
    expect(getByText('Secondary action')).toBeVisible();
  });

  test('fires primary action', () => {
    const clickSpy = jest.fn();

    const { getByText } = renderModal({
      open: true,
      primaryActionProps: {
        label: 'Primary action',
        onClick: clickSpy,
      },
    });

    const button = getByText('Primary action');
    expect(button).toBeVisible();

    fireEvent.click(button);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  test('fires secondary action', () => {
    const clickSpy = jest.fn();

    const { getByText } = renderModal({
      open: true,
      secondaryActionProps: {
        label: 'Secondary action',
        onClick: clickSpy,
      },
    });

    const button = getByText('Secondary action');
    expect(button).toBeVisible();

    fireEvent.click(button);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
