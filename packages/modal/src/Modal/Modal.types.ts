import React, { SetStateAction } from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

import { CloseIconColorProp } from '../shared.types';

export const ModalSize = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type ModalSize = (typeof ModalSize)[keyof typeof ModalSize];

export interface ModalProps
  extends React.ComponentPropsWithoutRef<'dialog'>,
    DarkModeProps,
    LgIdProps,
    CloseIconColorProp {
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
   * @default 'default'
   */
  size?: ModalSize;

  /**
   * Callback to change the open state of the Modal.
   * @default () => {}
   */
  setOpen?: (open: boolean) => void | React.Dispatch<SetStateAction<boolean>>;

  /**
   * Callback to determine whether or not Modal should close when user tries to close it.
   * @default () => true
   */
  shouldClose?: () => boolean;

  /**
   * @deprecated Use CSS `::backdrop` pseudo-element instead. This prop will be removed in a future version.
   *
   * This prop exists only to ease migration from the previous Modal implementation to Modal v20.
   * The preferred approach is to use the native CSS `::backdrop` pseudo-element for backdrop styling.
   *
   * **Preferred approach:**
   * ```css
   * .my-modal::backdrop {
   *   // custom backdrop styles
   * }
   * ```
   */
  backdropClassName?: string;
}
