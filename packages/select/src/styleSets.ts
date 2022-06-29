import { transparentize } from 'polished';
import { palette, uiColors } from '@leafygreen-ui/palette';
import { Size, Mode } from './types';

interface ColorSet {
  text: {
    deselected: string;
  };
  menu: {
    shadow: string;
    border?: string;
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
        border: palette.white,
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
      deselected: uiColors.gray.light1,
    },
    menu: {
      shadow: transparentize(0.2, uiColors.black),
    },
    option: {
      group: {
        label: uiColors.gray.light1,
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
        focused: uiColors.white,
      },
      icon: {
        base: uiColors.gray.light1,
        selected: '#9DD0E7',
        disabled: uiColors.gray.base,
      },
      indicator: {
        focused: uiColors.white,
      },
    },
  },
};

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
    lineHeight: 22,
    option: {
      text: 16,
    },
    warningIcon: 16,
  },
};

// TODO: Refresh - used for dark mode
export const legacySizeSets: Record<Size, SizeSet> = {
  [Size.XSmall]: {
    height: 22,
    text: 12,
    option: {
      text: 14,
    },
    warningIcon: 12,
    label: {
      text: 14,
      lineHeight: 16,
    },
    description: {
      text: 14,
      lineHeight: 16,
    },
  },
  [Size.Small]: {
    height: 28,
    text: 14,
    option: {
      text: 14,
    },
    warningIcon: 14,
    label: {
      text: 14,
      lineHeight: 16,
    },
    description: {
      text: 14,
      lineHeight: 16,
    },
  },
  [Size.Default]: {
    height: 36,
    text: 14,
    option: {
      text: 14,
    },
    warningIcon: 14,
    label: {
      text: 14,
      lineHeight: 16,
    },
    description: {
      text: 14,
      lineHeight: 20,
    },
  },
  [Size.Large]: {
    height: 48,
    text: 18,
    option: {
      text: 16,
    },
    warningIcon: 17.5,
    label: {
      text: 18,
      lineHeight: 21,
    },
    description: {
      text: 18,
      lineHeight: 24,
    },
  },
};

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
