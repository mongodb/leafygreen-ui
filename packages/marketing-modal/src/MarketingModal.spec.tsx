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
      buttonText="Okay"
      linkText="Cancel"
      open={open}
      onClose={() => setOpen(false)}
      cover={<img alt="" src="" aria-label="Cover image" />}
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
    expect(getByText('Okay')).toBeVisible();
    expect(getByText('Cancel')).toBeVisible();
  });

  test('fires `onClose` on confirmation', () => {
    const clickSpy = jest.fn();

    const { getByText } = renderModal({
      open: true,
      onClose: clickSpy,
    });

    const button = getByText('Okay');
    expect(button).toBeVisible();

    fireEvent.click(button);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  test('fires `onClose` on cancel', () => {
    const clickSpy = jest.fn();

    const { getByText } = renderModal({
      open: true,
      onClose: clickSpy,
    });

    const button = getByText('Cancel');
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
      const { getByLabelText, getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      const x = getByLabelText('Close modal');
      fireEvent.click(x);

      await waitForElementToBeRemoved(modal);
    });
  });
});
