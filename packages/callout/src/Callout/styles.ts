import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, fontFamilies, fontWeights } from '@leafygreen-ui/tokens';

import { Variant } from './types';

export const getBaseStyles = (theme: Theme, variant: Variant) =>
  cx(
    css`
      font-family: ${fontFamilies.default};
      position: relative;
      color: ${color[theme].text.primary.default};
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
    margin-block-end: 4px;
    width: 100%;
    color: ${colorSets[theme][variant].header.text};
    letter-spacing: 0.6px;
  `;

export const titleStyle = css`
  font-weight: 600;
  letter-spacing: inherit;
  color: inherit;
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
    text: string;
  };
  bar: string;
}

export const colorSets: Record<Theme, Record<Variant, ColorSet>> = {
  [Theme.Dark]: {
    [Variant.Note]: {
      header: {
        text: palette.blue.light2,
      },
      bar: palette.blue.dark1,
    },
    [Variant.Tip]: {
      header: {
        text: palette.purple.light2,
      },
      bar: palette.purple.dark2,
    },
    [Variant.Important]: {
      header: {
        text: palette.yellow.light2,
      },
      bar: palette.yellow.dark2,
    },
    [Variant.Warning]: {
      header: {
        text: palette.red.light2,
      },
      bar: palette.red.dark2,
    },
    [Variant.Example]: {
      header: {
        text: palette.gray.light2,
      },
      bar: palette.gray.dark1,
    },
  },
  [Theme.Light]: {
    [Variant.Note]: {
      header: {
        text: palette.blue.dark1,
      },
      bar: palette.blue.base,
    },
    [Variant.Tip]: {
      header: {
        text: palette.purple.dark2,
      },
      bar: palette.purple.base,
    },
    [Variant.Important]: {
      header: {
        text: palette.yellow.dark2,
      },
      bar: palette.yellow.base,
    },
    [Variant.Warning]: {
      header: {
        text: palette.red.dark2,
      },
      bar: palette.red.base,
    },
    [Variant.Example]: {
      header: {
        text: palette.gray.dark2,
      },
      bar: palette.gray.dark1,
    },
  },
};
