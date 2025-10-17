import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { borderRadius, color, spacing } from '@leafygreen-ui/tokens';

import { transitionDurations } from '../Accordion.styles';
import { VERTICAL_SPACING } from '../AccordionButton';

const getBaseStyles = (theme: Theme) => css`
  position: relative;
  display: flex;
  flex-direction: column;

  /* wedge default state */
  &:before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 6px;
    margin: ${VERTICAL_SPACING}px 0;
    border-radius: ${borderRadius[100]}px;

    transition-property: background-color, max-height;
    transition-duration: ${transitionDurations.expand}ms;
    transition-timing-function: ease-out;
    background-color: ${color[theme].icon.secondary.default};
    min-height: 28px;
    max-height: calc(100% - ${spacing[400]}px);
  }
`;

const getExpandedStyles = (theme: Theme) => css`
  /* wedge expanded state */
  &:before {
    background-color: ${color[theme].icon.success.default};
  }
`;

const getFocusVisibleStyles = (theme: Theme) => css`
  /* wedge focus-visible state */
  &:has(:focus-visible):before {
    background-color: ${color[theme].icon.secondary.focus};
  }
`;

export const getStyles = (
  theme: Theme,
  isExpanded: boolean,
  className?: string,
) =>
  cx(
    getBaseStyles(theme),
    {
      [getExpandedStyles(theme)]: isExpanded,
      [getFocusVisibleStyles(theme)]: !isExpanded,
    },
    className,
  );
