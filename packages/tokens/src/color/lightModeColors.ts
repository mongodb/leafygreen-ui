import { palette } from '@leafygreen-ui/palette';

import { MapVariantsToStates, State, Variant } from './color.types';

const { black, blue, gray, green, red, white, yellow } = palette;

const lightModeBackgroundColors: MapVariantsToStates = {
  [Variant.Primary]: {
    [State.Default]: white,
    [State.Hover]: gray.light2,
    [State.Focus]: blue.light3,
  },
  [Variant.Secondary]: {
    [State.Default]: gray.light3,
    [State.Hover]: gray.light2,
    [State.Focus]: blue.light3,
  },
  [Variant.Inverse]: {
    [State.Default]: black,
    [State.Hover]: gray.dark3,
    [State.Focus]: blue.dark2,
  },
  [Variant.Info]: {
    [State.Default]: blue.light3,
    [State.Hover]: blue.light3,
    [State.Focus]: blue.light3,
  },
  [Variant.Warning]: {
    [State.Default]: yellow.light3,
    [State.Hover]: yellow.light3,
    [State.Focus]: yellow.light3,
  },
  [Variant.Success]: {
    [State.Default]: green.light3,
    [State.Hover]: green.light3,
    [State.Focus]: green.light3,
  },
  [Variant.Error]: {
    [State.Default]: red.light3,
    [State.Hover]: red.light3,
    [State.Focus]: red.light3,
  },
  [Variant.Disabled]: {
    [State.Default]: gray.light2,
    [State.Hover]: gray.light2,
    [State.Focus]: gray.light2,
  },
};

const lightModBorderColors: MapVariantsToStates = {
  [Variant.Primary]: {
    [State.Default]: gray.base,
    [State.Hover]: gray.base,
    [State.Focus]: blue.light1,
  },
  [Variant.Secondary]: {
    [State.Default]: gray.light2,
    [State.Hover]: gray.light2,
    [State.Focus]: blue.light1,
  },
  [Variant.Success]: {
    [State.Default]: green.dark1,
    [State.Hover]: green.dark1,
    [State.Focus]: blue.light1,
  },
  [Variant.Error]: {
    [State.Default]: red.base,
    [State.Hover]: red.base,
    [State.Focus]: blue.light1,
  },
  [Variant.Disabled]: {
    [State.Default]: gray.light1,
    [State.Hover]: gray.light1,
    [State.Focus]: gray.light1,
  },
};

const lightModeIconColors: MapVariantsToStates = {
  [Variant.Primary]: {
    [State.Default]: gray.dark1,
    [State.Hover]: black,
    [State.Focus]: blue.dark1,
  },
  [Variant.Secondary]: {
    [State.Default]: gray.base,
    [State.Hover]: black,
    [State.Focus]: blue.dark1,
  },
  [Variant.Inverse]: {
    [State.Default]: white,
    [State.Hover]: white,
    [State.Focus]: blue.light2,
  },
  [Variant.Info]: {
    [State.Default]: blue.base,
    [State.Hover]: blue.base,
    [State.Focus]: blue.base,
  },
  [Variant.Warning]: {
    [State.Default]: yellow.dark2,
    [State.Hover]: yellow.dark2,
    [State.Focus]: yellow.dark2,
  },
  [Variant.Success]: {
    [State.Default]: green.dark1,
    [State.Hover]: green.dark1,
    [State.Focus]: green.dark1,
  },
  [Variant.Error]: {
    [State.Default]: red.base,
    [State.Hover]: red.base,
    [State.Focus]: red.base,
  },
  [Variant.Disabled]: {
    [State.Default]: gray.base,
    [State.Hover]: gray.base,
    [State.Focus]: gray.base,
  },
};

export const lightModeTextColors: MapVariantsToStates = {
  [Variant.Primary]: {
    [State.Default]: black,
    [State.Hover]: black,
    [State.Focus]: blue.dark1,
  },
  [Variant.Secondary]: {
    [State.Default]: gray.dark1,
    [State.Hover]: black,
    [State.Focus]: blue.dark1,
  },
  [Variant.InversePrimary]: {
    [State.Default]: white,
    [State.Hover]: white,
    [State.Focus]: blue.light2,
  },
  [Variant.InverseSecondary]: {
    [State.Default]: gray.light1,
    [State.Hover]: white,
    [State.Focus]: blue.light2,
  },
  [Variant.Error]: {
    [State.Default]: red.base,
    [State.Hover]: red.base,
    [State.Focus]: red.base,
  },
  [Variant.Disabled]: {
    [State.Default]: gray.base,
    [State.Hover]: gray.base,
    [State.Focus]: gray.base,
  },
};

export const lightModeColors: Record<Type, MapVariantsToStates> = {
  background: lightModeBackgroundColors,
  border: lightModBorderColors,
  icon: lightModeIconColors,
  text: lightModeTextColors,
};
