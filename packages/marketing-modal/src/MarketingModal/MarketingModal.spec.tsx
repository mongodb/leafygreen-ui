import React, { useState } from 'react';
import {
  act,
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { axe } from 'jest-axe';

import MarketingModal from '..';

const WrappedModal = ({
  open: initialOpen,
  ...props
}: Partial<React.ComponentProps<typeof MarketingModal>>) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <MarketingModal
      title="Title text"
      buttonText="Button action"
      linkText="Link action"
      open={open}
      onButtonClick={() => setOpen(false)}
      onClose={() => setOpen(false)}
      onLinkClick={() => setOpen(false)}
      graphic={<img alt="" src="" aria-label="Image graphic" />}
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

describe('packages/marketing-modal', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container, getByText } = renderModal({ open: true });
      const results = await axe(container);
      expect(results).toHaveNoViolations();

      let newResults = null as any;
      act(() => void fireEvent.click(getByText('Button action')));
      await act(async () => {
        newResults = await axe(container);
      });
      expect(newResults).toHaveNoViolations();
    });
  });
  test('does not render if closed', () => {
    renderModal();
    expect(document.body.innerHTML).toEqual('<div></div>');
  });

  test('renders if open', () => {
    const { getByText, getByLabelText } = renderModal({ open: true });
    expect(getByLabelText('Image graphic')).toBeVisible();
    expect(getByText('Title text')).toBeVisible();
    expect(getByText('Content text')).toBeVisible();
    expect(getByText('Button action')).toBeVisible();
    expect(getByText('Link action')).toBeVisible();
  });

  test('fires `onButtonClick` when button is clicked', () => {
    const buttonClickSpy = jest.fn();
    const linkClickSpy = jest.fn();
    const closeSpy = jest.fn();

    const { getByText } = renderModal({
      open: true,
      onButtonClick: buttonClickSpy,
      onLinkClick: linkClickSpy,
      onClose: closeSpy,
    });

    const button = getByText('Button action');
    expect(button).toBeVisible();

    fireEvent.click(button);
    expect(buttonClickSpy).toHaveBeenCalledTimes(1);
    expect(linkClickSpy).not.toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalled();
  });

  test('fires `onLinkClick` when link is clicked', () => {
    const buttonClickSpy = jest.fn();
    const linkClickSpy = jest.fn();
    const closeSpy = jest.fn();

    const { getByText } = renderModal({
      open: true,
      onButtonClick: buttonClickSpy,
      onLinkClick: linkClickSpy,
      onClose: closeSpy,
    });

    const button = getByText('Link action');
    expect(button).toBeVisible();

    fireEvent.click(button);
    expect(buttonClickSpy).not.toHaveBeenCalled();
    expect(linkClickSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).not.toHaveBeenCalled();
  });

  describe('closes when', () => {
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

  test('renders blob when `showBlob` is true', () => {
    const { getByTestId } = renderModal({
      open: true,
      showBlob: true,
    });

    expect(getByTestId('svg-blob')).toBeVisible();
  });
});
