import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontWeights, transitionDuration } from '@leafygreen-ui/tokens';

export const subMenuContainerClassName =
  createUniqueClassName('sub-menu-container');
export const iconButtonClassName = createUniqueClassName('icon-button');
export const chevronClassName = createUniqueClassName('icon-button-chevron');

export const iconButtonContainerSize = 28;

export const subMenuStyle = css`
  padding-right: ${iconButtonContainerSize + 16}px;
  align-items: center;
  justify-content: flex-start;
`;

export const subMenuThemeStyle: Record<Theme, string> = {
  [Theme.Light]: cx(
    subMenuStyle,
    css`
      background-color: ${palette.black};
    `,
  ),
  [Theme.Dark]: cx(
    subMenuStyle,
    css`
      background-color: ${palette.gray.dark3};

      &:hover {
        .${iconButtonClassName} {
          background-color: ${palette.gray.dark2};
        }
      }
    `,
  ),
};

export const subMenuOpenStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: transparent;

    &:hover {
      background-color: ${palette.gray.dark3};
    }
  `,
  [Theme.Dark]: css`
    background-color: transparent;

    &:hover {
      background-color: ${palette.gray.dark2};
    }
  `,
};

export const closedIconStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    transition: color 200ms ease-in-out;
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    transition: color 200ms ease-in-out;
    color: ${palette.gray.light1};
  `,
};

export const openIconStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

export const iconButtonStyle = css`
  position: absolute;
  z-index: 1;
  right: 8px;
  top: 0;
  bottom: 0;
  margin: auto;
  transition: background-color ${transitionDuration.default}ms ease-in-out;
`;

export const iconButtonThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.black};

    &:hover {
      background-color: ${palette.gray.dark2};
    }
  `,
  [Theme.Dark]: css`
    &:hover {
      &:before {
        background-color: ${palette.gray.dark1};
      }

      svg {
        color: ${palette.gray.light3};
      }
    }
  `,
};

export const iconButtonFocusedThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus-visible {
      .${chevronClassName} {
        color: ${palette.white};
      }
    }
  `,
  [Theme.Dark]: css`
    &:focus-visible {
      .${chevronClassName} {
        color: ${palette.black};
      }
    }
  `,
};

export const openIconButtonStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.black};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark3};
  `,
};

export const ulStyle = css`
  list-style: none;
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: height ${transitionDuration.default}ms ease-in-out;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    right: 0;
    z-index: 1;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`;

export const ulThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &::before,
    &::after {
      background-color: ${palette.gray.dark2};
    }
  `,
  [Theme.Dark]: css`
    &::before,
    &::after {
      background-color: ${palette.gray.dark2};
    }
  `,
};

export const menuItemText = css`
  width: 100%;
  font-weight: ${fontWeights.regular};
  font-size: 13px;
  line-height: 16px;
  padding-left: 16px;
  text-shadow: none;
`;

export const menuItemBorder = css`
  position: absolute;
  width: 100%;
  height: 1px;
  background: ${palette.gray.dark2};
  top: 0;
`;

export const menuItemBorderBottom = css`
  ${menuItemBorder};
  top: unset;
  bottom: 0;
`;

export const subItemStyle = css`
  // Reassign the variable for specificity
  --lg-menu-item-text-color: ${palette.gray.light1};
  position: relative;
  min-height: 32px;

  > div {
    padding-left: 16px;
  }

  &::after {
    content: '';
    position: absolute;
    height: 1px;
    right: 0;
    z-index: 1;
    bottom: 0;
  }
`;

export const subItemThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};

    &::after {
      background-color: ${palette.gray.dark2};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};

    &:hover {
      color: ${palette.white};
    }

    &::after {
      background-color: ${palette.gray.dark2};
    }
  `,
};
