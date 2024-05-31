import { palette } from '@leafygreen-ui/palette';

import {
  InteractionState,
  type PropertyColorRecord,
  Variant,
  type VariantColorRecord,
} from './color.types';

const { black, blue, gray, green, red, white, yellow } = palette;

const darkModeBackgroundColors = {
  [Variant.Primary]: {
    [InteractionState.Default]: black,
    [InteractionState.Hover]: gray.dark2,
    [InteractionState.Focus]: blue.dark3,
  },
  [Variant.Secondary]: {
    [InteractionState.Default]: gray.dark4,
    [InteractionState.Hover]: gray.dark2,
    [InteractionState.Focus]: blue.dark3,
  },
  [Variant.InversePrimary]: {
    [InteractionState.Default]: gray.light2,
    [InteractionState.Hover]: gray.light3,
    [InteractionState.Focus]: blue.light2,
  },
  [Variant.Info]: {
    [InteractionState.Default]: blue.dark3,
    [InteractionState.Hover]: blue.dark3,
    [InteractionState.Focus]: blue.dark3,
  },
  [Variant.Warning]: {
    [InteractionState.Default]: yellow.dark3,
    [InteractionState.Hover]: yellow.dark3,
    [InteractionState.Focus]: yellow.dark3,
  },
  [Variant.Success]: {
    [InteractionState.Default]: green.dark3,
    [InteractionState.Hover]: green.dark3,
    [InteractionState.Focus]: green.dark3,
  },
  [Variant.Error]: {
    [InteractionState.Default]: red.dark3,
    [InteractionState.Hover]: red.dark3,
    [InteractionState.Focus]: red.dark3,
  },
  [Variant.Disabled]: {
    [InteractionState.Default]: gray.dark3,
    [InteractionState.Hover]: gray.dark3,
    [InteractionState.Focus]: gray.dark3,
  },
} as const satisfies VariantColorRecord;

const darkModeBorderColors = {
  [Variant.Primary]: {
    [InteractionState.Default]: gray.base,
    [InteractionState.Hover]: gray.base,
    [InteractionState.Focus]: blue.light1,
  },
  [Variant.Secondary]: {
    [InteractionState.Default]: gray.dark2,
    [InteractionState.Hover]: gray.dark2,
    [InteractionState.Focus]: blue.light1,
  },
  [Variant.Success]: {
    [InteractionState.Default]: green.dark1,
    [InteractionState.Hover]: green.dark1,
    [InteractionState.Focus]: blue.light1,
  },
  [Variant.Error]: {
    [InteractionState.Default]: red.light1,
    [InteractionState.Hover]: red.light1,
    [InteractionState.Focus]: blue.light1,
  },
  [Variant.Disabled]: {
    [InteractionState.Default]: gray.dark2,
    [InteractionState.Hover]: gray.dark2,
    [InteractionState.Focus]: gray.dark2,
  },
} as const satisfies VariantColorRecord;

const darkModeIconColors = {
  [Variant.Primary]: {
    [InteractionState.Default]: gray.light1,
    [InteractionState.Hover]: gray.light3,
    [InteractionState.Focus]: blue.light3,
  },
  [Variant.Secondary]: {
    [InteractionState.Default]: gray.base,
    [InteractionState.Hover]: gray.light3,
    [InteractionState.Focus]: blue.light3,
  },
  [Variant.InversePrimary]: {
    [InteractionState.Default]: white,
    [InteractionState.Hover]: black,
    [InteractionState.Focus]: blue.dark2,
  },
  [Variant.Info]: {
    [InteractionState.Default]: blue.light1,
    [InteractionState.Hover]: blue.light1,
    [InteractionState.Focus]: blue.light1,
  },
  [Variant.Warning]: {
    [InteractionState.Default]: yellow.base,
    [InteractionState.Hover]: yellow.base,
    [InteractionState.Focus]: yellow.base,
  },
  [Variant.Success]: {
    [InteractionState.Default]: green.base,
    [InteractionState.Hover]: green.base,
    [InteractionState.Focus]: green.base,
  },
  [Variant.Error]: {
    [InteractionState.Default]: red.light1,
    [InteractionState.Hover]: red.light1,
    [InteractionState.Focus]: red.light1,
  },
  [Variant.Disabled]: {
    [InteractionState.Default]: gray.dark1,
    [InteractionState.Hover]: gray.dark1,
    [InteractionState.Focus]: gray.dark1,
  },
} as const satisfies VariantColorRecord;

const darkModeTextColors = {
  [Variant.Primary]: {
    [InteractionState.Default]: gray.light2,
    [InteractionState.Hover]: gray.light2,
    [InteractionState.Focus]: blue.light3,
  },
  [Variant.Placeholder]: {
    [InteractionState.Default]: gray.dark1,
    [InteractionState.Hover]: gray.dark1,
    [InteractionState.Focus]: gray.dark1,
  },
  [Variant.Secondary]: {
    [InteractionState.Default]: gray.light1,
    [InteractionState.Hover]: gray.light2,
    [InteractionState.Focus]: blue.light3,
  },
  [Variant.InversePrimary]: {
    [InteractionState.Default]: black,
    [InteractionState.Hover]: black,
    [InteractionState.Focus]: blue.dark2,
  },
  [Variant.InverseSecondary]: {
    [InteractionState.Default]: gray.dark2,
    [InteractionState.Hover]: black,
    [InteractionState.Focus]: blue.dark2,
  },
  [Variant.Error]: {
    [InteractionState.Default]: red.light1,
    [InteractionState.Hover]: red.light1,
    [InteractionState.Focus]: red.light1,
  },
  [Variant.Disabled]: {
    [InteractionState.Default]: gray.dark1,
    [InteractionState.Hover]: gray.dark1,
    [InteractionState.Focus]: gray.dark1,
  },
  [Variant.Link]: {
    [InteractionState.Default]: blue.light1,
    [InteractionState.Hover]: blue.light1,
    [InteractionState.Focus]: blue.light1,
  },
} as const satisfies VariantColorRecord;

export const darkModeColors = {
  background: darkModeBackgroundColors,
  border: darkModeBorderColors,
  icon: darkModeIconColors,
  text: darkModeTextColors,
} as const satisfies PropertyColorRecord;
