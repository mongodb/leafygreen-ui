import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { MongoDBLogoMark, SupportedColors } from '@leafygreen-ui/logo';

import { AvatarProps, AvatarSize, Format } from '../Avatar.types';

import {
  getAvatarIconStyles,
  getAvatarLogoStyles,
  getAvatarTextStyles,
  singleInitialStyles,
} from './AvatarContents.style';

const MAX_CHARS = 2;

export const AvatarContents = ({
  format,
  text,
  size = AvatarSize.Default,
  glyph = 'Person',
  sizeOverride,
}: AvatarProps) => {
  const { theme } = useDarkMode();

  if (format == Format.Text && (!text || text.length <= 0)) {
    format = Format.Icon;
  }

  switch (format) {
    case Format.MongoDB: {
      return (
        <MongoDBLogoMark
          className={getAvatarLogoStyles({})}
          color={SupportedColors.GreenBase}
        />
      );
    }

    case Format.Text: {
      return (
        <span
          aria-hidden
          className={cx(
            getAvatarTextStyles({ size, theme, format, sizeOverride }),
            {
              [singleInitialStyles]: text?.length === 1,
            },
          )}
        >
          {text?.slice(0, MAX_CHARS - 1)}
        </span>
      );
    }

    case Format.Icon:
    default: {
      return (
        <Icon
          size={size}
          glyph={glyph}
          className={getAvatarIconStyles({ sizeOverride })}
        />
      );
    }
  }
};
