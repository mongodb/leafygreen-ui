export const svgWidth = 24;
export const paddingLeftWithGlyph = 54;
export const paddingLeftWithoutGlyph = 20;

import { RecursiveRecord, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, InteractionState, Property } from '@leafygreen-ui/tokens';

const MenuInteractionState = {
  ...InteractionState,
  Active: 'active',
} as const;
export type MenuInteractionState =
  (typeof MenuInteractionState)[keyof typeof MenuInteractionState];

// Menu dark/light mode colors intentionally do not line up with tokens
export const menuColor = {
  [Theme.Light]: {
    [Property.Background]: {
      [MenuInteractionState.Default]: palette.white,
      [MenuInteractionState.Active]: palette.green.light3,
      [MenuInteractionState.Hover]: '', // TBD
      [MenuInteractionState.Focus]: color.light.background.primary.focus, // ???
    },
    [Property.Border]: {
      [MenuInteractionState.Default]: palette.gray.light2,
      [MenuInteractionState.Active]: palette.green.dark1,
      [MenuInteractionState.Focus]: palette.blue.base,
    },
    [Property.Text]: {
      [MenuInteractionState.Default]: palette.black,
      [MenuInteractionState.Active]: palette.green.dark2,
      [MenuInteractionState.Focus]: color.light.text.primary.focus,
    },
    [Property.Icon]: {
      [MenuInteractionState.Default]: palette.gray.dark1,
      [MenuInteractionState.Active]: palette.green.dark1,
      [MenuInteractionState.Focus]: color.light.icon.primary.focus,
      [MenuInteractionState.Hover]: palette.gray.dark2,
    },
  },
  [Theme.Dark]: {
    [Property.Background]: {
      [MenuInteractionState.Default]: palette.gray.dark3,
      [MenuInteractionState.Active]: palette.green.dark3,
      [MenuInteractionState.Hover]: palette.gray.dark2,
      [MenuInteractionState.Focus]: color.dark.background.primary.focus,
    },
    [Property.Border]: {
      [MenuInteractionState.Default]: palette.gray.dark2,
      [MenuInteractionState.Focus]: color.dark.border.primary.focus,
      [MenuInteractionState.Active]: palette.green.base,
    },
    [Property.Text]: {
      [MenuInteractionState.Default]: palette.gray.light2,
      [MenuInteractionState.Focus]: color.dark.text.primary.focus,
      [MenuInteractionState.Active]: palette.green.base,
    },
    [Property.Icon]: {
      [MenuInteractionState.Default]: palette.gray.light1,
      [MenuInteractionState.Active]: palette.green.base,
      [MenuInteractionState.Focus]: color.dark.icon.primary.focus,
      [MenuInteractionState.Hover]: palette.gray.light2,
    },
  },
} as const satisfies RecursiveRecord<
  [Theme, Property, MenuInteractionState, string],
  false
>;
