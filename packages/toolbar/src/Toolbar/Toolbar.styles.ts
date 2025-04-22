import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, focusRing } from '@leafygreen-ui/tokens';

export const getBaseStyles = ({
  theme,
  className,
}: {
  theme: Theme;
  className?: string;
}) =>
  cx(
    css`
      height: 100%;
      width: ${TOOLBAR_WIDTH}px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: ${color[theme].background.primary.default};
      border: 1px solid ${color[theme].border.secondary.default};

      // Show the focus ring on the toolbar itself when a child element is focused and only when navigating with a keyboard
      &:has(:focus-visible) {
        box-shadow: ${focusRing[theme].default};
      }
    `,
    className,
  );
