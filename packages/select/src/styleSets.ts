import { transparentize } from 'polished';
import { palette } from '@leafygreen-ui/palette';

export const Mode = {
  Dark: 'dark',
  Light: 'light',
} as const;

export type Mode = typeof Mode[keyof typeof Mode];

interface ColorSet {
  text: {
    deselected: string;
  };
  menu: {
    shadow: string;
    border?: string;
    hovered?: string;
    focused?: string;
  };
  option: {
    group: {
      label: string;
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
      focused: string;
    };
    icon: {
      base: string;
      selected: string;
      disabled: string;
    };
    indicator: {
      focused: string;
    };
  };
}

export const colorSets: Record<Mode, ColorSet> = {
  [Mode.Light]: {
    text: {
      deselected: palette.gray.dark1,
    },
    menu: {
      border: palette.gray.light2,
      shadow: transparentize(0.75, palette.black),
    },
    option: {
      group: {
        label: palette.gray.dark1,
      },
      background: {
        base: palette.white,
        hovered: palette.gray.light2,
        focused: palette.blue.light3,
      },
      text: {
        base: palette.gray.dark3,
        selected: palette.blue.base,
        disabled: palette.gray.base,
        focused: palette.blue.dark2,
      },
      icon: {
        base: palette.gray.dark1,
        selected: palette.blue.base,
        disabled: palette.gray.base,
      },
      indicator: {
        focused: palette.blue.base,
      },
    },
  },

  [Mode.Dark]: {
    text: {
      deselected: palette.gray.light2,
    },
    menu: {
      border: palette.gray.dark3,
      shadow: transparentize(0.2, palette.black),
      hovered: palette.gray.dark4,
      focused: palette.gray.dark4,
    },
    option: {
      group: {
        label: palette.gray.base,
      },
      background: {
        base: palette.gray.dark3,
        hovered: palette.gray.dark4,
        focused: palette.blue.dark3,
      },
      text: {
        base: palette.gray.light2,
        selected: palette.gray.light2,
        disabled: palette.gray.dark2,
        focused: palette.blue.light3,
      },
      icon: {
        base: palette.gray.base,
        selected: palette.gray.base,
        disabled: palette.gray.dark1,
      },
      indicator: {
        focused: palette.blue.light1,
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

export interface SizeSet {
  height: number;
  text: number;
  lineHeight?: number;
  option: {
    text: number;
  };
  warningIcon: number;
  label?: {
    text: number;
    lineHeight: number;
  };
  description?: {
    text: number;
    lineHeight: number;
  };
}

export const sizeSets: Record<Size, SizeSet> = {
  [Size.XSmall]: {
    height: 22,
    text: 13,
    lineHeight: 20,
    option: {
      text: 13,
    },
    warningIcon: 16,
  },
  [Size.Small]: {
    height: 28,
    text: 13,
    lineHeight: 20,
    option: {
      text: 13,
    },
    warningIcon: 16,
  },
  [Size.Default]: {
    height: 36,
    text: 13,
    lineHeight: 20,
    option: {
      text: 13,
    },
    warningIcon: 16,
  },
  [Size.Large]: {
    height: 48,
    text: 18,
    lineHeight: 23,
    option: {
      text: 16,
    },
    warningIcon: 16,
  },
};

// TODO: Refresh - used for dark mode
// export const legacySizeSets: Record<Size, SizeSet> = {
//   [Size.XSmall]: {
//     height: 22,
//     text: 12,
//     option: {
//       text: 14,
//     },
//     warningIcon: 12,
//     label: {
//       text: 14,
//       lineHeight: 16,
//     },
//     description: {
//       text: 14,
//       lineHeight: 16,
//     },
//   },
//   [Size.Small]: {
//     height: 28,
//     text: 14,
//     option: {
//       text: 14,
//     },
//     warningIcon: 14,
//     label: {
//       text: 14,
//       lineHeight: 16,
//     },
//     description: {
//       text: 14,
//       lineHeight: 16,
//     },
//   },
//   [Size.Default]: {
//     height: 36,
//     text: 14,
//     option: {
//       text: 14,
//     },
//     warningIcon: 14,
//     label: {
//       text: 14,
//       lineHeight: 16,
//     },
//     description: {
//       text: 14,
//       lineHeight: 20,
//     },
//   },
//   [Size.Large]: {
//     height: 48,
//     text: 18,
//     option: {
//       text: 16,
//     },
//     warningIcon: 17.5,
//     label: {
//       text: 18,
//       lineHeight: 21,
//     },
//     description: {
//       text: 18,
//       lineHeight: 24,
//     },
//   },
// };

interface MobileSizeSet {
  height: number;
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
  warningIcon: number;
}

export const mobileSizeSet: MobileSizeSet = {
  height: 36,
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
  warningIcon: 14,
};

export const State = {
  None: 'none',
  Error: 'error',
} as const;

export type State = typeof State[keyof typeof State];
