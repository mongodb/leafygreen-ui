import {
  ComponentPropsWithRef,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';
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
  White: 'white',
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];

export interface ChipProps
  extends ComponentPropsWithRef<'span'>,
    DarkModeProps {
  /**
   * Label rendered in the chip
   */
  label: ReactNode;

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
  onDismiss?: MouseEventHandler<HTMLButtonElement>;

  /**
   * aria-label for the dismiss button.
   */
  dismissButtonAriaLabel?: string;

  /**
   * An icon glyph rendered before the text.
   * To use a custom icon, see {@link Icon} {@link https://github.com/mongodb/leafygreen-ui/blob/main/packages/icon/README.md#usage-registering-custom-icon-sets | createIconComponent} docs
   * @type Leafygreen <Icon /> Component
   */
  glyph?: ReactElement;

  /**
   * When true, tooltip will always appear on hover regardless of truncation.
   * When false or undefined, tooltip only appears when label is truncated.
   * @default false
   */
  enableAlwaysShowTooltip?: boolean;

  /**
   * Optional function that formats the tooltip content.
   * When provided, the formatted content will be used instead of the raw label
   * in the tooltip. Works with both truncated and always-visible tooltips.
   * @param label - The current label value
   * @returns ReactNode to display in the tooltip
   */
  formatTooltip?: (label: ReactNode) => ReactNode;
}
