import React, {
  ChangeEventHandler,
  FormEventHandler,
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useRef,
  useState,
} from 'react';

import Button from '@leafygreen-ui/button';
import { useIdAllocator } from '@leafygreen-ui/hooks';
// @ts-ignore LG icons don't currently support TS
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import TextArea from '@leafygreen-ui/text-area';
import { Label } from '@leafygreen-ui/typography';

import { SubmittedState } from './SubmittedState/SubmittedState';
import {
  actionContainerStyles,
  baseStyles,
  labelContainerStyles,
  labelStyles,
  textAreaStyle,
} from './InlineMessageFeedback.styles';
import { InlineMessageFeedbackProps } from '.';

export const InlineMessageFeedback = forwardRef(
  (
    {
      label,
      cancelButtonText = 'Cancel',
      onCancel,
      cancelButtonProps,
      submitButtonText = 'Submit',
      submitButtonProps,
      isSubmitted,
      submittedMessage = 'Submitted! Thanks for your feedback.',
      onSubmit: onSubmitProp,
      darkMode: darkModeProp,
      onClose,
      textareaProps,
    }: InlineMessageFeedbackProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);
    const textareaId = useIdAllocator({ prefix: 'lg-chat-imf-input' });
    const labelId = useIdAllocator({ prefix: 'lg-chat-imf-label' });
    const textareaRef: MutableRefObject<HTMLTextAreaElement | null> =
      useRef<HTMLTextAreaElement>(null);

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
      e.preventDefault();
      onSubmitProp?.(e);
    };

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
      setHasEmptyTextarea(isTextareaEmpty());
      textareaProps?.onChange?.(e);
    };

    const isTextareaEmpty = () =>
      (textareaProps?.value === undefined || textareaProps?.value.length < 1) &&
      (textareaRef?.current?.value === undefined ||
        textareaRef?.current?.value.length < 1);

    const [hasEmptyTextarea, setHasEmptyTextarea] = useState<boolean>(
      isTextareaEmpty(),
    );

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div ref={forwardedRef}>
          {isSubmitted ? (
            <SubmittedState submittedMessage={submittedMessage} />
          ) : (
            <form className={baseStyles} onSubmit={handleSubmit}>
              <div className={labelContainerStyles}>
                {/* @ts-ignore htmlFor not necessary since aria-labelledby is used on TextArea */}
                <Label id={labelId} className={labelStyles}>
                  {label}
                </Label>
                {onClose && (
                  <IconButton
                    aria-label="Close feedback window"
                    onClick={onClose}
                  >
                    <XIcon />
                  </IconButton>
                )}
              </div>
              <TextArea
                id={textareaId}
                aria-labelledby={labelId}
                /* eslint-disable-next-line jsx-a11y/no-autofocus */
                autoFocus={true}
                className={textAreaStyle}
                {...textareaProps}
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
                <Button
                  type="button"
                  variant="default"
                  size="small"
                  onClick={onCancel}
                  {...cancelButtonProps}
                >
                  {cancelButtonText}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="small"
                  disabled={!!hasEmptyTextarea}
                  {...submitButtonProps}
                >
                  {submitButtonText}
                </Button>
              </div>
            </form>
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

InlineMessageFeedback.displayName = 'InlineMessageFeedback';
