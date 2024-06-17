export const svgWidth = 24;
export const paddingLeftWithGlyph = 54;
export const paddingLeftWithoutGlyph = 20;

import { RecursiveRecord, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  InteractionState,
  Property,
  spacing,
  Variant as ColorVariant,
} from '@leafygreen-ui/tokens';

// Menu dark/light mode colors intentionally do not line up with tokens
export const menuColor = {
  [Theme.Light]: {
    [Property.Border]: {
      [InteractionState.Default]: palette.gray.light2,
    },
    [Property.Text]: {
      [InteractionState.Default]: color.light.text.primary.default,
    },
    [Property.Icon]: {
      [InteractionState.Default]: palette.gray.dark1,
    },
    [Property.Background]: {
      [InteractionState.Default]: palette.white,
    },
  },
  [Theme.Dark]: {
    [Property.Background]: {
      [InteractionState.Default]: palette.white,
    },
    [Property.Border]: {
      [InteractionState.Default]: palette.gray.light2,
    },
    [Property.Text]: {
      [InteractionState.Default]: color.light.text.primary.default,
    },
    [Property.Icon]: {
      [InteractionState.Default]: palette.gray.dark1,
    },
  },
} as const satisfies RecursiveRecord<
  [Theme, Property, InteractionState, string]
>;
