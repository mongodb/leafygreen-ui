import { transparentize } from 'polished';

import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { Size } from './Select/Select.types';

interface ColorSet {
  menu: {
    shadow: string;
    border?: string;
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

export const colorSets: Record<Theme, ColorSet> = {
  [Theme.Light]: {
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

  [Theme.Dark]: {
    menu: {
      border: palette.gray.dark2,
      shadow: transparentize(0.85, '#000000'),
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
        disabled: palette.gray.base,
        focused: palette.blue.light3,
      },
      icon: {
        base: palette.gray.base,
        selected: palette.blue.light1,
        disabled: palette.gray.base,
      },
      indicator: {
        focused: palette.blue.light1,
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
    option: {
      text: 13,
    },
    warningIcon: 16,
  },
  [Size.Small]: {
    height: 28,
    text: 13,
    option: {
      text: 13,
    },
    warningIcon: 16,
  },
  [Size.Default]: {
    height: 36,
    text: 13,
    option: {
      text: 13,
    },
    warningIcon: 16,
  },
  [Size.Large]: {
    height: 48,
    text: 18,
    option: {
      text: 16,
    },
    warningIcon: 16,
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
