import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

import { menuColor } from '../styles';

export const getFocusableMenuItemWrapperStyles = (theme: Theme) => css`
  padding: ${spacing[100]}px;
  cursor: unset;
  background-color: ${menuColor[theme].background.default};
`;
