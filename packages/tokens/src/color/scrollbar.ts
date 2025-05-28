import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { InteractionState, Variant } from './color.types';
const { black, gray, white } = palette;

export const ScrollbarProperty = {
  Thumb: 'thumb',
  Track: 'track',
} as const;
type ScrollbarProperty =
  (typeof ScrollbarProperty)[keyof typeof ScrollbarProperty];

export interface ScrollbarColorRecord {
  [ScrollbarProperty.Thumb]: {
    [Variant.Primary]: {
      [InteractionState.Default]: string;
    };
    [Variant.Secondary]: {
      [InteractionState.Default]: string;
    };
  };
  [ScrollbarProperty.Track]: {
    [Variant.Primary]: {
      [InteractionState.Default]: string;
    };
    [Variant.Secondary]: {
      [InteractionState.Default]: string;
    };
  };
}

const darkModeScrollbarColors = {
  thumb: {
    [Variant.Primary]: {
      [InteractionState.Default]: gray.base,
    },
    [Variant.Secondary]: {
      [InteractionState.Default]: gray.dark1,
    },
  },
  track: {
    [Variant.Primary]: {
      [InteractionState.Default]: black,
    },
    [Variant.Secondary]: {
      [InteractionState.Default]: gray.dark4,
    },
  },
} as const satisfies ScrollbarColorRecord;

const lightModeScrollbarColors = {
  thumb: {
    [Variant.Primary]: {
      [InteractionState.Default]: gray.base,
    },
    [Variant.Secondary]: {
      [InteractionState.Default]: gray.light1,
    },
  },
  track: {
    [Variant.Primary]: {
      [InteractionState.Default]: white,
    },
    [Variant.Secondary]: {
      [InteractionState.Default]: gray.light3,
    },
  },
} as const satisfies ScrollbarColorRecord;

export const scrollbarColor = {
  dark: darkModeScrollbarColors,
  light: lightModeScrollbarColors,
} as const satisfies Record<Theme, ScrollbarColorRecord>;
