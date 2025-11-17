import React, { createRef } from 'react';
import { act, render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  FormState,
  InlineMessageFeedback,
  InlineMessageFeedbackProps,
} from '.';

const defaultProps = {
  label: 'label test',
  submittedMessage: 'was submitted!',
  submitButtonText: 'submit the feedback',
} as const;

const renderInlineMessageFeedback = (
  props: Partial<InlineMessageFeedbackProps> = {},
): RenderResult => {
  return render(<InlineMessageFeedback {...defaultProps} {...props} />);
};

describe('packages/inline-message-feedback', () => {
  describe('state prop', () => {
    describe('submitted state', () => {
      test('does not render label when state is submitted', () => {
        const { queryByText } = render(
          <InlineMessageFeedback
            {...defaultProps}
            state={FormState.Submitted}
          />,
        );
        expect(queryByText(defaultProps.label)).not.toBeInTheDocument();
      });

      test('renders submittedMessage when state is submitted', () => {
        const { getByText } = render(
          <InlineMessageFeedback
            {...defaultProps}
            state={FormState.Submitted}
          />,
        );
        expect(getByText(defaultProps.submittedMessage)).toBeInTheDocument();
      });

      test('does not render submittedMessage when state is not submitted', () => {
        const { queryByText } = render(
          <InlineMessageFeedback {...defaultProps} state={FormState.Unset} />,
        );
        expect(
          queryByText(defaultProps.submittedMessage),
        ).not.toBeInTheDocument();
      });

      describe('enableFadeAfterSubmit prop', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(() => {
          jest.useRealTimers();
        });

        const fadeOutDelay = 3000;
        const transitionDuration = 300;

        test('does not fade when enableFadeAfterSubmit is false', () => {
          renderInlineMessageFeedback({
            state: FormState.Submitted,
            enableFadeAfterSubmit: false,
          });

          const submittedStateElement = screen.getByText(
            defaultProps.submittedMessage,
          );
          expect(submittedStateElement).toBeVisible();

          act(() =>
            jest.advanceTimersByTime(fadeOutDelay + transitionDuration),
          );

          const maybeSubmittedStateElement = screen.getByText(
            defaultProps.submittedMessage,
          );
          expect(maybeSubmittedStateElement).toBeVisible();
        });

        test('fades out when enableFadeAfterSubmit is true', () => {
          renderInlineMessageFeedback({
            state: FormState.Submitted,
            enableFadeAfterSubmit: true,
          });

          const submittedStateElement = screen.getByText(
            defaultProps.submittedMessage,
          );
          expect(submittedStateElement).toBeVisible();

          act(() =>
            jest.advanceTimersByTime(fadeOutDelay + transitionDuration),
          );

          expect(submittedStateElement).not.toBeVisible();
        });
      });
    });

    describe('submitting state', () => {
      test('disables form elements when state is submitting', () => {
        const { container } = render(
          <InlineMessageFeedback
            {...defaultProps}
            state={FormState.Submitting}
          />,
        );

        const textarea = container.querySelector('textarea');
        const submitButton = container.querySelector('button[type="submit"]');

        expect(textarea).toHaveAttribute('aria-disabled', 'true');
        expect(submitButton).toHaveAttribute('aria-disabled', 'true');
      });

      test('disables form elements when disabledSend prop is true', () => {
        const { container } = render(
          <InlineMessageFeedback {...defaultProps} disabledSend={true} />,
        );

        const submitButton = container.querySelector('button[type="submit"]');
        expect(submitButton).toHaveAttribute('aria-disabled', 'true');
      });
    });

    describe('error state', () => {
      test('shows error message when state is error', () => {
        const errorMessage = 'Something went wrong';
        const { getByText } = render(
          <InlineMessageFeedback
            {...defaultProps}
            state={FormState.Error}
            errorMessage={errorMessage}
          />,
        );

        expect(getByText(errorMessage)).toBeInTheDocument();
      });
    });

    describe('unset state', () => {
      test('renders form normally when state is unset', () => {
        const { getByText, container } = render(
          <InlineMessageFeedback {...defaultProps} state={FormState.Unset} />,
        );

        expect(getByText(defaultProps.label)).toBeInTheDocument();
        expect(container.querySelector('form')).toBeInTheDocument();
        expect(container.querySelector('textarea')).toBeInTheDocument();
      });
    });
  });

  describe('label prop', () => {
    test('renders label', () => {
      const { getByText } = renderInlineMessageFeedback();
      expect(getByText(defaultProps.label)).toBeInTheDocument();
    });
  });

  describe('close button props', () => {
    test('does not render close button without onClose', () => {
      const { container } = renderInlineMessageFeedback();
      const closeButton = container.querySelector(
        `[aria-label='Close feedback window']`,
      );
      expect(closeButton).not.toBeInTheDocument();
    });

    test('renders close button when onClose prop is defined', () => {
      const closeHandler = jest.fn();
      const { container } = renderInlineMessageFeedback({
        onClose: closeHandler,
      });
      const closeButton = container.querySelector(
        `[aria-label='Close feedback window']`,
      );
      expect(closeButton).toBeInTheDocument();
    });

    test('close button calls onClose', () => {
      const closeHandler = jest.fn();
      const { container } = renderInlineMessageFeedback({
        onClose: closeHandler,
      });
      const closeButton = container.querySelector(
        `[aria-label='Close feedback window']`,
      );
      userEvent.click(closeButton!);
      expect(closeHandler).toHaveBeenCalled();
    });
  });

  describe('textarea props', () => {
    test('is labelled by label by default', () => {
      const { container, getByText } = renderInlineMessageFeedback();
      const textarea = container.querySelector('textarea');
      const label = getByText(defaultProps.label);
      expect(textarea).toHaveAttribute('aria-labelledby', label.id);
    });

    test('ref is passable to textarea', () => {
      const ref = createRef<HTMLTextAreaElement>();
      renderInlineMessageFeedback({ textareaProps: { ref } });
      expect(ref.current).toBeDefined();
    });
  });

  describe('submit button props', () => {
    test('renders submitButtonText', () => {
      const { container } = renderInlineMessageFeedback();
      const submitButton = container.querySelector('button[type="submit"]');
      expect(submitButton).toHaveTextContent(defaultProps.submitButtonText);
    });

    test('submit button does not call onSubmit when textarea is empty', () => {
      const { container } = renderInlineMessageFeedback();
      const submitButton = container.querySelector('button[type="submit"]');
      expect(submitButton!.getAttribute('aria-disabled')).toBe('true');
    });

    test('submit button calls onSubmit when textarea is not empty', () => {
      const { container } = renderInlineMessageFeedback({
        textareaProps: { value: 'test' },
      });
      const submitButton = container.querySelector('button[type="submit"]');
      expect(submitButton!.getAttribute('aria-disabled')).toBe('false');
    });
  });

  test('accepts a ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<InlineMessageFeedback ref={ref} {...defaultProps} />);

    expect(ref.current).toBeDefined();
  });
});
