import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, typeScales } from '@leafygreen-ui/tokens';

import { transitionDurations } from '../Accordion.styles';
import { HORIZONTAL_SPACING, VERTICAL_SPACING } from '../AccordionButton';

const getBaseStyles = (theme: Theme) => css`
  height: 100%;
  padding-left: ${HORIZONTAL_SPACING}px;
  padding-right: ${HORIZONTAL_SPACING}px;
  color: ${color[theme].text.secondary.default};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;

  transition-property: max-height, opacity, margin-bottom;
  transition-duration: ${transitionDurations.expand}ms;
  transition-timing-function: ease-out;
  max-height: 0;
  opacity: 0;
  margin-bottom: 0;
`;

const getExpandedStyles = (height: number) => css`
  max-height: ${height}px;
  opacity: 1;
  margin-bottom: ${VERTICAL_SPACING}px;
`;

export const getStyles = (
  theme: Theme,
  isEnterState: boolean,
  height: number,
  className?: string,
) =>
  cx(
    getBaseStyles(theme),
    { [getExpandedStyles(height)]: isEnterState },
    className,
  );
