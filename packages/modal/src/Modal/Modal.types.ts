import { SetStateAction } from 'react';

import { DarkModeProps, HTMLElementProps, LgIdProps } from '@leafygreen-ui/lib';

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
  | React.ForwardedRef<HTMLDialogElement | null>
  | null
  | undefined;

export interface ModalProps
  extends HTMLElementProps<'dialog'>,
    DarkModeProps,
    LgIdProps {
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
   * Determines the color of the close icon.
   * @default 'default'
   */
  closeIconColor?: CloseIconColor;

  /**
   * Allows consuming applications to portal components inside the dialog element
   */
  portalRef?: React.MutableRefObject<HTMLDivElement | null>;
}
