import { css } from '@leafygreen-ui/emotion';
import { contentClassName } from '@leafygreen-ui/popover';
import { spacing } from '@leafygreen-ui/tokens';

export const menuWrapperStyles = css`
  min-width: 265px; // width of "September" select trigger

  & > .${contentClassName} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const menuHeaderStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: ${spacing[3]}px;
`;

export const menuHeaderSelectContainerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[1]}px;
`;

export const menuCalendarGridStyles = css`
  margin: auto;
`;
