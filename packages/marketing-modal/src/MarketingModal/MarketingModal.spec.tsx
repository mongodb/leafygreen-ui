import React, { useState } from 'react';
import { act, render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import MarketingModal from '..';

const WrappedModal = ({
  open: initialOpen,
  buttonProps: buttonPropsProp,
  ...props
}: Partial<React.ComponentProps<typeof MarketingModal>>) => {
  const [open, setOpen] = useState(initialOpen);

  const defaultButtonProps = Object.freeze({
    children: 'Button action',
    onClick: () => setOpen(false),
  });
  const buttonProps = buttonPropsProp ? buttonPropsProp : defaultButtonProps;

  return (
    <MarketingModal
      title="Title text"
      buttonProps={buttonProps}
      linkText="Link action"
      open={open}
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
      act(() => void userEvent.click(getByText('Button action')));
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

  describe('buttonProps', () => {
    test('fires `onClick` when button is clicked', () => {
      const buttonClickSpy = jest.fn();

      const { getByText } = renderModal({
        open: true,
        buttonProps: {
          children: 'Custom button text',
          onClick: buttonClickSpy,
        },
      });

      const button = getByText('Custom button text');
      expect(button).toBeVisible();

      userEvent.click(button);
      expect(buttonClickSpy).toHaveBeenCalledTimes(1);
    });

    test('renders custom button text', () => {
      const { getByText } = renderModal({
        open: true,
        buttonProps: {
          children: 'custom button text',
        },
      });

      expect(getByText('custom button text')).toBeVisible();
    });
  });

  test('fires `onLinkClick` when link is clicked', () => {
    const linkClickSpy = jest.fn();
    const closeSpy = jest.fn();

    const { getByText } = renderModal({
      open: true,
      onLinkClick: linkClickSpy,
      onClose: closeSpy,
    });

    const button = getByText('Link action');
    expect(button).toBeVisible();

    userEvent.click(button);
    expect(linkClickSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).not.toHaveBeenCalled();
  });

  describe('closes when', () => {
    test('escape key is pressed', async () => {
      const { getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      userEvent.keyboard('{Escape}');

      await waitForElementToBeRemoved(modal);
    });

    test('x icon is clicked', async () => {
      const { getByLabelText, getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      const x = getByLabelText('Close modal');
      userEvent.click(x);

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
