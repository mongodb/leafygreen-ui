import { SetStateAction } from 'react';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export const CloseIconColor = {
  Default: 'default',
  Dark: 'dark',
  Light: 'light',
} as const;

export type CloseIconColor =
  (typeof CloseIconColor)[keyof typeof CloseIconColor];

export const ModalSize = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type ModalSize = (typeof ModalSize)[keyof typeof ModalSize];

export type ForwardedRef =
  | React.ForwardedRef<HTMLDivElement | null>
  | null
  | undefined;

export interface ModalProps extends HTMLElementProps<'div'>, DarkModeProps {
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
   * Determines the color of the close icon.
   * @default 'default'
   */
  closeIconColor?: CloseIconColor;
}
