import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { spacing, typeScales } from '@leafygreen-ui/tokens';

const calendarGapX = spacing[4] * 2;

export const calendarsClassName = createUniqueClassName(
  'date-range-menu-calendars',
);

export const calendarsFrameStyles = css`
  display: grid;
  grid-template-rows: 28px auto; // Size of icon-button
  grid-template-areas: 'header' 'calendars';
  gap: ${spacing[3]}px;
  padding: ${spacing[4]}px;
  /* padding-top: ${spacing[6]}px; */
`;

export const calendarsContainerStyles = css`
  grid-area: calendars;
  display: flex;
  gap: ${calendarGapX}px;
  align-items: start;
  height: fit-content;
`;

export const calendarHeadersContainerStyle = css`
  grid-area: header;
  display: flex;
  gap: ${calendarGapX}px;
  align-items: center;
`;

export const calendarHeaderStyles = css`
  display: flex;

  width: 100%;
  align-items: center;

  h6 {
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    width: 100%;
    text-align: center;
  }
`;
