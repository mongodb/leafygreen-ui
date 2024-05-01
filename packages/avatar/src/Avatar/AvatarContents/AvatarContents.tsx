import React from 'react';

import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { MongoDBLogoMark, SupportedColors } from '@leafygreen-ui/logo';

import { AvatarProps, Format } from '../Avatar.types';

import {
  baseIconAvatarContentStyles,
  getTextAvatarContentStyles,
} from './AvatarContents.style';

export const AvatarContents = ({ format, size }: AvatarProps) => {
  const { theme } = useDarkMode();

  switch (format) {
    case Format.GivenInitial: {
      return (
        <span
          aria-hidden
          className={getTextAvatarContentStyles({ size, theme, format })}
        >
          A
        </span>
      );
    }

    case Format.Initials: {
      return (
        <span
          aria-hidden
          className={getTextAvatarContentStyles({ size, theme, format })}
        >
          AT
        </span>
      );
    }

    case Format.MongoDB: {
      return (
        <MongoDBLogoMark
          className={baseIconAvatarContentStyles}
          color={SupportedColors.GreenBase}
        />
      );
    }

    case Format.Government: {
      return (
        <Icon
          className={baseIconAvatarContentStyles}
          glyph="GovernmentBuilding"
        />
      );
    }

    case Format.Default:
    default: {
      return <Icon className={baseIconAvatarContentStyles} glyph="Person" />;
    }
  }
};
