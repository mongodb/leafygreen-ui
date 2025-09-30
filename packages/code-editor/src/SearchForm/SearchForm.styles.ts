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
const SECTION_HEIGHT = 52;
const INPUT_WIDTH = 240;

const getBaseContainerStyles = (theme: Theme) => css`
  background-color: ${color[theme].background[Variant.Secondary][
    InteractionState.Default
  ]};
  border-bottom-left-radius: ${borderRadius[150]}px;
  border-bottom-right-radius: ${borderRadius[150]}px;
  width: 100%;
  max-width: ${CONTAINER_MAX_WIDTH}px;
  position: relative;
  display: grid;
  grid-template-rows: ${SECTION_HEIGHT}px 0fr;
  transition: grid-template-rows ${transitionDuration.slower}ms ease-in-out;
  z-index: 1;

  /** Add a shadow to the container while clipping the right edge*/
  &::after {
    content: '';

    /** Position the pseudo-element to match the parent's size and location */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    /** Apply the shadow to the pseudo-element */
    box-shadow: ${shadow[theme][100]};

    /** Negative values expand the clipping area outward, revealing the shadow. */
    /** A zero value clips the shadow exactly at the element's edge. */
    clip-path: inset(-20px 0px -20px -20px);

    /** Match the parent's border-radius for consistency */
    border-radius: inherit;

    /** Places the pseudo-element behind the parent element */
    z-index: -1;
  }
`;

const openContainerStyles = css`
  grid-template-rows: ${SECTION_HEIGHT}px 1fr;
`;

export const getContainerStyles = ({
  theme,
  isOpen,
}: {
  theme: Theme;
  isOpen: boolean;
}) =>
  cx(getBaseContainerStyles(theme), {
    [openContainerStyles]: isOpen,
  });

export const findSectionStyles = css`
  display: flex;
  align-items: center;
  padding: ${spacing[200]}px ${spacing[300]}px;
  height: 100%;
`;

export const replaceSectionStyles = css`
  min-height: 0;
  overflow: hidden;
`;

/**
 * Inner section used for padding and border so that the outer section can
 * fully close to 0px when set to 0fr.
 */
export const getReplaceInnerSectionStyles = (theme: Theme) => css`
  display: flex;
  align-items: center;
  padding: 8px 10px 8px 44px;
  border-top: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
`;

export const toggleButtonStyles = css`
  margin-right: ${spacing[100]}px;
`;

const toggleIconStyles = css`
  transform: rotate(-180deg);
  transition: transform ${transitionDuration.slower}ms ease-in-out;
`;

const openToggleIconStyles = css`
  transform: rotate(0deg);
`;

export const getToggleIconStyles = (isOpen: boolean) =>
  cx(toggleIconStyles, {
    [openToggleIconStyles]: isOpen,
  });

export const findInputContainerStyles = css`
  position: relative;
  flex: 1 1 ${INPUT_WIDTH}px;
  min-width: 100px;
  max-width: ${INPUT_WIDTH}px;
  margin-right: ${spacing[100]}px;
`;

export const allButtonStyles = css`
  margin-left: ${spacing[100]}px;
`;

export const closeButtonStyles = css`
  margin-left: auto;
`;

export const findInputIconButtonStyles = css`
  position: absolute;
  right: ${spacing[100]}px;
  top: ${spacing[100]}px;
`;

export const replaceInputContainerStyles = css`
  position: relative;
  flex: 1 1 ${INPUT_WIDTH}px;
  min-width: 100px;
  max-width: ${INPUT_WIDTH}px;
  width: 100%;
`;

export const replaceButtonStyles = css`
  margin-left: ${spacing[100]}px;
`;

export const findInputStyles = css`
  width: 100%;
`;
