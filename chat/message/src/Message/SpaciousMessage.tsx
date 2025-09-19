import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';

import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Polymorph } from '@leafygreen-ui/polymorphic';
import { BaseFontSize, breakpoints } from '@leafygreen-ui/tokens';

import { MessageVerifiedBanner } from '../MessageBanner';
import {
  MessageContainer,
  Variant as MessageContainerVariant,
} from '../MessageContainer';
import { MessageContent } from '../MessageContent';
import { MessageLinks } from '../MessageLinks';
import { MessagePromotion } from '../MessagePromotion/MessagePromotion';

import { Align, type MessageProps } from './Message.types';
import {
  getAvatarWrapperStyles,
  getContainerStyles,
  getMessageContainerWedgeStyles,
  messageClassName,
  messageContainerWrapperStyles,
  senderClassName,
} from './SpaciousMessage.styles';

export const SpaciousMessage = forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      align,
      avatar,
      baseFontSize: baseFontSizeProp,
      children,
      className,
      componentOverrides,
      isSender = true,
      promotion,
      promotionUrl,
      onPromotionClick,
      links,
      linksHeading,
      markdownProps,
      messageBody,
      onLinkClick,
      sourceType,
      verified,
      ...rest
    },
    fwdRef,
  ) => {
    const [isRenderingAvatar, setIsRenderingAvatar] = useState<boolean>(true);
    const { theme } = useDarkMode();
    const { containerWidth } = useLeafyGreenChatContext();

    const ref = useForwardedRef(fwdRef, null);

    useEffect(() => {
      // determine whether the avatar should be rendered
      if (ref.current) {
        if (
          ref.current.nextElementSibling &&
          ref.current.nextElementSibling.classList.contains(messageClassName)
        ) {
          const isLastSender =
            isSender &&
            !ref.current.nextElementSibling.classList.contains(senderClassName);
          const isLastNonSender =
            !isSender &&
            ref.current.nextElementSibling.classList.contains(senderClassName);
          setIsRenderingAvatar(isLastSender || isLastNonSender);
        } else {
          // no next element sibling or if next sibling is not a message, so should render avatar
          setIsRenderingAvatar(true);
        }
      }
    }, [isSender, ref]);

    const isVerified = verified !== undefined;
    const isLeftAligned = align === Align.Left || (!align && !isSender);
    const isRightAligned = align === Align.Right || (!align && isSender);
    const isMobile = useMemo(
      () => !!containerWidth && containerWidth < breakpoints.Tablet,
      [containerWidth],
    );
    const isDesktop = useMemo(
      () => !!containerWidth && containerWidth >= breakpoints.Desktop,
      [containerWidth],
    );
    const baseFontSize: BaseFontSize =
      baseFontSizeProp ?? (isMobile ? BaseFontSize.Body1 : BaseFontSize.Body2);

    return (
      <div
        className={getContainerStyles({
          className,
          isDesktop,
          isMobile,
          isRightAligned,
          isSender,
          theme,
        })}
        ref={ref}
        {...rest}
      >
        <div
          className={getAvatarWrapperStyles({
            shouldHide: isRightAligned && isMobile,
            shouldBeInvisible:
              (isRightAligned && !isMobile) || !isRenderingAvatar,
          })}
        >
          {avatar}
        </div>
        <div className={messageContainerWrapperStyles}>
          <Polymorph
            as={componentOverrides?.MessageContainer ?? MessageContainer}
            variant={
              isSender
                ? MessageContainerVariant.Primary
                : MessageContainerVariant.Secondary
            }
            className={getMessageContainerWedgeStyles({
              showVerified: isVerified,
              theme,
            })}
          >
            {isVerified ? <MessageVerifiedBanner {...verified} /> : null}
            <Polymorph
              as={componentOverrides?.MessageContent ?? MessageContent}
              sourceType={sourceType}
              baseFontSize={baseFontSize}
              {...markdownProps}
            >
              {messageBody ?? ''}
            </Polymorph>
            {promotion && promotionUrl ? (
              <Polymorph
                as={componentOverrides?.MessagePromotion ?? MessagePromotion}
                promotionText={promotion}
                promotionUrl={promotionUrl}
                baseFontSize={baseFontSize}
                onPromotionClick={onPromotionClick}
                {...markdownProps}
              />
            ) : null}
            {links ? (
              <Polymorph
                as={componentOverrides?.MessageLinks ?? MessageLinks}
                headingText={linksHeading}
                links={links}
                onLinkClick={onLinkClick}
              />
            ) : null}
            {children}
          </Polymorph>
        </div>
        <div
          className={getAvatarWrapperStyles({
            shouldHide: isLeftAligned && isMobile,
            shouldBeInvisible:
              (isLeftAligned && !isMobile) || !isRenderingAvatar,
          })}
        >
          {avatar}
        </div>
      </div>
    );
  },
);

SpaciousMessage.displayName = 'SpaciousMessage';
