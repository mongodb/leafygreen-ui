import React, { createRef } from 'react';
import { fireEvent, render } from '@testing-library/react';

import { InlineMessageFeedback } from '.';

const defaultProps = {
  label: 'label test',
  onCancel: jest.fn(),
  submittedMessage: 'was submitted!',
  cancelButtonText: 'cancel the feedback',
  submitButtonText: 'submit the feedback',
} as const;

describe('packages/inline-message-feedback', () => {
  describe('submitted state', () => {
    test('does not render label when isSubmitted is true', () => {
      const { queryByText } = render(
        <InlineMessageFeedback {...defaultProps} isSubmitted={true} />,
      );
      expect(queryByText(defaultProps.label)).not.toBeInTheDocument();
    });
    test('renders submittedMessage when isSubmitted is true', () => {
      const { getByText } = render(
        <InlineMessageFeedback {...defaultProps} isSubmitted={true} />,
      );
      expect(getByText(defaultProps.submittedMessage)).toBeInTheDocument();
    });
    test('does not render submittedMessage when isSubmitted is false', () => {
      const { queryByText } = render(
        <InlineMessageFeedback {...defaultProps} isSubmitted={false} />,
      );
      expect(
        queryByText(defaultProps.submittedMessage),
      ).not.toBeInTheDocument();
    });
  });

  describe('label prop', () => {
    test('renders label', () => {
      const { getByText } = render(<InlineMessageFeedback {...defaultProps} />);
      expect(getByText(defaultProps.label)).toBeInTheDocument();
    });
  });
  describe('cancel button props', () => {
    test('renders cancelButtonText', () => {
      const { container } = render(<InlineMessageFeedback {...defaultProps} />);
      const cancelButton = container.querySelector('button[type="button"]');
      expect(cancelButton).toHaveTextContent(defaultProps.cancelButtonText);
    });
    test('cancel button calls onCancel', () => {
      const { container } = render(<InlineMessageFeedback {...defaultProps} />);
      const cancelButton = container.querySelector('button[type="button"]');
      fireEvent.click(cancelButton!);
      expect(defaultProps.onCancel).toHaveBeenCalled();
    });
  });
  describe('close button props', () => {
    test('does not render close button without onClose', () => {
      const { container } = render(<InlineMessageFeedback {...defaultProps} />);
      const closeButton = container.querySelector(
        `[aria-label='Close feedback window']`,
      );
      expect(closeButton).not.toBeInTheDocument();
    });
    test('renders close button when onClose prop is defined', () => {
      const closeHandler = jest.fn();
      const { container } = render(
        <InlineMessageFeedback {...defaultProps} onClose={closeHandler} />,
      );
      const closeButton = container.querySelector(
        `[aria-label='Close feedback window']`,
      );
      expect(closeButton).toBeInTheDocument();
    });
    test('close button calls onClose', () => {
      const closeHandler = jest.fn();
      const { container } = render(
        <InlineMessageFeedback {...defaultProps} onClose={closeHandler} />,
      );
      const closeButton = container.querySelector(
        `[aria-label='Close feedback window']`,
      );
      fireEvent.click(closeButton!);
      expect(closeHandler).toHaveBeenCalled();
    });
  });
  describe('textarea props', () => {
    // Latest TextArea (v8.0.20) does not pass aria-labelledby correctly, so this is currently not passing
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('is labelled by label by default', () => {
      const { container, getByLabelText } = render(
        <InlineMessageFeedback {...defaultProps} />,
      );
      const textarea = container.querySelector('textarea');
      expect(getByLabelText(defaultProps.label)).toEqual(textarea);
    });
    test('ref is passable to textarea', () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(
        <InlineMessageFeedback {...defaultProps} textareaProps={{ ref }} />,
      );
      expect(ref.current).toBeDefined();
    });
  });
  describe('submit button props', () => {
    test('renders submitButtonText', () => {
      const { container } = render(<InlineMessageFeedback {...defaultProps} />);
      const submitButton = container.querySelector('button[type="submit"]');
      expect(submitButton).toHaveTextContent(defaultProps.submitButtonText);
    });
    test('submit button does not call onSubmit when textarea is empty', () => {
      const { container } = render(<InlineMessageFeedback {...defaultProps} />);
      const submitButton = container.querySelector('button[type="submit"]');
      expect(submitButton!.getAttribute('aria-disabled')).toBe('true');
    });
    test('submit button calls onSubmit when textarea is not empty', () => {
      const { container } = render(
        <InlineMessageFeedback
          {...defaultProps}
          textareaProps={{ value: 'test' }}
        />,
      );
      const submitButton = container.querySelector('button[type="submit"]');
      expect(submitButton!.getAttribute('aria-disabled')).toBe('false');
    });
  });

  test('accepts a ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <InlineMessageFeedback ref={ref} label="test" onCancel={() => {}} />,
    );

    expect(ref.current).toBeDefined();
  });
});
