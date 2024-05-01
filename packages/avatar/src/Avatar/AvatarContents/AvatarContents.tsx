import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { MongoDBLogoMark, SupportedColors } from '@leafygreen-ui/logo';

import { AvatarProps, Format } from '../Avatar.types';

import {
  baseIconAvatarContentStyles,
  getTextAvatarContentStyles,
  singleInitialStyles,
} from './AvatarContents.style';

export const AvatarContents = ({
  format,
  size,
  text,
  glyph = 'Person',
}: AvatarProps) => {
  const { theme } = useDarkMode();

  switch (format) {
    case Format.MongoDB: {
      return (
        <MongoDBLogoMark
          className={baseIconAvatarContentStyles}
          color={SupportedColors.GreenBase}
        />
      );
    }

    case Format.Text: {
      return (
        <span
          aria-hidden
          className={cx(getTextAvatarContentStyles({ size, theme, format }), {
            [singleInitialStyles]: text.length === 1,
          })}
        >
          {text}
        </span>
      );
    }

    case Format.Icon:
    default: {
      return <Icon className={baseIconAvatarContentStyles} glyph={glyph} />;
    }
  }
};
