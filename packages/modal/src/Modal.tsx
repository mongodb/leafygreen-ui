import React, { SetStateAction } from 'react';
import PropTypes from 'prop-types';

import { PopoverProvider } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { ModalView } from '.';

export const CloseIconColor = {
  Default: 'default',
  Dark: 'dark',
  Light: 'light',
};

export type CloseIconColor = typeof CloseIconColor[keyof typeof CloseIconColor];

export const ModalSize = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type ModalSize = typeof ModalSize[keyof typeof ModalSize];

export interface ModalProps extends HTMLElementProps<'div'> {
  /**
   * Content that will appear inside of the Modal component.
   */
  children: React.ReactNode;

  /**
   * Determines the open state of the modal
   * @default false
   */
  open?: boolean;

  /**
   * Specifies the size of the Modal.
   *
   * @default 'default'
   */
  size?: ModalSize;

  /**
   * Callback to change the open state of the Modal.
   *
   * @default () => {}
   */
  setOpen?: (open: boolean) => void | React.Dispatch<SetStateAction<boolean>>;

  /**
   * Callback to determine whether or not Modal should close when user tries to close it.
   *
   * @default () => true
   */
  shouldClose?: () => boolean;

  /**
   * className applied to overlay div.
   * Disclaimer: This prop may be deprecated in future versions of Modal
   */
  contentClassName?: string;

  /**
   * By default, when a focus trap is activated the first element in the focus trap's tab order will receive focus.
   * With this option you can specify a different element to receive that initial focus.
   * Selector string (which will be passed to document.querySelector() to find the DOM node)
   */
  initialFocus?: string;

  /**
   * Determines if the component will appear in dark mode.
   * @default false
   */
  darkMode?: boolean;

  /**
   * Determines the color of the close icon. Currently will only work if darkMode is set to false.
   * @default 'default'
   */
  closeIconColor?: CloseIconColor;
}

/**
 *
 *  Modals place content on top of main window.
 *
 * @param props.open Boolean to describe whether or not Modal is open.
 * @param props.size String to determine size of Modal. ['small', 'default', 'large']
 * @param props.setOpen Callback to change the open state of Modal.
 * @param props.children Content to appear inside of Modal container.
 * @param props.shouldClose Callback to determine whether or not Modal should close when user tries to close it.
 * @param props.className className applied to container div.
 * @param props.contentClassName className applied to overlay div.
 * @param props.initialFocus By default, when a focus trap is activated the first element in the focus trap's tab order will receive focus. With this option you can specify a different element to receive that initial focus. Selector string (which will be passed to document.querySelector() to find the DOM node).
 * @param props.closeIconColor Choose between dark or light close icon. Default is dark.
 */
function Modal({
  open,
  size,
  setOpen,
  shouldClose,
  darkMode,
  children,
  className,
  contentClassName,
  initialFocus,
  closeIconColor,
  ...rest
}: ModalProps) {
  const props = {
    open,
    size,
    setOpen,
    shouldClose,
    darkMode,
    children,
    className,
    contentClassName,
    initialFocus,
    closeIconColor,
    ...rest,
  };

  return (
    <PopoverProvider>
      <ModalView {...props} />
    </PopoverProvider>
  );
}

Modal.displayName = 'Modal';

Modal.propTypes = {
  open: PropTypes.bool,
  size: PropTypes.string,
  children: PropTypes.node,
  shouldClose: PropTypes.func,
  className: PropTypes.string,
  setOpen: PropTypes.func,
};

export default Modal;
