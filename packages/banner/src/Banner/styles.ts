import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, fontWeights } from '@leafygreen-ui/tokens';
import { anchorClassName } from '@leafygreen-ui/typography';

import { Variant } from './types';

export const baseBannerStyles = css`
  position: relative;
  display: flex;
  padding: 10px 12px 10px 20px;
  border-width: 1px 1px 1px 0px;
  border-style: solid;
  border-radius: 12px;
  font-family: ${fontFamilies.default};

  &:before {
    content: '';
    position: absolute;
    width: 13px;
    top: -1px;
    bottom: -1px;
    left: 0px;
    border-radius: 12px 0px 0px 12px;
  }
`;

const darkModeInfoBannerStyles = css`
  color: ${palette.blue.light2};
  border-color: ${palette.blue.dark2};
  border-left-color: ${palette.blue.light1};
  background-color: ${palette.blue.dark3};

  .${anchorClassName}, a {
    color: ${palette.blue.light3};

    &:hover {
      color: ${palette.blue.light2};
    }

    &:focus-visible {
      box-shadow: 0 0 0 5px ${palette.blue.dark3},
        0 0 0 7px ${palette.blue.light1};
    }
  }

  &:before {
    background: linear-gradient(
      to left,
      transparent 6px,
      ${palette.blue.light1} 6px
    );
  }
`;

const darkModeWarningBannerStyles = css`
  color: ${palette.yellow.light2};
  border-color: ${palette.yellow.dark2};
  border-left-color: ${palette.yellow.dark2};
  background-color: ${palette.yellow.dark3};

  .${anchorClassName}, a {
    color: ${palette.yellow.light3};

    &:hover {
      color: ${palette.yellow.light2};
    }

    &:focus-visible {
      box-shadow: 0 0 0 5px ${palette.yellow.dark3},
        0 0 0 7px ${palette.blue.light1};
    }
  }

  &:before {
    background: linear-gradient(
      to left,
      transparent 6px,
      ${palette.yellow.dark2} 6px
    );
  }
`;

const darkModeDangerBannerStyles = css`
  color: ${palette.red.light2};
  border-color: ${palette.red.dark2};
  border-left-color: ${palette.red.base};
  background-color: ${palette.red.dark3};

  .${anchorClassName}, a {
    color: ${palette.red.light3};

    &:hover {
      color: ${palette.red.light2};
    }

    &:focus-visible {
      box-shadow: 0 0 0 5px ${palette.red.dark3},
        0 0 0 7px ${palette.blue.light1};
    }
  }

  &:before {
    background: linear-gradient(
      to left,
      transparent 6px,
      ${palette.red.base} 6px
    );
  }
`;

const darkModeSuccessBannerStyles = css`
  color: ${palette.green.light2};
  border-color: ${palette.green.dark2};
  border-left-color: ${palette.green.base};
  background-color: ${palette.green.dark3};

  .${anchorClassName}, a {
    color: ${palette.green.light3};

    &:hover {
      color: ${palette.green.light2};
    }

    &:focus-visible {
      box-shadow: 0 0 0 5px ${palette.green.dark3},
        0 0 0 7px ${palette.blue.light1};
    }
  }

  &:before {
    background: linear-gradient(
      to left,
      transparent 6px,
      ${palette.green.base} 6px
    );
  }
`;

const lightModeInfoBannerStyles = css`
  color: ${palette.blue.dark2};
  border-color: ${palette.blue.light2};
  border-left-color: ${palette.blue.base};
  background-color: ${palette.blue.light3};

  .${anchorClassName}, a {
    color: ${palette.blue.dark3};

    &:hover {
      color: ${palette.blue.dark2};
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px ${palette.blue.light3}, 0 0 0 5px ${palette.white},
        0 0 0 7px ${palette.blue.light1};
    }
  }

  &:before {
    background: linear-gradient(
      to left,
      transparent 6px,
      ${palette.blue.base} 6px
    );
  }
`;

const lightModeWarningBannerStyles = css`
  color: ${palette.yellow.dark2};
  border-color: ${palette.yellow.light2};
  border-left-color: ${palette.yellow.base};
  background-color: ${palette.yellow.light3};

  .${anchorClassName}, a {
    color: ${palette.yellow.dark3};

    &:hover {
      color: ${palette.yellow.dark2};
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px ${palette.yellow.light3}, 0 0 0 5px ${palette.white},
        0 0 0 7px ${palette.blue.light1};
    }
  }

  &:before {
    background: linear-gradient(
      to left,
      transparent 6px,
      ${palette.yellow.base} 6px
    );
  }
`;

const lightModeDangerBannerStyles = css`
  color: ${palette.red.dark2};
  border-color: ${palette.red.light2};
  border-left-color: ${palette.red.base};
  background-color: ${palette.red.light3};

  .${anchorClassName}, a {
    color: ${palette.red.dark3};

    &:hover {
      color: ${palette.red.dark2};
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px ${palette.red.light3}, 0 0 0 5px ${palette.white},
        0 0 0 7px ${palette.blue.light1};
    }
  }

  &:before {
    background: linear-gradient(
      to left,
      transparent 6px,
      ${palette.red.base} 6px
    );
  }
`;

const lightModeSuccessBannerStyles = css`
  color: ${palette.green.dark2};
  border-color: ${palette.green.light2};
  border-left-color: ${palette.green.base};
  background-color: ${palette.green.light3};

  .${anchorClassName}, a {
    color: ${palette.green.dark3};

    &:hover {
      color: ${palette.green.dark2};
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px ${palette.green.light3}, 0 0 0 5px ${palette.white},
        0 0 0 7px ${palette.blue.light1};
    }
  }

  &:before {
    background: linear-gradient(
      to left,
      transparent 6px,
      ${palette.green.dark1} 6px
    );
  }
`;

export const variantStyles: Record<Theme, Record<Variant, string>> = {
  [Theme.Dark]: {
    [Variant.Info]: darkModeInfoBannerStyles,
    [Variant.Warning]: darkModeWarningBannerStyles,
    [Variant.Danger]: darkModeDangerBannerStyles,
    [Variant.Success]: darkModeSuccessBannerStyles,
  },
  [Theme.Light]: {
    [Variant.Info]: lightModeInfoBannerStyles,
    [Variant.Warning]: lightModeWarningBannerStyles,
    [Variant.Danger]: lightModeDangerBannerStyles,
    [Variant.Success]: lightModeSuccessBannerStyles,
  },
};

export const textStyles = (image: boolean, dismissible: boolean) => css`
  align-self: center;
  flex-grow: 1;
  margin-left: ${getTextMargins(image, dismissible).marginLeft};
  margin-right: ${getTextMargins(image, dismissible).marginRight};

  .${anchorClassName}, a {
    font-size: inherit;
    line-height: inherit;
    font-weight: ${fontWeights.bold};
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 2px;
    border-radius: 4px;
    display: inline;

    &:hover,
    &:focus,
    &:focus-visible {
      outline: none;
      span {
        &::after {
          display: none;
        }
      }
    }

    &:focus-visible {
      position: relative;
    }
  }
`;

export const getTextMargins = (image: boolean, dismissible: boolean) => {
  const defaultIconSize = 16;
  const defaultBorderSpacing = 12;

  const styleObj: {
    marginLeft?: string;
    marginRight?: string;
  } = {
    marginLeft: undefined,
    marginRight: undefined,
  };

  if (image) {
    styleObj.marginLeft = '17px';
    styleObj.marginRight = '4px';
    if (dismissible) {
      styleObj.marginRight = `${defaultIconSize + defaultBorderSpacing}px`;
    }
  } else {
    styleObj.marginLeft = `13px`;
    styleObj.marginRight = '10px';
    if (dismissible) {
      styleObj.marginRight = `${defaultIconSize + 16}px`;
    }
  }

  return styleObj;
};

export const bannerDismissibleStyles = css`
  padding-right: 36px; // add space for the icon
`;
