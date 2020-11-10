import { transparentize } from 'polished';
import { CSSProperties } from 'react';
import { uiColors } from '@leafygreen-ui/palette';

export const Variant = {
  Default: 'default',
  Primary: 'primary',
  Info: 'info',
  Danger: 'danger',
  Dark: 'dark',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

interface ColorSet {
  text: string;
  border: string;
  background: {
    color: {
      base: string;
      active: string;
      'focus/hover': string;
    };
    image: {
      base: string;
      active: string;
      'focus/hover': string;
    };
    shadow: {
      base: string;
      active: string;
      'focus/hover': {
        higher: string;
        lower: string;
      };
    };
  };
}

export const colorSets: Record<Variant, ColorSet> = {
  [Variant.Default]: {
    text: uiColors.gray.dark2,
    border: uiColors.gray.light1,
    background: {
      color: {
        base: uiColors.gray.light3,
        active: uiColors.gray.light3,
        'focus/hover': uiColors.gray.light2,
      },
      image: {
        base: `linear-gradient(${uiColors.white}, ${uiColors.gray.light2})`,
        active: `linear-gradient(#dde4e2, ${uiColors.gray.light3})`,
        'focus/hover': `linear-gradient(${uiColors.gray.light3}, #dde4e2)`,
      },
      shadow: {
        base: `inset 0 -1px 0 ${uiColors.gray.light1}`,
        active: `inset 0 2px 2px ${transparentize(0.9, uiColors.black)}`,
        'focus/hover': {
          higher: `inset 0 -1px 0 ${uiColors.gray.light1}`,
          lower: `0 1px 4px ${transparentize(0.9, uiColors.black)}`,
        },
      },
    },
  },
  [Variant.Primary]: {
    text: uiColors.white,
    border: '#158242',
    background: {
      color: {
        base: uiColors.green.base,
        active: uiColors.green.base,
        'focus/hover': '#129f4c',
      },
      image: {
        base: `linear-gradient(${uiColors.green.base}, #18964c)`,
        active: `linear-gradient(#148040, #129f4c)`,
        'focus/hover': `linear-gradient(#129f4c, #148040)`,
      },
      shadow: {
        base: `inset 0 -1px 0 #158242`,
        active: `inset 0 2px 2px ${uiColors.green.dark2}`,
        'focus/hover': {
          higher: `0 1px 4px ${transparentize(0.9, uiColors.black)}`,
          lower: `inset 0 -1px 0 #158242`,
        },
      },
    },
  },
  [Variant.Info]: {
    text: uiColors.green.base,
    border: uiColors.green.base,
    background: {
      color: {
        base: 'transparent',
        active: uiColors.green.base,
        'focus/hover': '#129f4c',
      },
      image: {
        base: 'none',
        active: `linear-gradient(#148040, #129f4c)`,
        'focus/hover': `linear-gradient(#129f4c, #148040)`,
      },
      shadow: {
        base: '0 0 0 3px rgba(0, 0, 0, 0)', // Can't set to "none" because it may be set with other box shadows
        active: `inset 0 2px 2px ${uiColors.green.dark2}`,
        'focus/hover': {
          higher: `0 1px 4px ${transparentize(0.9, uiColors.black)}`,
          lower: `inset 0 -1px 0 #158242`,
        },
      },
    },
  },
  [Variant.Danger]: {
    text: uiColors.white,
    border: uiColors.red.dark2,
    background: {
      color: {
        base: uiColors.red.base,
        active: uiColors.red.dark2,
        'focus/hover': uiColors.red.dark2,
      },
      image: {
        base: `linear-gradient(#e45b26, #b63016)`,
        active: `linear-gradient(#ad231b, #e45b26)`,
        'focus/hover': `linear-gradient(#e45b26, ${uiColors.red.dark2})`,
      },
      shadow: {
        base: `inset 0 -1px 0 0 ${uiColors.red.dark2}`,
        active: `inset 0 2px 2px ${uiColors.red.dark2}`,
        'focus/hover': {
          higher: `0 1px 4px ${transparentize(0.9, uiColors.black)}`,
          lower: `inset 0 -1px 0 ${uiColors.red.dark2}`,
        },
      },
    },
  },
  [Variant.Dark]: {
    text: uiColors.white,
    border: uiColors.gray.dark2,
    background: {
      color: {
        base: uiColors.gray.dark1,
        active: uiColors.gray.dark1,
        'focus/hover': uiColors.gray.dark1,
      },
      image: {
        base: `linear-gradient(${uiColors.gray.base}, ${uiColors.gray.dark1})`,
        active: `linear-gradient(${uiColors.gray.dark1}, ${uiColors.gray.base})`,
        'focus/hover': `linear-gradient(${uiColors.gray.base}, ${uiColors.gray.dark2})`,
      },
      shadow: {
        base: `inset 0 -1px 0 ${uiColors.gray.dark2}`,
        active: `inset 0 2px 2px ${uiColors.gray.dark2}`,
        'focus/hover': {
          higher: `0 1px 4px ${transparentize(0.9, uiColors.black)}`,
          lower: `inset 0 -1px 0 ${uiColors.gray.dark2}`,
        },
      },
    },
  },
};

export const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Normal: 'normal',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];

interface SizeSet {
  glyph: {
    margin: number;
  };
  content: {
    padding: {
      horizontal: number;
    };
  };
  height: number;
  text: {
    size: number;
    transform?: string;
    weight?: CSSProperties['fontWeight'];
  };
}

export const sizeSets: Record<Size, SizeSet> = {
  [Size.XSmall]: {
    glyph: {
      margin: 2,
    },
    content: {
      padding: {
        horizontal: 8,
      },
    },
    height: 22,
    text: {
      size: 11,
      transform: 'uppercase',
      weight: 'bold',
    },
  },
  [Size.Small]: {
    glyph: {
      margin: 2,
    },
    content: {
      padding: {
        horizontal: 10,
      },
    },
    height: 25,
    text: {
      size: 14,
    },
  },
  [Size.Normal]: {
    glyph: {
      margin: 2,
    },
    content: {
      padding: {
        horizontal: 12,
      },
    },
    height: 32,
    text: {
      size: 14,
    },
  },
  [Size.Large]: {
    glyph: {
      margin: 2,
    },
    content: {
      padding: {
        horizontal: 20,
      },
    },
    height: 45,
    text: {
      size: 16,
    },
  },
};
