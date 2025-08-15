import { SetStateAction } from 'react';

import { DarkModeProps, HTMLElementProps, LgIdProps } from '@leafygreen-ui/lib';

import { CloseIconColorProp } from '../shared.types';

export const ModalSize = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type ModalSize = (typeof ModalSize)[keyof typeof ModalSize];

/**
 * TODO: determine where to place this comment or if necessary
 *
 * Props for the Modal component.
 *
 * **className**: Applied to the modal dialog element (content area).
 * For backdrop styling, use CSS `::backdrop` pseudo-element or the deprecated `backdropClassName` prop.
 *
 * @example
 * ```tsx
 * <Modal className="my-modal-content">
 *   <h1>Modal Content</h1>
 * </Modal>
 * ```
 *
 * ```css
 * .my-modal-content {
 *   border-radius: 12px;
 *   padding: 24px;
 * }
 *
 * .my-modal-content::backdrop {
 *   background: rgba(0, 0, 0, 0.8);
 *   backdrop-filter: blur(4px);
 * }
 * ```
 */
export interface ModalProps
  extends HTMLElementProps<'dialog'>,
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
   * @deprecated Use CSS `::backdrop` pseudo-element instead. This prop will be removed in a future version.
   *
   * This prop exists only to ease migration from the previous Modal implementation.
   * The preferred approach is to use the native CSS `::backdrop` pseudo-element for backdrop styling.
   *
   * **Preferred approach:**
   * ```css
   * .my-modal::backdrop {
   *   background-color: rgba(0, 0, 0, 0.8);
   *   backdrop-filter: blur(2px);
   * }
   * ```
   *
   * TODO: update this after codemod written
   * **Automated Migration Available**: Run the LeafyGreen codemod to automatically migrate:
   * ```bash
   * npx @leafygreen-ui/codemod modal-dialog-migration
   * ```
   *
   * @example
   * ```tsx
   * // Temporary migration approach
   * <Modal className="my-modal" backdropClassName="my-backdrop" />
   *
   * // Preferred approach
   * <Modal className="my-modal" />
   * // + CSS: .my-modal::backdrop { background: rgba(0,0,0,0.8); }
   * ```
   */
  backdropClassName?: string;
}
