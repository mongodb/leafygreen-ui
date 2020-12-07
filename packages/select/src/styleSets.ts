import { transparentize } from 'polished';
import { uiColors } from '@leafygreen-ui/palette';

export const Mode = {
  Dark: 'dark',
  Light: 'light',
} as const;

export type Mode = typeof Mode[keyof typeof Mode];

interface ColorSet {
  label: {
    base: string;
    disabled: string;
  };
  description: string;
  border: {
    base: string;
    open: string;
  };
  text: {
    base: string;
    deselected: string;
    disabled: string;
  };
  menu: {
    shadow: string;
  };
  option: {
    group: {
      label: string;
      border: string;
    };
    background: {
      base: string;
      hovered: string;
      focused: string;
    };
    text: {
      base: string;
      selected: string;
      disabled: string;
    };
    icon: {
      base: string;
      selected: string;
      disabled: string;
    };
  };
}

export const colorSets: Record<Mode, ColorSet> = {
  [Mode.Light]: {
    label: {
      base: uiColors.gray.dark3,
      disabled: uiColors.gray.dark1,
    },
    description: uiColors.gray.dark1,
    border: {
      base: uiColors.gray.light1,
      open: uiColors.gray.dark1,
    },
    text: {
      base: uiColors.gray.dark3,
      deselected: uiColors.gray.dark1,
      disabled: uiColors.gray.base,
    },
    menu: {
      shadow: transparentize(0.78, uiColors.black),
    },
    option: {
      group: {
        label: uiColors.gray.dark3,
        border: uiColors.gray.light2,
      },
      background: {
        base: uiColors.white,
        hovered: uiColors.gray.light2,
        focused: uiColors.blue.light3,
      },
      text: {
        base: uiColors.gray.dark3,
        selected: uiColors.blue.base,
        disabled: uiColors.gray.base,
      },
      icon: {
        base: uiColors.gray.dark1,
        selected: uiColors.blue.base,
        disabled: uiColors.gray.base,
      },
    },
  },

  [Mode.Dark]: {
    label: {
      base: uiColors.white,
      disabled: uiColors.gray.light1,
    },
    description: uiColors.gray.light1,
    border: {
      base: uiColors.gray.dark2,
      open: uiColors.gray.dark2,
    },
    text: {
      base: uiColors.white,
      deselected: uiColors.gray.light1,
      disabled: uiColors.gray.dark1,
    },
    menu: {
      shadow: transparentize(0.2, uiColors.black),
    },
    option: {
      group: {
        label: uiColors.white,
        border: uiColors.gray.dark1,
      },
      background: {
        base: uiColors.gray.dark2,
        hovered: uiColors.gray.dark1,
        focused: uiColors.blue.base,
      },
      text: {
        base: uiColors.white,
        selected: '#9DD0E7',
        disabled: uiColors.gray.base,
      },
      icon: {
        base: uiColors.gray.light1,
        selected: '#9DD0E7',
        disabled: uiColors.gray.base,
      },
    },
  },
};

export const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];

interface SizeSet {
  height: number;
  width: number;
  text: number;
  label: {
    text: number;
    lineHeight: number;
  };
  description: {
    text: number;
    lineHeight: number;
  };
  option: {
    text: number;
  };
}

export const sizeSets: Record<Size, SizeSet> = {
  [Size.XSmall]: {
    height: 22,
    width: 194,
    text: 12,
    label: {
      text: 14,
      lineHeight: 16,
    },
    description: {
      text: 14,
      lineHeight: 16,
    },
    option: {
      text: 14,
    },
  },
  [Size.Small]: {
    height: 28,
    width: 194,
    text: 14,
    label: {
      text: 14,
      lineHeight: 16,
    },
    description: {
      text: 14,
      lineHeight: 16,
    },
    option: {
      text: 14,
    },
  },
  [Size.Default]: {
    height: 36,
    width: 194,
    text: 14,
    label: {
      text: 14,
      lineHeight: 16,
    },
    description: {
      text: 14,
      lineHeight: 20,
    },
    option: {
      text: 14,
    },
  },
  [Size.Large]: {
    height: 48,
    width: 230,
    text: 18,
    label: {
      text: 18,
      lineHeight: 21,
    },
    description: {
      text: 18,
      lineHeight: 24,
    },
    option: {
      text: 16,
    },
  },
};

export const mobileSizeSet: SizeSet = {
  height: 36,
  width: 194,
  text: 16,
  label: {
    text: 16,
    lineHeight: 19,
  },
  description: {
    text: 16,
    lineHeight: 22,
  },
  option: {
    text: 16,
  },
};
