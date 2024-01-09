import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { RenderedContext } from '.';

const State = {
  Default: 'default',
  Hover: 'hover',
  Highlight: 'highlight',
  Disabled: 'disabled',
  Checked: 'checked',
  Destructive: 'destructive',
} as const;

type State = (typeof State)[keyof typeof State];

export { State };

export type FormState = Exclude<State, 'destructive'>;

// export const formThemeStyles: Record<
//   Theme,
//   Record<FormState, Record<string, string>>
// > = {
export const formContextColors: any = {
  [Theme.Light]: {
    default: {
      title: palette.black,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      leftGlyphHover: palette.gray.dark1,
      bgColor: palette.white,
    },
    hover: {
      bgColor: {
        default: palette.gray.light2,
      },
    },
    highlight: {
      title: palette.blue.dark2,
      description: palette.gray.dark1,
      leftGlyph: palette.blue.dark1,
      bgColor: palette.blue.light3,
      wedgeBgColor: palette.blue.base,
    },
    disabled: {
      title: palette.gray.light1,
      description: palette.gray.light1,
      leftGlyph: palette.gray.light1,
      bgColor: palette.white,
    },
    checked: {
      title: palette.black,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      bgColor: palette.white,
    },
  },
  [Theme.Dark]: {
    default: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.gray.base,
      leftGlyphHover: palette.gray.base,
      bgColor: palette.gray.dark3,
    },
    hover: {
      bgColor: {
        default: palette.gray.dark4,
      },
    },
    highlight: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.blue.light3,
      bgColor: palette.blue.dark3,
      wedgeBgColor: palette.blue.light1,
    },

    disabled: {
      title: palette.gray.dark1,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      bgColor: palette.gray.dark3,
    },

    checked: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.gray.base,
      bgColor: palette.gray.dark3,
    },
  },
};

// export const menuThemeStyles: Record<
//   Theme,
//   Record<State, Record<string, string>>
// > = {
export const menuContextColors: any = {
  [Theme.Light]: {
    default: {
      title: palette.white,
      description: palette.gray.light1,
      leftGlyph: palette.gray.dark1,
      leftGlyphHover: palette.gray.base,
      bgColor: palette.black,
    },
    hover: {
      bgColor: {
        default: palette.gray.dark3,
        checked: palette.gray.dark3,
        destructive: palette.gray.dark3,
      },
    },
    highlight: {
      title: palette.blue.light3,
      description: palette.gray.light3,
      leftGlyph: palette.blue.light3,
      bgColor: palette.blue.dark3,
      wedgeBgColor: palette.blue.light1,
    },
    disabled: {
      title: palette.gray.dark2,
      description: palette.gray.dark2,
      leftGlyph: palette.gray.dark2,
      bgColor: palette.black,
    },
    checked: {
      title: palette.green.base,
      description: palette.gray.light1,
      leftGlyph: palette.green.base,
      bgColor: palette.black,
      wedgeBgColor: palette.green.base,
    },
    destructive: {
      title: palette.red.light1,
      description: palette.gray.light1,
      leftGlyph: palette.red.light1,
      bgColor: palette.black,
    },
  },
  [Theme.Dark]: {
    default: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.gray.light1,
      leftGlyphHover: palette.gray.light1,
      bgColor: palette.gray.dark3,
    },
    hover: {
      bgColor: {
        default: palette.gray.dark2,
        checked: palette.gray.dark2,
        destructive: palette.gray.dark2,
      },
    },
    highlight: {
      title: palette.blue.light3,
      description: palette.blue.light3,
      leftGlyph: palette.blue.light3,
      bgColor: palette.blue.dark3,
      wedgeBgColor: palette.blue.light1,
    },
    disabled: {
      title: palette.gray.dark1,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      bgColor: palette.gray.dark3,
    },
    checked: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.green.base,
      bgColor: palette.gray.dark3,
      wedgeBgColor: palette.green.base,
    },
    destructive: {
      title: palette.red.light1,
      description: palette.gray.light1,
      leftGlyph: palette.red.light1,
      bgColor: palette.gray.dark3,
    },
  },
};

export const contextColors: Record<RenderedContext, any> = {
  [RenderedContext.Form]: formContextColors,
  [RenderedContext.Menu]: menuContextColors,
};
