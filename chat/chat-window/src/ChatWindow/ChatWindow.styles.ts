import { avatarSizes, Size } from '@lg-chat/avatar';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { breakpoints, spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  width: 100%;
  border: 1px solid;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

export const themeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    border-color: ${palette.gray.dark2};
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
    background-color: ${palette.black};
  `,
  [Theme.Light]: css`
    border-color: ${palette.gray.light2};
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
    background: ${palette.gray.light3};
  `,
};

export const contentContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const lgInputBarContainerStyles = css`
  width: 100%;
  padding: ${spacing[5]}px;
  padding-top: ${spacing[3]}px;
  display: flex;
  justify-content: center;
`;

export const mobileInputBarContainerStyles = css`
  padding-top: ${spacing[2]}px;
`;

export const lgInputBarStyles = css`
  width: 100%;
  max-width: ${breakpoints.Tablet}px;
`;

// Avatar size + horizontal gap in Message
const avatarPadding = avatarSizes[Size.Default] + spacing[3];

export const avatarPaddingStyles = css`
  padding: 0px ${avatarPadding}px;
`;

export const inputBarPaddingStyles = css`
  // InputBar has padding of: avatarPadding + MessageFeed padding to align with MessageContainer
  padding-left: ${avatarPadding + spacing[5]}px;
  padding-right: ${avatarPadding + spacing[5]}px;
`;
