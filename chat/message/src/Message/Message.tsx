import React, {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Polymorph } from '@leafygreen-ui/polymorphic';
import { BaseFontSize, breakpoints } from '@leafygreen-ui/tokens';

import { VerifiedAnswerBanner } from '../MessageBanner';
import { MessageContainer, Variant } from '../MessageContainer';
import { MessageContent } from '../MessageContent';
import { MessageLinks } from '../MessageLinks';

import {
  avatarClassName,
  baseStyles,
  desktopBaseStyles,
  hiddenStyles,
  invisibleStyles,
  messageClassName,
  messageContainerWedgeStyles,
  messageContainerWrapperStyles,
  rightAlignedStyles,
  senderClassName,
  tabletBaseStyles,
} from './Message.styles';
import { Align } from './Message.types';
import { MessageProps } from '.';

export const Message = forwardRef(
  (
    {
      isSender = true,
      sourceType,
      avatar,
      align,
      messageBody,
      className,
      children,
      componentOverrides,
      links,
      linksHeading,
      markdownProps,
      verified,
      darkMode: darkModeProp,
      baseFontSize: baseFontSizeProp,
      ...rest
    }: MessageProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const { containerWidth } = useLeafyGreenChatContext();
    const fallbackRef = useRef<HTMLDivElement>(null);
    const ref =
      (forwardedRef as MutableRefObject<HTMLDivElement>) || fallbackRef;
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const isRightAligned = align === Align.Right || (!align && isSender);
    const isLeftAligned = align === Align.Left || (!align && !isSender);
    const [isRenderingAvatar, setIsRenderingAvatar] = useState<boolean>(true);
    const isMobile = () =>
      !!containerWidth && containerWidth < breakpoints.Tablet;
    const isDesktop = () =>
      !!containerWidth && containerWidth >= breakpoints.Desktop;
    const baseFontSize: BaseFontSize =
      baseFontSizeProp ??
      (isMobile() ? BaseFontSize.Body1 : BaseFontSize.Body2);

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
    }, [ref.current]);

    const isVerified = verified !== undefined;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          className={cx(
            baseStyles,
            messageClassName,
            {
              [senderClassName]: isSender,
              [rightAlignedStyles]: isRightAligned,
              [tabletBaseStyles]: !isMobile(),
              [desktopBaseStyles]: isDesktop(),
            },
            className,
          )}
          ref={ref}
          {...rest}
        >
          <div
            className={cx(avatarClassName, {
              [hiddenStyles]: isRightAligned && isMobile(),
              [invisibleStyles]:
                (isRightAligned && !isMobile()) || !isRenderingAvatar,
            })}
          >
            {avatar}
          </div>
          <div className={messageContainerWrapperStyles}>
            <Polymorph
              as={componentOverrides?.MessageContainer ?? MessageContainer}
              variant={isSender ? Variant.Primary : Variant.Secondary}
              className={cx({
                [messageContainerWedgeStyles[theme]]: isVerified,
              })}
            >
              {isVerified ? <VerifiedAnswerBanner {...verified} /> : null}
              <Polymorph
                as={componentOverrides?.MessageContent ?? MessageContent}
                sourceType={sourceType}
                baseFontSize={baseFontSize}
                {...markdownProps}
              >
                {messageBody ?? ''}
              </Polymorph>
              {links ? (
                <Polymorph
                  as={componentOverrides?.MessageLinks ?? MessageLinks}
                  headingText={linksHeading}
                  links={links}
                />
              ) : null}
              {children}
            </Polymorph>
          </div>
          <div
            className={cx(avatarClassName, {
              [hiddenStyles]: isLeftAligned && isMobile(),
              [invisibleStyles]:
                (isLeftAligned && !isMobile()) || !isRenderingAvatar,
            })}
          >
            {avatar}
          </div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

Message.displayName = 'Message';

export default Message;
