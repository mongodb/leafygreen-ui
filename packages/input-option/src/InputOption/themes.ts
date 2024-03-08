import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { RenderedContext } from './InputOption.types';

export const hoverColors = {
  [RenderedContext.Form]: {
    [Theme.Light]: {
      bgColor: palette.gray.light2,
      leftGlyph: palette.gray.dark1,
    },
    [Theme.Dark]: {
      bgColor: palette.gray.dark4,
      leftGlyph: palette.gray.base,
    },
  },
  [RenderedContext.Menu]: {
    [Theme.Light]: {
      bgColor: palette.gray.dark3,
      leftGlyph: palette.gray.base,
    },
    [Theme.Dark]: {
      bgColor: palette.gray.dark2,
      leftGlyph: palette.gray.light1,
    },
  },
};

export const formContextColors: any = {
  [Theme.Light]: {
    default: {
      title: palette.black,
      description: palette.gray.dark1,
      leftGlyph: palette.gray.dark1,
      bgColor: palette.white,
    },
    highlight: {
      title: palette.blue.dark2,
      description: palette.gray.dark1,
      leftGlyph: palette.blue.dark1,
      bgColor: palette.blue.light3,
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
      bgColor: palette.gray.dark3,
    },
    highlight: {
      title: palette.gray.light2,
      description: palette.gray.light1,
      leftGlyph: palette.blue.light3,
      bgColor: palette.blue.dark3,
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

export const menuContextColors: any = {
  [Theme.Light]: {
    default: {
      title: palette.white,
      description: palette.gray.light1,
      leftGlyph: palette.gray.dark1,
      bgColor: palette.black,
    },
    highlight: {
      title: palette.blue.light3,
      description: palette.gray.light3,
      leftGlyph: palette.blue.light3,
      bgColor: palette.blue.dark3,
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
      bgColor: palette.gray.dark3,
    },
    highlight: {
      title: palette.blue.light3,
      description: palette.blue.light3,
      leftGlyph: palette.blue.light3,
      bgColor: palette.blue.dark3,
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
