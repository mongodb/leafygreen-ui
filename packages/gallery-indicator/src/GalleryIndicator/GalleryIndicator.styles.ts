import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { Variant } from './GalleryIndicator.types';

const TRANSITION_DURATION_SLOW = transitionDuration.slower;
const TRANSITION_DURATION_DEFAULT = transitionDuration.default;
const DOT_SIZE = 6;
const ACTIVE_DOT_SIZE = 20;

export const getGalleryIndicatorStyles = ({
  className,
}: {
  className?: string;
}) =>
  cx(
    css`
      all: unset;
      padding: 0;
      margin: 0;
      list-style-type: none;
      display: flex;
      gap: ${spacing[100]}px;
    `,
    className,
  );

const baseColorSet: Record<Theme, Record<Variant, string>> = {
  [Theme.Light]: {
    [Variant.Default]: palette.gray.light2,
    [Variant.BaseGreen]: palette.green.light3,
  },
  [Theme.Dark]: {
    [Variant.Default]: palette.gray.dark2,
    [Variant.BaseGreen]: palette.green.dark2,
  },
};

const activeColorSet: Record<Theme, Record<Variant, string>> = {
  [Theme.Light]: {
    [Variant.Default]: palette.gray.base,
    [Variant.BaseGreen]: palette.green.base,
  },
  [Theme.Dark]: {
    [Variant.Default]: palette.gray.base,
    [Variant.BaseGreen]: palette.green.base,
  },
};

export const getIndicatorStyles = ({
  theme,
  isActive,
  variant,
}: {
  theme: Theme;
  isActive: boolean;
  variant: Variant;
}) => {
  const baseColor = baseColorSet[theme][variant];
  const activeColor = activeColorSet[theme][variant];

  return cx(
    css`
      &::after {
        content: '';
        display: block;
        width: ${DOT_SIZE}px;
        height: ${DOT_SIZE}px;
        background-color: ${baseColor};
        border-radius: 50%;
        transition-property: background-color, width, border-radius;
        transition-duration: ${TRANSITION_DURATION_SLOW}ms,
          ${TRANSITION_DURATION_DEFAULT}ms, ${TRANSITION_DURATION_DEFAULT}ms;
        transition-timing-function: ease-in-out;
      }
    `,
    {
      [css`
        &::after {
          width: ${ACTIVE_DOT_SIZE}px;
          border-radius: 100px;
          background-color: ${activeColor};
        }
      `]: isActive,
    },
  );
};
