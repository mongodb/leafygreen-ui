import { palette } from '@leafygreen-ui/palette';

import {
  InteractionState,
  type PropertyColorRecord,
  Variant,
  type VariantColorRecord,
} from './color.types';

const { black, blue, gray, green, red, white, yellow } = palette;

const lightModeBackgroundColors = {
  [Variant.Primary]: {
    [InteractionState.Default]: white,
    [InteractionState.Hover]: gray.light2,
    [InteractionState.Focus]: blue.light3,
  },
  [Variant.Secondary]: {
    [InteractionState.Default]: gray.light3,
    [InteractionState.Hover]: gray.light2,
    [InteractionState.Focus]: blue.light3,
  },
  [Variant.InversePrimary]: {
    [InteractionState.Default]: black,
    [InteractionState.Hover]: gray.dark3,
    [InteractionState.Focus]: blue.dark2,
  },
  [Variant.Info]: {
    [InteractionState.Default]: blue.light3,
    [InteractionState.Hover]: blue.light3,
    [InteractionState.Focus]: blue.light3,
  },
  [Variant.Warning]: {
    [InteractionState.Default]: yellow.light3,
    [InteractionState.Hover]: yellow.light3,
    [InteractionState.Focus]: yellow.light3,
  },
  [Variant.Success]: {
    [InteractionState.Default]: green.light3,
    [InteractionState.Hover]: green.light3,
    [InteractionState.Focus]: green.light3,
  },
  [Variant.Error]: {
    [InteractionState.Default]: red.light3,
    [InteractionState.Hover]: red.light3,
    [InteractionState.Focus]: red.light3,
  },
  [Variant.Disabled]: {
    [InteractionState.Default]: gray.light2,
    [InteractionState.Hover]: gray.light2,
    [InteractionState.Focus]: gray.light2,
  },
} as const satisfies VariantColorRecord;

const lightModeBorderColors = {
  [Variant.Primary]: {
    [InteractionState.Default]: gray.base,
    [InteractionState.Hover]: gray.base,
    [InteractionState.Focus]: blue.light1,
  },
  [Variant.Secondary]: {
    [InteractionState.Default]: gray.light2,
    [InteractionState.Hover]: gray.light2,
    [InteractionState.Focus]: blue.light1,
  },
  [Variant.Tertiary]: {
    [InteractionState.Default]: gray.light1,
    [InteractionState.Hover]: gray.light1,
    [InteractionState.Focus]: blue.light1,
  },
  [Variant.Success]: {
    [InteractionState.Default]: green.dark1,
    [InteractionState.Hover]: green.dark1,
    [InteractionState.Focus]: blue.light1,
  },
  [Variant.Error]: {
    [InteractionState.Default]: red.base,
    [InteractionState.Hover]: red.base,
    [InteractionState.Focus]: blue.light1,
  },
  [Variant.Disabled]: {
    [InteractionState.Default]: gray.light1,
    [InteractionState.Hover]: gray.light1,
    [InteractionState.Focus]: gray.light1,
  },
  [Variant.OnSuccess]: {
    [InteractionState.Default]: green.light2,
    [InteractionState.Hover]: green.light2,
    [InteractionState.Focus]: green.light2,
  },
  [Variant.OnError]: {
    [InteractionState.Default]: red.light2,
    [InteractionState.Hover]: red.light2,
    [InteractionState.Focus]: red.light2,
  },
} as const satisfies VariantColorRecord;

const lightModeIconColors = {
  [Variant.Primary]: {
    [InteractionState.Default]: gray.dark1,
    [InteractionState.Hover]: black,
    [InteractionState.Focus]: blue.dark1,
  },
  [Variant.Secondary]: {
    [InteractionState.Default]: gray.base,
    [InteractionState.Hover]: black,
    [InteractionState.Focus]: blue.dark1,
  },
  [Variant.InversePrimary]: {
    [InteractionState.Default]: white,
    [InteractionState.Hover]: white,
    [InteractionState.Focus]: blue.light2,
  },
  [Variant.Info]: {
    [InteractionState.Default]: blue.base,
    [InteractionState.Hover]: blue.base,
    [InteractionState.Focus]: blue.base,
  },
  [Variant.Warning]: {
    [InteractionState.Default]: yellow.dark2,
    [InteractionState.Hover]: yellow.dark2,
    [InteractionState.Focus]: yellow.dark2,
  },
  [Variant.Success]: {
    [InteractionState.Default]: green.dark1,
    [InteractionState.Hover]: green.dark1,
    [InteractionState.Focus]: green.dark1,
  },
  [Variant.Error]: {
    [InteractionState.Default]: red.base,
    [InteractionState.Hover]: red.base,
    [InteractionState.Focus]: red.base,
  },
  [Variant.Disabled]: {
    [InteractionState.Default]: gray.base,
    [InteractionState.Hover]: gray.base,
    [InteractionState.Focus]: gray.base,
  },
} as const satisfies VariantColorRecord;

const lightModeTextColors = {
  [Variant.Primary]: {
    [InteractionState.Default]: black,
    [InteractionState.Hover]: black,
    [InteractionState.Focus]: blue.dark1,
  },
  [Variant.Secondary]: {
    [InteractionState.Default]: gray.dark1,
    [InteractionState.Hover]: black,
    [InteractionState.Focus]: blue.dark1,
  },
  [Variant.InversePrimary]: {
    [InteractionState.Default]: white,
    [InteractionState.Hover]: white,
    [InteractionState.Focus]: blue.light2,
  },
  [Variant.InverseSecondary]: {
    [InteractionState.Default]: gray.light1,
    [InteractionState.Hover]: white,
    [InteractionState.Focus]: blue.light2,
  },
  [Variant.Disabled]: {
    [InteractionState.Default]: gray.base,
    [InteractionState.Hover]: gray.base,
    [InteractionState.Focus]: gray.base,
  },
  [Variant.Success]: {
    [InteractionState.Default]: green.dark2,
    [InteractionState.Hover]: green.dark2,
    [InteractionState.Focus]: green.dark2,
  },
  [Variant.Error]: {
    [InteractionState.Default]: red.base,
    [InteractionState.Hover]: red.base,
    [InteractionState.Focus]: red.base,
  },
  [Variant.Placeholder]: {
    [InteractionState.Default]: gray.dark1,
    [InteractionState.Hover]: gray.dark1,
    [InteractionState.Focus]: gray.dark1,
  },
  [Variant.OnSuccess]: {
    [InteractionState.Default]: green.dark2,
    [InteractionState.Hover]: green.dark2,
    [InteractionState.Focus]: green.dark2,
  },
  [Variant.OnSuccessLink]: {
    [InteractionState.Default]: green.dark3,
    [InteractionState.Hover]: green.dark3,
    [InteractionState.Focus]: green.dark3,
  },
  [Variant.OnError]: {
    [InteractionState.Default]: red.dark2,
    [InteractionState.Hover]: red.dark2,
    [InteractionState.Focus]: red.dark2,
  },
  [Variant.Link]: {
    [InteractionState.Default]: blue.base,
    [InteractionState.Hover]: blue.base,
    [InteractionState.Focus]: blue.base,
  },
} as const satisfies VariantColorRecord;

export const lightModeColors = {
  background: lightModeBackgroundColors,
  border: lightModeBorderColors,
  icon: lightModeIconColors,
  text: lightModeTextColors,
} as const satisfies PropertyColorRecord;
