import React, { ForwardedRef, forwardRef, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import ThumbsDown from '@leafygreen-ui/icon/dist/ThumbsDown';
import ThumbsUp from '@leafygreen-ui/icon/dist/ThumbsUp';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Description } from '@leafygreen-ui/typography';

import { RadioButton } from '../RadioButton/RadioButton';

import {
  baseStyles,
  buttonContainerStyles,
  getIconFill,
  hiddenStyles,
} from './MessageRating.styles';
import { MessageRatingProps } from '.';

export const MessageRating = forwardRef(
  (
    {
      description = 'How was the response?',
      className,
      value,
      onChange: onChangeProp,
      darkMode: darkModeProp,
      hideThumbsDown,
      hideThumbsUp,
      ...rest
    }: MessageRatingProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const isControlled = value !== undefined;
    const [localValue, setLocalValue] = useState<MessageRatingProps['value']>();
    const { darkMode } = useDarkMode(darkModeProp);

    const isLiked = isControlled ? value === 'liked' : localValue === 'liked';
    const isDisliked = isControlled
      ? value === 'disliked'
      : localValue === 'disliked';

    const inputName = useIdAllocator({
      prefix: 'message-rating',
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeProp(e);

      if (!isControlled) {
        setLocalValue(e.target.value as MessageRatingProps['value']);
      }
    };

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={cx(baseStyles, className)} {...rest} ref={ref}>
          <Description>{description}</Description>
          <div className={buttonContainerStyles}>
            <RadioButton
              id={`like-${inputName}`}
              aria-label="Thumbs up this message"
              name={inputName}
              value="liked"
              onChange={onChange}
              checked={isLiked}
              className={cx({ [hiddenStyles]: hideThumbsUp })}
            >
              <ThumbsUp fill={getIconFill(darkMode, isLiked)} />
            </RadioButton>
            <RadioButton
              id={`dislike-${inputName}`}
              name={inputName}
              value="disliked"
              aria-label="Thumbs down this message"
              onChange={onChange}
              checked={isDisliked}
              className={cx({ [hiddenStyles]: hideThumbsDown })}
            >
              <ThumbsDown fill={getIconFill(darkMode, isDisliked)} />
            </RadioButton>
          </div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

MessageRating.displayName = 'MessageRating';
