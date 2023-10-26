import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  fontFamilies,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { CheckedVariant } from './InputOption.types';

export const titleClassName = createUniqueClassName('input-option-title');
export const descriptionClassName = createUniqueClassName(
  'input-option-description',
);

const hoverSelector = '&:hover, &[data-hover="true"]';
const focusSelector = '&:focus, &:focus-visible, &[data-focus="true"]';

interface ThemeTypes {
  color: string;
  bgColorHover: string;
  colorDestructive: string;
  colorDisabled: string;
  active: Record<
    CheckedVariant,
    {
      bgColor: string;
      color: string;
      bgColorWedge: string;
    }
  >;
}

const themeColor: Record<Theme, ThemeTypes> = {
  [Theme.Dark]: {
    color: palette.gray.light2,
    bgColorHover: palette.gray.dark4,
    colorDestructive: palette.red.light1,
    colorDisabled: palette.gray.dark1,
    active: {
      [CheckedVariant.Blue]: {
        bgColor: palette.blue.dark3,
        color: palette.blue.light3,
        bgColorWedge: palette.blue.light1,
      },
      [CheckedVariant.Green]: {
        bgColor: palette.green.dark3,
        color: palette.white,
        bgColorWedge: palette.green.base,
      },
    },
  },
  [Theme.Light]: {
    color: palette.black,
    bgColorHover: palette.gray.light2,
    colorDestructive: palette.red.light1,
    colorDisabled: palette.gray.light1,
    active: {
      [CheckedVariant.Blue]: {
        bgColor: palette.blue.light3,
        color: palette.blue.dark2,
        bgColorWedge: palette.blue.base,
      },
      [CheckedVariant.Green]: {
        bgColor: palette.green.light3,
        color: palette.green.dark2,
        bgColorWedge: palette.green.dark2,
      },
    },
  },
};

export const menuThemeColor: Record<Theme, ThemeTypes> = {
  [Theme.Dark]: themeColor[Theme.Dark],
  [Theme.Light]: {
    color: 'orange',
    bgColorHover: 'brown',
    colorDestructive: palette.red.light1,
    colorDisabled: '',
    active: {
      [CheckedVariant.Blue]: {
        bgColor: '',
        color: '',
        bgColorWedge: '',
      },
      [CheckedVariant.Green]: {
        bgColor: '',
        color: '',
        bgColorWedge: '',
      },
    },
  },
};

const getThemeObj = (isMenu: boolean) => (isMenu ? menuThemeColor : themeColor);

export const inputOptionStyles = css`
  position: relative;
  list-style: none;
  display: block;
  outline: none;
  border: unset;
  margin: 0;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  font-family: ${fontFamilies.default};
  padding: ${spacing[2]}px ${spacing[2] + spacing[1]}px;

  transition: background-color ${transitionDuration.default}ms ease-in-out;

  ${focusSelector} {
    outline: none;
    border: unset;
  }
`;

export const titleSelectionStyles = css`
  .${titleClassName} {
    font-weight: bold;
  }
`;

// export const inputOptionThemeStyles: Record<Theme, string> = {
//   [Theme.Light]: css`
//     color: ${palette.black};
//   `,
//   [Theme.Dark]: css`
//     color: ${palette.gray.light2};
//   `,
// };

export const inputOptionThemeStyles = (theme: Theme, isMenu: boolean) => {
  const themeObj = getThemeObj(isMenu);

  return css`
    ${hoverSelector} {
      color: ${themeObj[theme].color};
    }
  `;
};

// export const inputOptionHoverStyles: Record<Theme, string> = {
//   [Theme.Light]: css`
//     ${hoverSelector} {
//       outline: none;
//       background-color: ${palette.gray.light2};
//     }
//   `,
//   [Theme.Dark]: css`
//     ${hoverSelector} {
//       outline: none;
//       background-color: ${palette.gray.dark4};
//     }
//   `,
// };

export const inputOptionHoverStyles = (theme: Theme, isMenu: boolean) => {
  const themeObj = getThemeObj(isMenu);

  return css`
    ${hoverSelector} {
      outline: none;
      background-color: ${themeObj[theme].bgColorHover};
    }
  `;
};

/** in px */
const wedgeWidth = spacing[1];
/** in px */
const wedgePaddingY = spacing[2];

export const inputOptionWedge = css`
  // Left wedge
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: ${wedgeWidth}px;
    height: calc(100% - ${2 * wedgePaddingY}px);
    min-height: ${spacing[3]}px;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 0 6px 6px 0;
    transform: scale3d(0, 0.3, 0) translateY(-50%);
    transform-origin: 0%; // 0% since we use translateY
    transition: ${transitionDuration.default}ms ease-in-out;
    transition-property: transform, background-color;
  }
`;

// export const getInputOptionActiveStyles = (
//   theme: Theme,
//   variant: CheckedVariant,
// ) => {
//   const isBlue = variant === CheckedVariant.Blue;

//   if (theme === Theme.Light) {
//     return css`
//       outline: none;
//       background-color: ${isBlue ? palette.blue.light3 : palette.green.light3};
//       color: ${isBlue ? palette.blue.dark2 : palette.green.dark2};

//       &:before {
//         transform: scaleY(1) translateY(-50%);
//         background-color: ${isBlue ? palette.blue.base : palette.green.dark2};
//       }
//     `;
//   }

//   return css`
//     outline: none;
//     background-color: ${isBlue ? palette.blue.dark3 : palette.green.dark3};
//     color: ${isBlue ? palette.blue.light3 : palette.white};

//     &:before {
//       transform: scaleY(1) translateY(-50%);
//       background-color: ${isBlue ? palette.blue.light1 : palette.green.base};
//     }
//   `;
// };

export const getInputOptionActiveStyles = (
  theme: Theme,
  variant: CheckedVariant,
  isMenu: boolean,
) => {
  const themeObj = getThemeObj(isMenu);

  // FIXME: isMenu returns undefined when the menu is open, should be true or false
  console.log({ isMenu }, themeObj);

  return css`
    outline: none;
    background-color: ${themeObj[theme].active[variant].bgColor};
    color: ${themeObj[theme].active[variant].color};

    &:before {
      transform: scaleY(1) translateY(-50%);
      background-color: ${themeObj[theme].active[variant].bgColorWedge};
    }
  `;
};

// export const destructiveVariantStyles: Record<Theme, string> = {
//   [Theme.Light]: css`
//     color: ${palette.red.light1};
//   `,
//   [Theme.Dark]: css`
//     color: ${palette.red.light1};
//   `,
// };

export const destructiveVariantStyles = (theme: Theme, isMenu: boolean) => {
  const themeObj = getThemeObj(isMenu);

  return css`
    color: ${themeObj[theme].colorDestructive};
  `;
};

// export const inputOptionDisabledStyles: Record<Theme, string> = {
//   [Theme.Light]: cx(
//     inputOptionBaseDisabledStyles,
//     css`
//       &,
//       & .${descriptionClassName} {
//         color: ${palette.gray.light1};
//       }
//     `,
//   ),
//   [Theme.Dark]: cx(
//     inputOptionBaseDisabledStyles,
//     css`
//       &,
//       & .${descriptionClassName} {
//         color: ${palette.gray.dark1};
//       }
//     `,
//   ),
// };

export const inputOptionDisabledStyles = (theme: Theme, isMenu: boolean) => {
  const themeObj = getThemeObj(isMenu);

  return css`
    cursor: not-allowed;

    &,
    & .${descriptionClassName} {
      color: ${themeObj[theme].colorDisabled};
    }

    ${hoverSelector} {
      background-color: inherit;
    }

    &:before {
      content: unset;
    }
  `;
};
