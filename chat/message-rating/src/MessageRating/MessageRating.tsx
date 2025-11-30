import React, { ForwardedRef, forwardRef, useCallback, useRef } from 'react';

import { useControlledValue, useIdAllocator } from '@leafygreen-ui/hooks';
import ThumbsDown from '@leafygreen-ui/icon/dist/ThumbsDown';
import ThumbsUp from '@leafygreen-ui/icon/dist/ThumbsUp';
import { IconButton } from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { spacing as spacingToken } from '@leafygreen-ui/tokens';
import { Justify, Tooltip, TooltipVariant } from '@leafygreen-ui/tooltip';

import {
  buttonContainerStyles,
  getContainerStyles,
  getIconButtonStyles,
} from './MessageRating.styles';
import {
  type MessageRatingProps,
  MessageRatingValue,
} from './MessageRating.types';

export const MessageRating = forwardRef(
  (
    {
      className,
      darkMode: darkModeProp,
      hideThumbsDown = false,
      hideThumbsUp = false,
      onChange,
      value: valueProp,
      ...rest
    }: MessageRatingProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);

    const likeButtonRef = useRef<HTMLButtonElement | null>(null);
    const dislikeButtonRef = useRef<HTMLButtonElement | null>(null);

    const { value, updateValue } = useControlledValue<
      MessageRatingProps['value']
    >(valueProp, onChange, MessageRatingValue.Unselected);
    const inputName = useIdAllocator({
      prefix: 'message-rating',
    });

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>, val: MessageRatingValue) => {
        e.preventDefault();

        const refToUpdate =
          val === MessageRatingValue.Liked ? likeButtonRef : dislikeButtonRef;

        updateValue(val, refToUpdate);
      },
      [updateValue],
    );

    const handleLikeClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        handleClick(e, MessageRatingValue.Liked);
      },
      [handleClick],
    );

    const handleDislikeClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        handleClick(e, MessageRatingValue.Disliked);
      },
      [handleClick],
    );

    const isLiked = value === 'liked';
    const isDisliked = value === 'disliked';

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={getContainerStyles(className)} {...rest} ref={ref}>
          <div
            aria-label="Message rating"
            className={buttonContainerStyles}
            role="radiogroup"
          >
            <Tooltip
              justify={Justify.Middle}
              spacing={spacingToken[100]}
              trigger={
                <IconButton
                  id={`like-${inputName}`}
                  aria-label="Like this message"
                  value="liked"
                  onClick={handleLikeClick}
                  active={isLiked}
                  ref={likeButtonRef}
                  className={getIconButtonStyles({
                    isActive: isLiked,
                    isHidden: hideThumbsUp,
                  })}
                  aria-checked={isLiked}
                  role="radio"
                >
                  <ThumbsUp />
                </IconButton>
              }
              variant={TooltipVariant.Compact}
            >
              Helpful
            </Tooltip>
            <Tooltip
              justify={Justify.Middle}
              spacing={spacingToken[100]}
              trigger={
                <IconButton
                  id={`dislike-${inputName}`}
                  aria-label="Dislike this message"
                  value="disliked"
                  onClick={handleDislikeClick}
                  active={isDisliked}
                  ref={dislikeButtonRef}
                  className={getIconButtonStyles({
                    isActive: isDisliked,
                    isHidden: hideThumbsDown,
                  })}
                  aria-checked={isDisliked}
                  role="radio"
                >
                  <ThumbsDown />
                </IconButton>
              }
              variant={TooltipVariant.Compact}
            >
              Not helpful
            </Tooltip>
          </div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

MessageRating.displayName = 'MessageRating';
