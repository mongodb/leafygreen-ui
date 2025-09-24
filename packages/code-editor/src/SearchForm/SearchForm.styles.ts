import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  InteractionState,
  shadow,
  spacing,
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';
import { color } from '@leafygreen-ui/tokens';

const CONTAINER_MAX_WIDTH = 500;

export const getSearchFormContainerStyles = (theme: Theme) => css`
  background-color: ${color[theme].background[Variant.Secondary][
    InteractionState.Default
  ]};
  border-bottom-left-radius: ${borderRadius[150]}px;
  border-bottom-right-radius: ${borderRadius[150]}px;
  box-shadow: ${shadow[theme][100]};
  max-width: ${CONTAINER_MAX_WIDTH}px;
  width: 100%;
`;

export const findSectionStyles = css`
  display: grid;
  grid-template-columns: auto 1fr repeat(4, auto);
  align-items: center;
  gap: 0 ${spacing[100]}px;
  padding: 8px 10px 8px;
`;

export const toggleIconStyles = css`
  transform: rotate(-180deg);
  transition: transform ${transitionDuration.slower}ms ease-in-out;
`;

export const openToggleIconStyles = css`
  transform: rotate(0deg);
`;

export const toggleButtonStyles = css``;

export const getIconStyles = (isOpen: boolean) =>
  cx(toggleIconStyles, {
    [openToggleIconStyles]: isOpen,
  });

export const findInputContainerStyles = css`
  position: relative;
`;

export const findInputIconButtonStyles = css`
  position: absolute;
  right: ${spacing[100]}px;
  top: ${spacing[100]}px;
`;
