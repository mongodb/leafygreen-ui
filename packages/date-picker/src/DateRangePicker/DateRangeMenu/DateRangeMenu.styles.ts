import { css } from '@leafygreen-ui/emotion';

import { calendarsClassName } from './DateRangeMenuCalendars/DateRangeMenuCalendars.styles';
import { quickSelectionClassName } from './QuickSelectionMenu/QuickSelectionMenu.styles';

export const rangeMenuWrapperStyles = css`
  padding: 0; // needs to be set by inner content
  z-index: 1;
`;

export const menuContentStyles = css`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content auto;
  grid-template-areas: 'quick-select calendars';
  z-index: 1;

  & > .${quickSelectionClassName} {
    grid-area: quick-select;
  }

  & > .${calendarsClassName} {
    grid-area: calendars;
  }
`;
