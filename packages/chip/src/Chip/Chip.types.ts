import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export const TruncationLocation = {
  start: 'start',
  middle: 'middle',
  end: 'end',
  none: 'none',
} as const;
export type TruncationLocation =
  (typeof TruncationLocation)[keyof typeof TruncationLocation];

export const Size = {
  Default: 'default',
  Large: 'large',
} as const;
export type Size = (typeof Size)[keyof typeof Size];

export const Variant = {
  Gray: 'gray',
  Blue: 'blue',
  Green: 'green',
  Purple: 'purple',
  Red: 'red',
  Yellow: 'yellow',
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];

export interface ChipProps
  extends HTMLElementProps<'span', never>,
    DarkModeProps {
  /**
   * Label rendered in the chip
   */
  label: React.ReactNode;

  /**
   * Defines where the ellipses will appear in a Chip when the label length exceeds the `chipCharacterLimit`.
   * If `none` is passed, the chip will not truncate.
   * Note: If there is any truncation, the full label text will appear inside a tooltip on hover
   */
  chipTruncationLocation?: TruncationLocation;

  /**
   * Defined the character limit of a multiselect Chip before they start truncating.
   * Note: the three ellipses dots are included in the character limit.
   */
  chipCharacterLimit?: number;

  /**
   * Number that controls the z-index of the tooltip containing the full label text.
   */
  popoverZIndex?: number;

  /**
   * The size of the chip
   * @default 'default'
   */
  size?: Size;

  /**
   * The color of the chip
   * @default 'blue'
   */
  variant?: Variant;

  /**
   * Determines if the chip should be disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback when dismiss button is clicked.
   * If set, a dismiss button will render.
   */
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * aria-label for the dismiss button.
   */
  dismissButtonAriaLabel?: string;
}
