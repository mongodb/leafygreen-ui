import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { Variant } from '../Banner/types';

export const baseStyles = css`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 8px; // Icon is 24px(it's 24px to include hover background), in figma its 16px(does not include the hover background) (24px - 16px)/2 = 4. The space between the icon and the banner is 12px from the right, 12px - 4px = 8px
  top: 8px;
  flex-shrink: 0;
  cursor: pointer;
`;

const darkModeInfoStyles = css`
  color: ${palette.blue.light2};

  &:active,
  &:hover,
  &:focus-visible {
    color: ${palette.blue.light2};
    box-shadow: 0 0 0 2px ${palette.blue.dark3},
      0 0 0 4px ${palette.blue.light1};

    &:before {
      background-color: ${palette.blue.dark2};
    }
  }
`;

const darkModeWarningStyles = css`
  color: ${palette.yellow.light2};
  &:active,
  &:hover,
  &:focus-visible {
    color: ${palette.yellow.light2};
    box-shadow: 0 0 0 2px ${palette.yellow.dark3},
      0 0 0 4px ${palette.blue.light1};

    &:before {
      background-color: ${palette.yellow.dark2};
    }
  }
`;

const darkModeDangerStyles = css`
  color: ${palette.red.light2};

  &:active,
  &:hover,
  &:focus-visible {
    color: ${palette.red.light2};
    box-shadow: 0 0 0 2px ${palette.red.dark3}, 0 0 0 4px ${palette.blue.light1};

    &:before {
      background-color: ${palette.red.dark2};
    }
  }
`;

const darkModeSuccessStyles = css`
  color: ${palette.green.light2};

  &:active,
  &:hover,
  &:focus-visible {
    color: ${palette.green.light2};
    box-shadow: 0 0 0 2px ${palette.green.dark3},
      0 0 0 4px ${palette.blue.light1};

    &:before {
      background-color: ${palette.green.dark2};
    }
  }
`;

const lightModeInfoStyles = css`
  color: ${palette.blue.dark2};

  &:active,
  &:hover,
  &:focus-visible {
    color: ${palette.blue.dark2};

    &:before {
      background-color: ${palette.blue.light2};
    }
  }
`;

const lightModeWarningStyles = css`
  color: ${palette.yellow.dark2};

  &:active,
  &:hover,
  &:focus-visible {
    color: ${palette.yellow.dark2};

    &:before {
      background-color: ${palette.yellow.light2};
    }
  }
`;

const lightModeDangerStyles = css`
  color: ${palette.red.dark2};

  &:active,
  &:hover,
  &:focus-visible {
    color: ${palette.red.dark2};

    &:before {
      background-color: ${palette.red.light2};
    }
  }
`;

const lightModeSuccessStyles = css`
  color: ${palette.green.dark2};

  &:active,
  &:hover,
  &:focus-visible {
    color: ${palette.green.dark2};

    &:before {
      background-color: ${palette.green.light2};
    }
  }
`;

export const variantStyles: Record<Theme, Record<Variant, string>> = {
  [Theme.Dark]: {
    [Variant.Info]: darkModeInfoStyles,
    [Variant.Warning]: darkModeWarningStyles,
    [Variant.Danger]: darkModeDangerStyles,
    [Variant.Success]: darkModeSuccessStyles,
  },
  [Theme.Light]: {
    [Variant.Info]: lightModeInfoStyles,
    [Variant.Warning]: lightModeWarningStyles,
    [Variant.Danger]: lightModeDangerStyles,
    [Variant.Success]: lightModeSuccessStyles,
  },
};
