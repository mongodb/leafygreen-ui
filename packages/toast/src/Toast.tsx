import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import { transparentize } from 'polished';
import { cx, css } from '@leafygreen-ui/emotion';
import Portal from '@leafygreen-ui/portal';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';
import IconButton from '@leafygreen-ui/icon-button';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import XIcon from '@leafygreen-ui/icon/dist/X';

interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return <div>test</div>;
}

const ToastVariants = {
  success: 'success',
  progress: 'progress',
} as const;

type ToastVariants = typeof ToastVariants[keyof typeof ToastVariants];

const baseToastStyle = css`
  position: fixed;
  bottom: ${spacing[6]};
  left: ${spacing[4]};
  display: flex;
  align-items: center;
  width: 400px;
  max-width: calc(100vw - (${spacing[4]} * 2));
  padding: ${spacing[3]};
  border-radius: 4px;
  box-shadow: 0 18px 18px -15px ${transparentize(0.7, uiColors.black)};
`;

const toastVariantStyles: Record<ToastVariants, string> = {
  [ToastVariants.success]: css`
    background-color: ${uiColors.green.light3};
    border: 1px solid ${uiColors.green.light2};
  `,

  [ToastVariants.progress]: css`
    background-color: ${uiColors.green.light3};
    border: 1px solid ${uiColors.green.light2};
  `,
};

const baseIconStyle = css`
  flex-shrink: 0;
  margin-right: ${spacing[3]};
`;

const iconVariantStyles: Record<ToastVariants, string> = {
  [ToastVariants.success]: css`
    color: ${uiColors.green.base};
  `,

  [ToastVariants.progress]: css`
    color: ${uiColors.gray.dark2};
  `,
};

const bodyVariantStyles: Record<ToastVariants, string> = {
  [ToastVariants.success]: css`
    color: ${uiColors.green.dark2};
  `,

  [ToastVariants.progress]: css`
    color: ${uiColors.gray.dark2};
  `,
};

interface ToastProps {
  title?: React.ReactNode;
  body: React.ReactNode;
  className?: string;
  variant: ToastVariants;
  progress?: number;
  open?: boolean;
  close?: React.MouseEventHandler;
}

export default function Toast({
  title,
  body,
  className,
  variant,
  progress = 1,
  open = false,
  close,
}: ToastProps) {
  const nodeRef = useRef(null);
  const dismissible = !!close;

  return (
    <Transition
      in={open}
      timeout={150}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      {(state: string) => (
        <Portal>
          <div
            role="status"
            ref={nodeRef}
            className={cx(baseToastStyle, toastVariantStyles[variant], className)}
          >
            <CheckmarkWithCircleIcon className={cx(baseIconStyle, iconVariantStyles[variant])} size={30} />

            <Body className={bodyVariantStyles[variant]}>{body}</Body>

            {dismissible && (
              <IconButton aria-label="Close">
                <XIcon />
              </IconButton>
            )}

            {variant === ToastVariants.progress && (
              <ProgressBar progress={progress} />
            )}
          </div>
        </Portal>
      )}
    </Transition>
  );
}
