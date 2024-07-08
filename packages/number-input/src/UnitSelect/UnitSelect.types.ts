import {
  PopoverProps as ImportedPopoverProps,
  PortalControlProps,
} from '@leafygreen-ui/popover';

import { Size, UnitOption } from '../NumberInput/NumberInput.types';

export type PopoverProps = PortalControlProps &
  Pick<ImportedPopoverProps, 'popoverZIndex'>;

export type UnitSelectProps = {
  /**
   * Id for the select component.
   */
  id?: string;

  /**
   * The controlled value of the select input.
   */
  unit: string;

  /**
   * The options that appear in the select input.
   */
  unitOptions: Array<UnitOption>;

  /**
   * Callback fired when the unit option changes.
   */
  onChange: (unit: UnitOption) => void;

  /**
   * Determines if the dropdown is disabled.
   */
  disabled: boolean;

  /**
   * Determines the font size and padding.
   *
   * @default 'default'
   */
  size: Size;

  /**
   * The className for the select component.
   */
  className?: string;

  /**
   *
   * @internal
   */
  ['data-testid']?: string;
} & PopoverProps;
