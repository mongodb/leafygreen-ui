import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  transitionDuration,
  typeScales,
  Variant,
} from '@leafygreen-ui/tokens';

import {
  PINNED_SIDE_NAV_WIDTH,
  SIDE_NAV_TRANSITION_DURATION,
} from '../../constants';

const CHAT_SIDE_NAV_ITEM_HEIGHT = 32;
const WEDGE_HEIGHT_BOUND = 6;
const WEDGE_WIDTH = 4;

const getBaseStyles = (theme: Theme) => css`
  // Layout
  position: relative;
  width: ${PINNED_SIDE_NAV_WIDTH}px;
  min-height: ${CHAT_SIDE_NAV_ITEM_HEIGHT}px;
  padding: ${spacing[150]}px ${spacing[400]}px;
  display: flex;
  align-items: center;

  // Typography
  font-family: ${fontFamilies.default};
  font-weight: ${fontWeights.regular};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  text-align: left;
  text-decoration: none;
  color: ${color[theme].text[Variant.Primary][InteractionState.Default]};

  // Stateful transitions
  transition: background-color ${transitionDuration.faster}ms ease-in-out,
    opacity ${SIDE_NAV_TRANSITION_DURATION}ms ease-in-out;

  &::before {
    content: '';
    position: absolute;
    background-color: transparent;
    left: 0;
    top: ${WEDGE_HEIGHT_BOUND}px;
    bottom: ${WEDGE_HEIGHT_BOUND}px;
    width: ${WEDGE_WIDTH}px;
    border-radius: 0 ${borderRadius[150]}px ${borderRadius[150]}px 0;
    transition: transform ${transitionDuration.default}ms ease-in-out;
    transform: scaleY(0.3);
  }

  &:hover {
    text-decoration: none;
    background-color: ${color[theme].background[Variant.Secondary][
      InteractionState.Hover
    ]};
  }

  &:focus-visible {
    outline: none;
    text-decoration: none;
    background-color: ${color[theme].background[Variant.Secondary][
      InteractionState.Focus
    ]};
    color: ${color[theme].text[Variant.Primary][InteractionState.Focus]};

    &::before {
      transform: scaleY(1);
      background-color: ${color[theme].icon[Variant.Info][
        InteractionState.Focus
      ]};
    }
  }
`;

const getActiveStyles = (theme: Theme) => css`
  cursor: default;
  font-weight: ${fontWeights.semiBold};
  text-decoration: none;
  color: ${theme === Theme.Light ? palette.green.dark2 : palette.white};

  &,
  &:hover {
    background-color: ${color[theme].background[Variant.Success][
      InteractionState.Hover
    ]};
  }

  &::before {
    transform: scaleY(1);
    background-color: ${color[theme].icon[Variant.Success][
      InteractionState.Default
    ]};
  }
`;

const collapsedItemStyles = css`
  opacity: 0;
`;

export const getItemStyles = ({
  active = false,
  className,
  shouldRenderExpanded,
  theme,
}: {
  active?: boolean;
  className?: string;
  shouldRenderExpanded: boolean;
  theme: Theme;
}) =>
  cx(
    getBaseStyles(theme),
    {
      [getActiveStyles(theme)]: active,
      [collapsedItemStyles]: !shouldRenderExpanded,
    },
    className,
  );

export const textOverflowStyles = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
`;
