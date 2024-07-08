import { avatarSizes, Size } from '@lg-chat/avatar';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { breakpoints, spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const themeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.black};
  `,
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};
  `,
};

export const messageFeedStyles = css`
  width: 100%;
  max-width: ${breakpoints.Tablet +
  (avatarSizes[Size.Default] + spacing[5] + spacing[3]) * 2}px;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  position: relative;
  padding: ${spacing[3]}px ${spacing[5]}px ${spacing[2]}px;
  z-index: 2;
`;

export const messageFeedThemeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    // https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/
    background:
      /* Shadow Cover TOP */ 
      // eslint-disable-next-line Maintain natural line break
      linear-gradient(${palette.black} 30%, ${palette.black} 0%) center top,
      /* Shadow Cover BOTTOM */
        linear-gradient(${palette.black} 0%, ${palette.black} 70%) center bottom,
      /* Shadow TOP */
        radial-gradient(
          farthest-side at 50% 0,
          rgba(0, 0, 0, 0.3),
          rgba(0, 0, 0, 0)
        )
        center top,
      /* Shadow BOTTOM */
        radial-gradient(
          farthest-side at 50% 100%,
          rgba(0, 0, 0, 0.3),
          rgba(0, 0, 0, 0)
        )
        center bottom;
    background-repeat: no-repeat;
    background-size: 100% 16px, 100% 16px, 100% 8px, 100% 8px;
    background-attachment: local, local, scroll, scroll;
  `,
  [Theme.Light]: css`
    // https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/
    background:
      /* Shadow Cover TOP */ 
      // eslint-disable-next-line Maintain natural line break
      linear-gradient(${palette.gray.light3} 30%, ${palette.gray.light3} 0%)
        center top,
      /* Shadow Cover BOTTOM */
        linear-gradient(${palette.gray.light3} 0%, ${palette.gray.light3} 30%)
        center bottom,
      /* Shadow TOP */
        radial-gradient(
          farthest-side at 50% 0,
          rgba(0, 0, 0, 0.1),
          rgba(0, 0, 0, 0)
        )
        center top,
      /* Shadow BOTTOM */
        radial-gradient(
          farthest-side at 50% 100%,
          rgba(0, 0, 0, 0.1),
          rgba(0, 0, 0, 0)
        )
        center bottom;
    background-repeat: no-repeat;
    background-size: 100% 16px, 100% 16px, 100% 8px, 100% 8px;
    background-attachment: local, local, scroll, scroll;
  `,
};

// Avatar size + horizontal gap in Message
export const avatarPaddingStyles = css`
  padding: 0px ${avatarSizes[Size.Small] + spacing[2]}px;
`;

export const desktopAvatarPaddingStyles = css`
  padding: 0px ${avatarSizes[Size.Default] + spacing[3]}px;
`;

export const disclaimerTextStyles = css`
  text-align: center;
  margin-top: ${spacing[4]}px;
  margin-bottom: ${spacing[6]}px;
`;
