import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  fontFamilies,
  fontWeights,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';

export const titleClassName = createUniqueClassName('search-result-title');
export const descriptionClassName = createUniqueClassName(
  'search-result-description',
);

export const searchResultStyles = css`
  display: block;
  font-family: ${fontFamilies.default};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${spacing[3]}px;
  padding: ${spacing[1]}px ${spacing[3]}px;

  & .${titleClassName} {
    font-weight: ${fontWeights.bold};
  }
`;

export const searchResultThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    & .${titleClassName} {
      color: ${palette.black};
    }
    & .${descriptionClassName} {
      color: ${palette.gray.dark1};
    }
  `,
  [Theme.Dark]: css`
    & .${titleClassName} {
      color: ${palette.gray.light2};
    }
    & .${descriptionClassName} {
      color: ${palette.gray.light1};
    }
  `,
};

export const searchResultDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    & .${titleClassName} {
      color: ${palette.gray.light1};
    }
    & .${descriptionClassName} {
      color: ${palette.gray.light1};
    }
  `,
  [Theme.Dark]: css`
    & .${titleClassName} {
      color: ${palette.gray.dark1};
    }
    & .${descriptionClassName} {
      color: ${palette.gray.dark1};
    }
  `,
};

export const descriptionStyle = css`
  max-height: ${spacing[3] * 3}px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
