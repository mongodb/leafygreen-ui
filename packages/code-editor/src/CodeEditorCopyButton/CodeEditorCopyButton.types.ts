import { ComponentPropsWithoutRef } from 'react';

export const CopyButtonVariant = {
  IconButton: 'icon-button',
  Button: 'button',
} as const;
export type CopyButtonVariant =
  (typeof CopyButtonVariant)[keyof typeof CopyButtonVariant];

/**
 * Props for the CodeEditorCopyButton component.
 * Extends button props while providing custom copy functionality.
 */
export interface CodeEditorCopyButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'onCopy'> {
  /**
   * Callback function called after successful copy operation.
   * Optional - if not provided, only the visual feedback will be shown.
   */
  onCopy?: () => void;

  /**
   * Function that returns the content to be copied to the clipboard.
   * This function is called when the copy button is clicked.
   */
  getContents: () => string;

  /**
   * The variant of the button to render.
   * @default CopyButtonVariant.IconButton
   */
  variant?: CopyButtonVariant;

  /**
   * Whether to render the button as an icon-only variant for use in panels.
   * When true, renders as an IconButton; when false, renders as a Button with text.
   *
   * @default false
   */
  isPanelVariant?: boolean;
}
