import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  breakpoints,
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

export const messageClassName = createUniqueClassName('lg-message');
export const senderClassName = createUniqueClassName('lg-message');
/** @deprecated */
export const avatarClassName = createUniqueClassName('lg-message-avatar');

// Unless otherwise indicated, styles are defined as left-aligned and mobile-first by default

const getBaseContainerStyles = (theme: Theme) => css`
  display: flex;
  gap: ${spacing[200]}px;
  align-items: flex-end;
  width: 100%;
  color: ${color[theme].text[Variant.Primary][InteractionState.Default]};

  &:not(:last-child) {
    margin-bottom: ${spacing[400]}px;
  }
`;

const rightAlignedStyles = css`
  justify-content: flex-end;
`;

const tabletContainerStyles = css`
  gap: ${spacing[400]}px;
`;

/**
 * @deprecated move this to MessageFeed
 */
const desktopContainerStyles = css`
  &:not(:last-child) {
    margin-bottom: ${spacing[600]}px;
  }
`;

export const getContainerStyles = ({
  className,
  isDesktop,
  isMobile,
  isRightAligned,
  isSender,
  theme,
}: {
  className?: string;
  isDesktop: boolean;
  isMobile: boolean;
  isRightAligned: boolean;
  isSender: boolean;
  theme: Theme;
}) =>
  cx(
    messageClassName,
    getBaseContainerStyles(theme),
    {
      [senderClassName]: isSender,
      [rightAlignedStyles]: isRightAligned,
      [tabletContainerStyles]: !isMobile,
      [desktopContainerStyles]: isDesktop,
    },
    className,
  );

const hiddenStyles = css`
  display: none;
`;

const invisibleStyles = css`
  display: block;
  visibility: hidden;
`;

export const getAvatarWrapperStyles = ({
  shouldHide,
  shouldBeInvisible,
}: {
  shouldHide: boolean;
  shouldBeInvisible: boolean;
}) =>
  cx(avatarClassName, {
    [hiddenStyles]: shouldHide,
    [invisibleStyles]: shouldBeInvisible,
  });

export const messageContainerWrapperStyles = css`
  max-width: ${breakpoints.Tablet}px;
`;

const sharedMessageContainerWedgeStyles = css`
  // Left wedge
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: ${spacing[200]}px;
    height: 100%;
    border-radius: 24px 0px 0px 24px;
  }
`;

const messageContainerWedgeStyles = {
  [Theme.Dark]: css`
    ${sharedMessageContainerWedgeStyles}
    &::before {
      background-color: ${palette.green.base};
    }
  `,
  [Theme.Light]: css`
    ${sharedMessageContainerWedgeStyles}
    &::before {
      background-color: ${palette.green.dark2};
    }
  `,
};

export const getMessageContainerWedgeStyles = ({
  showVerified,
  theme,
}: {
  showVerified: boolean;
  theme: Theme;
}) =>
  cx({
    [messageContainerWedgeStyles[theme]]: showVerified,
  });
