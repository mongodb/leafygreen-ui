import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, fontWeights } from '@leafygreen-ui/tokens';
import { anchorClassName } from '@leafygreen-ui/typography';

import { Variant } from './types';

export const getBaseStyles = (theme: Theme, variant: Variant) =>
  cx(
    css`
      font-family: ${fontFamilies.default};
      position: relative;
      color: ${colorSets[theme][variant].text};
      padding-inline-start: 10px; // 3px border + 7px between border and text

      &:after {
        content: '';
        position: absolute;
        width: 3px;
        top: 0px;
        bottom: 0px;
        left: 0;
        border-radius: 2px;
        background-color: ${colorSets[theme][variant].bar};
      }
    `,
  );

export const getHeaderStyles = (theme: Theme, variant: Variant) =>
  css`
    margin-bottom: 4px;
    position: relative;
    text-transform: uppercase;
    width: 100%;
    color: ${colorSets[theme][variant].header.text};
  `;

export const overlineStyles = css`
  color: inherit;
  letter-spacing: 0.6px;
`;

export const titleStyle = css`
  font-weight: 600;
  letter-spacing: inherit;
  color: inherit;
`;

export const bodyStyle = css`
  display: flex;
  flex-direction: column;
  padding: 0px 24px 4px 0px;
  font-weight: ${fontWeights.regular};
`;

export const headerLabels: Record<Variant, string> = {
  [Variant.Note]: 'Note',
  [Variant.Tip]: 'Tip',
  [Variant.Important]: 'Important',
  [Variant.Warning]: 'Warning',
  [Variant.Example]: 'Example',
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
      border: palette.yellow.base,
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
      border: palette.red.base,
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
