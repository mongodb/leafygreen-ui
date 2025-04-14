import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, focusRing, spacing } from '@leafygreen-ui/tokens';

export const getBaseStyles = ({ theme }: { theme: Theme }) => css`
  margin: 0;
  padding: 0;
  list-style: none;
  height: 100%;
  width: ${spacing[1200]}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${color[theme].background.primary.default};
  border: 1px solid ${color[theme].border.secondary.default};

  // Show the focus ring on the toolbar itself when a child element is focused and only when navigating with a keyboard
  &:has(:focus-visible) {
    box-shadow: ${focusRing[theme].default};
  }
`;
