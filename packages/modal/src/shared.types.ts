export const CloseIconColor = {
  Default: 'default',
  Dark: 'dark',
  Light: 'light',
} as const;

export type CloseIconColor =
  (typeof CloseIconColor)[keyof typeof CloseIconColor];

export interface CloseIconColorProp {
  /**
   * Determines the color of the close icon.
   * @default 'default'
   */
  closeIconColor?: CloseIconColor;
}
