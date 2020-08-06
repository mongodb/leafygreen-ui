import React, { useState } from 'react';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import MarketingModal from '.';

const WrappedModal = ({
  open: initialOpen,
  ...props
}: Partial<React.ComponentProps<typeof MarketingModal>>) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <MarketingModal
      title="Title text"
      open={open}
      setOpen={setOpen}
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
    </MarketingModal>
  );
};

function renderModal(
  props: Partial<React.ComponentProps<typeof MarketingModal>> = {},
) {
  return render(<WrappedModal {...props} />);
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

  describe('closes when', () => {
    test('backdrop is clicked', async () => {
      const { getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      fireEvent.click(modal.parentElement);

      await waitForElementToBeRemoved(modal);
    });

    test('escape key is pressed', async () => {
      const { getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });

      await waitForElementToBeRemoved(modal);
    });

    test('x icon is clicked', async () => {
      const { getByTitle, getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      const x = getByTitle('close modal');
      fireEvent.click(x);

      await waitForElementToBeRemoved(modal);
    });
  });
});
