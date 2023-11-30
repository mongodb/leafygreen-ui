import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

const State = {
  Default: 'default',
  Hover: 'hover',
  Focus: 'focus',
  Disabled: 'disabled',
  Checked: 'checked',
  Destructive: 'destructive',
} as const;

type State = (typeof State)[keyof typeof State];

export { State };

export type FormState = Exclude<State, 'destructive' | 'overrides'>;

type FormShape = Record<Theme, { [k in FormState]: Record<string, string> }>;

type MenuShape = Record<Theme, { [k in State]: Record<string, string> }>;

export const formThemeStyles: FormShape = {
  [Theme.Light]: {
    default: {
      title: palette.black,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      backgroundColor: palette.white,
    },
    hover: {
      leftGlyph: palette.gray.dark3,
      backgroundColor: palette.gray.light2,
    },
    focus: {
      title: palette.blue.dark2,
      description: palette.gray.dark1,
      leftGlyph: palette.blue.dark1,
      backgroundColor: palette.blue.light3,
      wedge: palette.blue.base,
    },
    disabled: {
      title: palette.gray.light1,
      description: palette.gray.light1,
      leftGlyph: palette.gray.light1,
      backgroundColor: palette.white,
    },
    checked: {
      title: palette.black,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      backgroundColor: palette.white,
    },
  },
  [Theme.Dark]: {
    default: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.gray.base,
      backgroundColor: palette.gray.dark3,
    },

    hover: {
      leftGlyph: palette.gray.base,
      backgroundColor: palette.gray.dark4,
    },

    focus: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.blue.light3,
      backgroundColor: palette.blue.dark3,
      wedge: palette.blue.light1,
    },

    disabled: {
      title: palette.gray.dark1,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      backgroundColor: palette.gray.dark3,
    },

    checked: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.gray.base,
      backgroundColor: palette.gray.dark3,
    },
  },
};

export const menuThemeStyles: MenuShape = {
  [Theme.Light]: {
    default: {
      title: palette.white,
      description: palette.gray.light1,
      leftGlyph: palette.gray.dark1,
      backgroundColor: palette.black,
    },
    hover: {
      leftGlyph: palette.gray.base,
      backgroundColor: palette.gray.dark3,
    },
    focus: {
      title: palette.blue.light3,
      description: palette.gray.light3,
      leftGlyph: palette.blue.light3,
      backgroundColor: palette.blue.dark3,
      wedge: palette.blue.light1,
    },
    disabled: {
      title: palette.gray.dark2,
      description: palette.gray.dark2,
      leftGlyph: palette.gray.dark2,
      backgroundColor: palette.black,
    },
    checked: {
      title: palette.green.base,
      description: palette.gray.light1,
      leftGlyph: palette.green.base,
      backgroundColor: palette.black,
      wedge: palette.green.base,
    },
    destructive: {
      title: palette.red.light1,
      description: palette.gray.light1,
      leftGlyph: palette.red.light1,
      backgroundColor: palette.black,
    },
  },
  [Theme.Dark]: {
    default: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.gray.light1,
      backgroundColor: palette.gray.dark3,
    },
    hover: {
      leftGlyph: palette.gray.light1,
      backgroundColor: palette.gray.dark2,
    },
    focus: {
      title: palette.blue.light3,
      description: palette.blue.light3,
      leftGlyph: palette.blue.light3,
      backgroundColor: palette.blue.dark3,
      wedge: palette.blue.light1,
    },
    disabled: {
      title: palette.gray.dark1,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      backgroundColor: palette.gray.dark3,
    },
    checked: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.green.base,
      backgroundColor: palette.gray.dark3,
      wedge: palette.green.base,
    },
    destructive: {
      title: palette.red.light1,
      description: palette.gray.light1,
      leftGlyph: palette.red.light1,
      backgroundColor: palette.gray.dark3,
    },
  },
};
