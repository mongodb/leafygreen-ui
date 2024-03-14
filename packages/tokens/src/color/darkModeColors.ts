import { palette } from '@leafygreen-ui/palette';

import { State, Variant } from './color.types';

const { black, blue, gray, green, red, white, yellow } = palette;

const darkModeBackgroundColors = {
  [Variant.Primary]: {
    [State.Default]: black,
    [State.Hover]: gray.dark2,
    [State.Focus]: blue.dark3,
  },
  [Variant.Secondary]: {
    [State.Default]: gray.dark4,
    [State.Hover]: gray.dark2,
    [State.Focus]: blue.dark3,
  },
  [Variant.InversePrimary]: {
    [State.Default]: gray.light2,
    [State.Hover]: gray.light3,
    [State.Focus]: blue.light2,
  },
  [Variant.Info]: {
    [State.Default]: blue.dark3,
    [State.Hover]: blue.dark3,
    [State.Focus]: blue.dark3,
  },
  [Variant.Warning]: {
    [State.Default]: yellow.dark3,
    [State.Hover]: yellow.dark3,
    [State.Focus]: yellow.dark3,
  },
  [Variant.Success]: {
    [State.Default]: green.dark3,
    [State.Hover]: green.dark3,
    [State.Focus]: green.dark3,
  },
  [Variant.Error]: {
    [State.Default]: red.dark3,
    [State.Hover]: red.dark3,
    [State.Focus]: red.dark3,
  },
  [Variant.Disabled]: {
    [State.Default]: gray.dark2,
    [State.Hover]: gray.dark2,
    [State.Focus]: gray.dark2,
  },
};

const darkModeBorderColors = {
  [Variant.Primary]: {
    [State.Default]: gray.base,
    [State.Hover]: gray.base,
    [State.Focus]: blue.light1,
  },
  [Variant.Secondary]: {
    [State.Default]: gray.dark2,
    [State.Hover]: gray.dark2,
    [State.Focus]: blue.light1,
  },
  [Variant.Success]: {
    [State.Default]: green.dark1,
    [State.Hover]: green.dark1,
    [State.Focus]: blue.light1,
  },
  [Variant.Error]: {
    [State.Default]: red.light1,
    [State.Hover]: red.light1,
    [State.Focus]: blue.light1,
  },
  [Variant.Disabled]: {
    [State.Default]: gray.dark2,
    [State.Hover]: gray.dark2,
    [State.Focus]: gray.dark2,
  },
};

const darkModeIconColors = {
  [Variant.Primary]: {
    [State.Default]: gray.light1,
    [State.Hover]: gray.light3,
    [State.Focus]: blue.light3,
  },
  [Variant.Secondary]: {
    [State.Default]: gray.base,
    [State.Hover]: gray.light3,
    [State.Focus]: blue.light3,
  },
  [Variant.InversePrimary]: {
    [State.Default]: white,
    [State.Hover]: black,
    [State.Focus]: blue.dark2,
  },
  [Variant.Info]: {
    [State.Default]: blue.light1,
    [State.Hover]: blue.light1,
    [State.Focus]: blue.light1,
  },
  [Variant.Warning]: {
    [State.Default]: yellow.base,
    [State.Hover]: yellow.base,
    [State.Focus]: yellow.base,
  },
  [Variant.Success]: {
    [State.Default]: green.base,
    [State.Hover]: green.base,
    [State.Focus]: green.base,
  },
  [Variant.Error]: {
    [State.Default]: red.light1,
    [State.Hover]: red.light1,
    [State.Focus]: red.light1,
  },
  [Variant.Disabled]: {
    [State.Default]: gray.dark1,
    [State.Hover]: gray.dark1,
    [State.Focus]: gray.dark1,
  },
};

export const darkModeTextColors = {
  [Variant.Primary]: {
    [State.Default]: gray.light2,
    [State.Hover]: gray.light2,
    [State.Focus]: blue.light3,
  },
  [Variant.Secondary]: {
    [State.Default]: gray.light1,
    [State.Hover]: gray.light2,
    [State.Focus]: blue.light3,
  },
  [Variant.InversePrimary]: {
    [State.Default]: black,
    [State.Hover]: black,
    [State.Focus]: blue.dark2,
  },
  [Variant.InverseSecondary]: {
    [State.Default]: gray.dark2,
    [State.Hover]: black,
    [State.Focus]: blue.dark2,
  },
  [Variant.Error]: {
    [State.Default]: red.light1,
    [State.Hover]: red.light1,
    [State.Focus]: red.light1,
  },
  [Variant.Disabled]: {
    [State.Default]: gray.dark1,
    [State.Hover]: gray.dark1,
    [State.Focus]: gray.dark1,
  },
};

export const darkModeColors = {
  background: darkModeBackgroundColors,
  border: darkModeBorderColors,
  icon: darkModeIconColors,
  text: darkModeTextColors,
};
