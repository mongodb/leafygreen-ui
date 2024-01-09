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

export type FormState = Exclude<State, 'destructive' | 'overrides'>;

// export const formThemeStyles: Record<
//   Theme,
//   Record<FormState, Record<string, string>>
// > = {
export const formThemeStyles: any = {
  [Theme.Light]: {
    default: {
      title: palette.black,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      leftGlyphHover: palette.gray.dark1,
      backgroundColor: palette.white,
    },
    hover: {
      backgroundColor: {
        default: palette.gray.light2,
      },
    },
    highlight: {
      title: palette.blue.dark2,
      description: palette.gray.dark1,
      leftGlyph: palette.blue.dark1,
      backgroundColor: palette.blue.light3,
      wedgeBgColor: palette.blue.base,
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
      leftGlyphHover: palette.gray.base,
      backgroundColor: palette.gray.dark3,
    },

    hover: {
      backgroundColor: {
        default: palette.gray.dark4,
      },
    },

    highlight: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.blue.light3,
      backgroundColor: palette.blue.dark3,
      wedgeBgColor: palette.blue.light1,
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

// export const menuThemeStyles: Record<
//   Theme,
//   Record<State, Record<string, string>>
// > = {
export const menuThemeStyles: any = {
  [Theme.Light]: {
    default: {
      title: palette.white,
      description: palette.gray.light1,
      leftGlyph: palette.gray.dark1,
      leftGlyphHover: palette.gray.base,
      backgroundColor: palette.black,
    },
    hover: {
      backgroundColor: {
        default: palette.gray.dark3,
        checked: palette.gray.dark3,
        destructive: palette.gray.dark3,
      },
    },
    highlight: {
      title: palette.blue.light3,
      description: palette.gray.light3,
      leftGlyph: palette.blue.light3,
      backgroundColor: palette.blue.dark3,
      wedgeBgColor: palette.blue.light1,
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
      wedgeBgColor: palette.green.base,
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
      leftGlyphHover: palette.gray.light1,
      backgroundColor: palette.gray.dark3,
    },
    hover: {
      backgroundColor: {
        default: palette.gray.dark2,
        checked: palette.gray.dark2,
        destructive: palette.gray.dark2,
      },
    },
    highlight: {
      title: palette.blue.light3,
      description: palette.blue.light3,
      leftGlyph: palette.blue.light3,
      backgroundColor: palette.blue.dark3,
      wedgeBgColor: palette.blue.light1,
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
      wedgeBgColor: palette.green.base,
    },
    destructive: {
      title: palette.red.light1,
      description: palette.gray.light1,
      leftGlyph: palette.red.light1,
      backgroundColor: palette.gray.dark3,
    },
  },
};

export const contextStyles: Record<RenderedContext, any> = {
  [RenderedContext.Form]: formThemeStyles,
  [RenderedContext.Menu]: menuThemeStyles,
};
