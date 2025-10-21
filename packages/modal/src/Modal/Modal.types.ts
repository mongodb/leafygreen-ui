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
   * Specifies which element should receive focus when the modal opens.
   *
   * **Options:**
   * - `"auto"`: Automatically focuses the first focusable element in the modal
   * - `string`: CSS selector passed to `querySelector()` to specify an element
   * - `React.RefObject<HTMLElement>`: Reference to the element that should receive focus. This is recommended over using a CSS selector for better type safety.
   * - `null`: Disables automatic focus management. Use sparingly - disabling focus management may create accessibility issues
   *
   * **Priority order:**
   * 1. If `initialFocus` is a selector or ref, that element will be focused
   * 2. If any child element has the `autoFocus` attribute, that element will be focused
   * 3. If `initialFocus` is `"auto"` and no child element has the `autoFocus` attribute, the first focusable element will be focused
   * 4. If `initialFocus` is `null`, no automatic focus will occur
   *
   * @default "auto"
   *
   * @example
   * // Relying on `autoFocus` attribute
   * <Modal>
   *   <button autoFocus>Submit</button>
   * </Modal>
   *
   * @example
   * // Using a ref (recommended over selector)
   * const submitRef = useRef<HTMLButtonElement>(null);
   * <Modal initialFocus={submitRef}>
   *   <button ref={submitRef}>Submit</button>
   * </Modal>
   *
   * @example
   * // Using a selector
   * <Modal initialFocus="#submit-button">
   *   <button id="submit-button">Submit</button>
   * </Modal>
   *
   * @example
   * // Disabling automatic focus
   * <Modal initialFocus={null}>
   *   <CustomEditor />
   * </Modal>
   */
  initialFocus?: 'auto' | string | React.RefObject<HTMLElement> | null;

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
