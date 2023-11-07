import { css } from '@leafygreen-ui/emotion';
import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';
import BulbIcon from '@leafygreen-ui/icon/dist/Bulb';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, fontWeights } from '@leafygreen-ui/tokens';
import { anchorClassName } from '@leafygreen-ui/typography';

import { Variant } from './types';

export const baseStyle = css`
  font-family: ${fontFamilies.default};
  border-radius: 16px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 16px;
    left: -2px;
    top: -2px;
    bottom: -2px;
    border-radius: 16px 0px 0px 16px;
  }
`;

export const baseThemeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
  `,
  [Theme.Light]: css`
    background-color: ${palette.white};
  `,
};

export const headerStyle = css`
  padding: 12px 24px 12px 52px;
  position: relative;
  text-transform: uppercase;
  width: 100%;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

export const headerIconStyle = css`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

export const titleStyle = css`
  font-weight: 600;
  letter-spacing: inherit;
  color: inherit;
`;

export const bodyStyle = css`
  display: flex;
  flex-direction: column;
  padding: 16px 24px 16px 52px;
  font-weight: ${fontWeights.regular};
`;

export const headerLabels: Record<Variant, string> = {
  [Variant.Note]: 'Note',
  [Variant.Tip]: 'Tip',
  [Variant.Important]: 'Important',
  [Variant.Warning]: 'Warning',
  [Variant.Example]: 'Example',
} as const;

export const headerIcons: Record<
  Variant,
  React.ComponentType<React.PropsWithChildren<any>>
> = {
  [Variant.Note]: InfoWithCircleIcon,
  [Variant.Tip]: BulbIcon,
  [Variant.Important]: ImportantWithCircleIcon,
  [Variant.Warning]: WarningIcon,
  [Variant.Example]: BeakerIcon,
} as const;

interface ColorSet {
  header: {
    background: string;
    text: string;
  };
  text: string;
  bar: string;
  icon: string;
  border: string;
  link: {
    color: string;
    hoverColor: string;
  };
}

export const colorSets: Record<Theme, Record<Variant, ColorSet>> = {
  [Theme.Dark]: {
    [Variant.Note]: {
      header: {
        background: palette.blue.dark3,
        text: palette.blue.light2,
      },
      text: palette.blue.light3,
      bar: palette.blue.dark1,
      icon: palette.blue.light1,
      border: palette.blue.dark1,
      link: {
        color: palette.blue.light2,
        hoverColor: palette.blue.light3,
      },
    },
    [Variant.Tip]: {
      header: {
        background: palette.purple.dark3,
        text: palette.purple.light2,
      },
      text: palette.purple.light2,
      bar: palette.purple.dark2,
      icon: palette.purple.base,
      border: palette.purple.dark2,
      link: {
        color: palette.purple.light2,
        hoverColor: palette.purple.light3,
      },
    },
    [Variant.Important]: {
      header: {
        background: palette.yellow.dark3,
        text: palette.yellow.light2,
      },
      text: palette.yellow.light3,
      bar: palette.yellow.dark2,
      icon: palette.yellow.base,
      border: palette.yellow.dark2,
      link: {
        color: palette.yellow.light2,
        hoverColor: palette.yellow.light3,
      },
    },
    [Variant.Warning]: {
      header: {
        background: palette.red.dark3,
        text: palette.red.light2,
      },
      text: palette.red.light3,
      bar: palette.red.dark2,
      icon: palette.red.light1,
      border: palette.red.dark2,
      link: {
        color: palette.red.light2,
        hoverColor: palette.red.light3,
      },
    },
    [Variant.Example]: {
      header: {
        background: palette.gray.dark3,
        text: palette.gray.light2,
      },
      text: palette.gray.light3,
      bar: palette.gray.dark1,
      icon: palette.gray.base,
      border: palette.gray.dark1,
      link: {
        color: palette.gray.light2,
        hoverColor: palette.gray.light3,
      },
    },
  },
  [Theme.Light]: {
    [Variant.Note]: {
      header: {
        background: palette.blue.light3,
        text: palette.blue.dark1,
      },
      text: palette.blue.dark3,
      bar: palette.blue.base,
      icon: palette.blue.base,
      border: palette.blue.light2,
      link: {
        color: palette.blue.dark3,
        hoverColor: palette.blue.dark2,
      },
    },
    [Variant.Tip]: {
      header: {
        background: palette.purple.light3,
        text: palette.purple.dark2,
      },
      text: palette.purple.dark3,
      bar: palette.purple.base,
      icon: palette.purple.base,
      border: palette.purple.light2,
      link: {
        color: palette.purple.dark3,
        hoverColor: palette.purple.dark2,
      },
    },
    [Variant.Important]: {
      header: {
        background: palette.yellow.light3,
        text: palette.yellow.dark2,
      },
      text: palette.yellow.dark3,
      bar: palette.yellow.base,
      icon: palette.yellow.dark2,
      border: palette.yellow.light2,
      link: {
        color: palette.yellow.dark3,
        hoverColor: palette.yellow.dark2,
      },
    },
    [Variant.Warning]: {
      header: {
        background: palette.red.light3,
        text: palette.red.dark2,
      },
      text: palette.red.dark3,
      bar: palette.red.base,
      icon: palette.red.base,
      border: palette.red.light2,
      link: {
        color: palette.red.dark3,
        hoverColor: palette.red.dark2,
      },
    },
    [Variant.Example]: {
      header: {
        background: palette.gray.light2,
        text: palette.gray.dark2,
      },
      text: palette.gray.dark3,
      bar: palette.gray.dark1,
      icon: palette.gray.dark3,
      border: palette.gray.light1,
      link: {
        color: palette.gray.dark3,
        hoverColor: palette.gray.dark2,
      },
    },
  },
};

export const contentStyles = css`
  .${anchorClassName}, a {
    font-size: inherit;
    line-height: inherit;
    font-weight: ${fontWeights.bold};
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 2px;
    border-radius: 2px;

    &:hover,
    &:focus,
    &:focus-visible {
      outline: none;
      // duplicate these styles to override text-decoration: none in Link component
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-thickness: 2px;
      span {
        &::after {
          display: none;
        }
      }
    }
    &:focus-visible {
      position: relative;
    }
  }
`;

export const focusThemeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    .${anchorClassName}, a {
      &:focus-visible {
        box-shadow: 0 0 0 3px ${palette.gray.dark4},
          0 0 0 5px ${palette.blue.light1};
      }
    }
  `,
  [Theme.Light]: css`
    .${anchorClassName}, a {
      &:focus-visible {
        box-shadow: 0 0 0 3px ${palette.white}, 0 0 0 5px ${palette.blue.light1};
      }
    }
  `,
};
