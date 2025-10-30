import React, {
  ChangeEventHandler,
  FormEventHandler,
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useRef,
  useState,
} from 'react';
import {
  useLeafyGreenChatContext,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';

import {
  Button,
  Size as ButtonSize,
  Variant as ButtonVariant,
} from '@leafygreen-ui/button';
import { useIdAllocator } from '@leafygreen-ui/hooks';
// @ts-ignore LG icons don't currently support TS
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { consoleOnce } from '@leafygreen-ui/lib';
import TextArea, { State as TextAreaState } from '@leafygreen-ui/text-area';
import { Label } from '@leafygreen-ui/typography';

import { SubmittedState } from './SubmittedState/SubmittedState';
import {
  actionContainerStyles,
  getBodyContainerStyles,
  getFormContainerStyles,
  getHeaderContainerStyles,
  getTextAreaStyles,
  labelStyles,
} from './InlineMessageFeedback.styles';
import { InlineMessageFeedbackProps } from '.';

export const InlineMessageFeedback = forwardRef(
  (
    {
      className,
      label,
      cancelButtonText = 'Cancel',
      onCancel,
      cancelButtonProps,
      submitButtonText = 'Submit',
      submitButtonProps,
      state = 'unset',
      submittedMessage = 'Submitted! Thanks for your feedback.',
      onSubmit: onSubmitProp,
      darkMode: darkModeProp,
      disabledSend = false,
      onClose,
      textareaProps,
      errorMessage = 'Oops, please try again.',
      enableFadeAfterSubmit = false,
      ...rest
    }: InlineMessageFeedbackProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const { variant } = useLeafyGreenChatContext();
    const isCompact = variant === Variant.Compact;

    if (isCompact && (cancelButtonProps || cancelButtonText || onCancel)) {
      consoleOnce.warn(
        `@lg-chat/message-rating: The MessageRating component's props 'cancelButtonProps', 'cancelButtonText', and 'onCancel' are only used in the 'spacious' variant. It will not be rendered in the 'compact' variant set by the provider.`,
      );
    }

    const textareaId = useIdAllocator({ prefix: 'lg-chat-imf-input' });
    const labelId = useIdAllocator({ prefix: 'lg-chat-imf-label' });
    const textareaRef: MutableRefObject<HTMLTextAreaElement | null> =
      useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
      e.preventDefault();
      if (onSubmitProp) {
        try {
          await onSubmitProp(e);
        } catch (_error) {
          // Error handling is delegated to the parent via the `state` prop.
        }
      }
    };

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
      setHasEmptyTextarea(isTextareaEmpty());
      textareaProps?.onChange?.(e);
    };

    const isTextareaEmpty = () =>
      (textareaProps?.value === undefined || textareaProps?.value.length < 1) &&
      (textareaRef?.current?.value === undefined ||
        textareaRef.current?.value.length < 1);

    const [hasEmptyTextarea, setHasEmptyTextarea] = useState<boolean>(
      isTextareaEmpty(),
    );

    const showCancelButton = !isCompact && !!onCancel;
    const isSubmitting = state === 'submitting';
    const isSubmitted = state === 'submitted';
    const isError = state === 'error';

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={className} ref={forwardedRef} {...rest}>
          {isSubmitted ? (
            <SubmittedState
              enableFadeAfterSubmit={enableFadeAfterSubmit}
              submittedMessage={submittedMessage}
            />
          ) : (
            <form
              className={getFormContainerStyles({ isCompact, theme })}
              onSubmit={handleSubmit}
            >
              <div className={getHeaderContainerStyles({ isCompact })}>
                <Label
                  id={labelId}
                  className={labelStyles}
                  htmlFor={textareaId}
                >
                  {label}
                </Label>
                {onClose && (
                  <IconButton
                    aria-label="Close feedback window"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    <XIcon />
                  </IconButton>
                )}
              </div>
              <div className={getBodyContainerStyles({ isCompact })}>
                <TextArea
                  id={textareaId}
                  aria-labelledby={labelId}
                  /* eslint-disable-next-line jsx-a11y/no-autofocus */
                  autoFocus={true}
                  disabled={isSubmitting}
                  {...textareaProps}
                  className={getTextAreaStyles(textareaProps?.className)}
                  errorMessage={errorMessage}
                  state={isError ? TextAreaState.Error : TextAreaState.None}
                  ref={(el: HTMLTextAreaElement) => {
                    if (textareaProps?.ref) {
                      (
                        textareaProps.ref as MutableRefObject<HTMLTextAreaElement>
                      ).current = el;
                    }
                    textareaRef.current = el;
                  }}
                  onChange={handleChange}
                />
                <div className={actionContainerStyles}>
                  {showCancelButton && (
                    <Button
                      type="button"
                      variant={ButtonVariant.Default}
                      size={ButtonSize.Small}
                      onClick={onCancel}
                      disabled={isSubmitting}
                      {...cancelButtonProps}
                    >
                      {cancelButtonText}
                    </Button>
                  )}
                  <Button
                    type="submit"
                    variant={ButtonVariant[isCompact ? 'Default' : 'Primary']}
                    size={ButtonSize[isCompact ? 'Default' : 'Small']}
                    disabled={
                      !!hasEmptyTextarea || isSubmitting || disabledSend
                    }
                    {...submitButtonProps}
                  >
                    {submitButtonText}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

InlineMessageFeedback.displayName = 'InlineMessageFeedback';
