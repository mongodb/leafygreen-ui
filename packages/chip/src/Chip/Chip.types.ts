import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export { BaseFontSize };

export const TruncationLocation = {
  Start: 'start',
  Middle: 'middle',
  End: 'end',
  None: 'none',
} as const;
export type TruncationLocation =
  (typeof TruncationLocation)[keyof typeof TruncationLocation];

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
   * Defines the character limit of a Chip before they start truncating.
   * Note: the three ellipses dots are included in the character limit and the chip will only truncate if the chip length is greater than the `chipCharacterLimit`
   */
  chipCharacterLimit?: number;

  /**
   * Number that controls the z-index of the tooltip containing the full label text.
   */
  popoverZIndex?: number;

  /**
   * Determines the base font-size of the component
   *
   * @default 13
   */
  baseFontSize?: BaseFontSize;

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
