
import React, {useRef} from 'react'
import {cx, css} from '@leafygreen-ui/emotion';
import { Transition } from 'react-transition-group';
import Portal from '@leafygreen-ui/portal';

const toastStyle = css`
  position: fixed;
  background-color: red;
  bottom: 0;
  left: 0;
  padding: 10px;
`;

const ToastVariants = {
  success: 'success',
  progress: 'progress',
} as const;

type ToastVariants = typeof ToastVariants[keyof typeof ToastVariants];

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
}: ToastProps) {
  const nodeRef = useRef(null);

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
            role='status'
            ref={nodeRef}
            className={cx(toastStyle, className)}
          >
            {body}
          </div>
        </Portal>
      )}
    </Transition>
  )
}
