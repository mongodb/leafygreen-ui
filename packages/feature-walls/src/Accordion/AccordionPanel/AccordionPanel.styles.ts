import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, typeScales } from '@leafygreen-ui/tokens';

import { transitionDurations } from '../Accordion.styles';
import { HORIZONTAL_SPACING, VERTICAL_SPACING } from '../AccordionButton';

const baseGridStyles = css`
  display: grid;
  transition-property: grid-template-rows, margin-bottom, opacity;
  transition-duration: ${transitionDurations.expand}ms;
  transition-timing-function: ease-in-out;
  grid-template-rows: 0fr;
  margin-bottom: 0;
  opacity: 0.6;
`;

const expandedGridStyles = css`
  grid-template-rows: 1fr;
  margin-bottom: ${VERTICAL_SPACING}px;
  opacity: 1;
`;

export const getGridStyles = ({
  className,
  isExpanded,
}: {
  className?: string;
  isExpanded: boolean;
}) => cx(baseGridStyles, { [expandedGridStyles]: isExpanded }, className);

export const getContentWrapperStyles = (theme: Theme) => css`
  overflow: hidden;
  min-height: 0;
  padding-left: ${HORIZONTAL_SPACING}px;
  padding-right: ${HORIZONTAL_SPACING}px;
  color: ${color[theme].text.secondary.default};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
`;
