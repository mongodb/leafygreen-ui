import { transparentize } from 'polished';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const searchResultsMenuStyles = css`
  background-color: ${palette.white};
  box-shadow: 0px 4px 4px ${transparentize(0.75, '#000000')};
  padding: ${spacing[2]}px 0;
  border-radius: 12px;
`;

export const searchResultsListStyles = css`
  padding: 0;
  margin: 0;
`