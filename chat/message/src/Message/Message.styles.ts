import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { breakpoints, spacing } from '@leafygreen-ui/tokens';

export const messageClassName = createUniqueClassName('lg-message');
export const senderClassName = createUniqueClassName('lg-message');
export const avatarClassName = createUniqueClassName('lg-message-avatar');

// Unless otherwise indicated, styles are defined as left-aligned and mobile-first by default

export const baseStyles = css`
  display: flex;
  gap: ${spacing[200]}px;
  align-items: flex-end;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: ${spacing[3]}px;
  }
`;

export const rightAlignedStyles = css`
  justify-content: flex-end;
`;

export const tabletBaseStyles = css`
  gap: ${spacing[3]}px;
`;

export const desktopBaseStyles = css`
  &:not(:last-child) {
    margin-bottom: ${spacing[4]}px;
  }
`;

export const hiddenStyles = css`
  display: none;
`;

export const invisibleStyles = css`
  display: block;
  visibility: hidden;
`;

export const messageContainerWrapperStyles = css`
  max-width: ${breakpoints.Tablet}px;
`;

const sharedMessageContainerWedgeStyles = css`
  // Left wedge
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: ${spacing[200]}px;
    height: 100%;
    border-radius: 24px 0px 0px 24px;
  }
`;

export const messageContainerWedgeStyles = {
  [Theme.Dark]: css`
    ${sharedMessageContainerWedgeStyles}
    &:before {
      background-color: ${palette.green.base};
    }
  `,
  [Theme.Light]: css`
    ${sharedMessageContainerWedgeStyles}
    &:before {
      background-color: ${palette.green.dark2};
    }
  `,
};
