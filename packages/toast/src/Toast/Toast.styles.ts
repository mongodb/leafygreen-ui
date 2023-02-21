import { Transition } from 'react-transition-group';
import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  fontFamilies,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';
import { anchorClassName } from '@leafygreen-ui/typography';

import { Variant } from './Toast.types';

export const toastWidth = 400;
export const toastHeight = 56;

export const baseToastStyle = css`
  position: fixed;
  bottom: ${spacing[6]}px;
  left: ${spacing[4]}px;
  width: ${toastWidth}px;
  min-height: ${toastHeight}px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[2]}px;
  padding-left: ${spacing[3]}px;
  gap: ${spacing[3]}px;

  font-family: ${fontFamilies.default};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  border-radius: 12px;
  box-shadow: 0px 18px 18px -15px ${transparentize(0.8, '#06161E')};

  overflow: hidden;
  transform: translate3d(0, ${spacing[3]}px, 0) scale(0.95);
  transform-origin: bottom center;
  opacity: 0;
  transition: all ${transitionDuration.default}ms ease-in-out;
  border: 1px solid;

  .${anchorClassName}, a {
    font-size: inherit;
    line-height: inherit;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 2px;
    border-radius: 4px;
    color: inherit;

    &:hover,
    &:focus,
    &:focus-visible {
      outline: none;
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

export const toastThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.black};
    color: ${palette.white};
    border-color: ${palette.gray.dark2};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.light2};
    color: ${palette.black};
    border-color: ${palette.gray.light1};
  `,
};

export const contentWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: ${spacing[3]}px;
  width: 100%;
`;

export const baseIconStyle = css`
  height: 24px;
  width: 24px;
  flex-shrink: 0;
`;

export const textContentStyle = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const titleStyle = css`
  font-weight: bold;
  overflow: hidden;
`;

export const titleThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.white};
  `,
  [Theme.Dark]: css`
    color: ${palette.black};
  `,
};

export const descriptionStyle = css`
  overflow: hidden;
`;

export const descriptionThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light2};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark2};
  `,
};

export const dismissButtonStyle = css`
  width: ${spacing[3] + spacing[2]}px;
  height: ${spacing[3] + spacing[2]}px;
  // Counteract the margin added by hover state
  margin: -${spacing[1]}px;
  align-self: flex-start;
  transition: color ${transitionDuration.default}ms ease-in-out;

  &:focus-visible {
    outline: none;
  }
`;

export const dismissButtonThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark2};

    &:hover,
    &:focus-visible {
      &::before {
        background-color: ${palette.gray.light1};
      }
    }
  `,
};

export const variantIconStyle: Record<Variant, Record<Theme, string>> = {
  [Variant.Success]: {
    [Theme.Light]: css`
      color: ${palette.green.base};
    `,
    [Theme.Dark]: css`
      color: ${palette.green.dark1};
    `,
  },
  [Variant.Note]: {
    [Theme.Light]: css`
      color: ${palette.blue.light1};
    `,
    [Theme.Dark]: css`
      color: ${palette.blue.base};
    `,
  },
  [Variant.Warning]: {
    [Theme.Light]: css`
      color: ${palette.yellow.base};
    `,
    [Theme.Dark]: css`
      color: ${palette.yellow.dark2};
    `,
  },
  [Variant.Important]: {
    [Theme.Light]: css`
      color: ${palette.red.light1};
    `,
    [Theme.Dark]: css`
      color: ${palette.red.base};
    `,
  },
  [Variant.Progress]: {
    [Theme.Light]: css`
      color: ${palette.gray.light2};
    `,
    [Theme.Dark]: css`
      color: ${palette.gray.dark2};
    `,
  },
};

type TransitionStatus = Parameters<
  Extract<React.ComponentProps<typeof Transition>['children'], Function>
>[0];

export const toastTransitionStateStyles: Partial<
  Record<TransitionStatus, string>
> = {
  entered: css`
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  `,
};
