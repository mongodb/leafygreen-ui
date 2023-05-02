import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  fontFamilies,
  fontWeights,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { Size } from '../SegmentedControl/SegmentedControl.types';

/**
 * Styles
 */
export const optionThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    --base-text-color: ${palette.gray.dark1};
    --base-background-color: rgba(255, 255, 255, 0);
    --base-shadow-color: rgba(255, 255, 255, 0);
    // Hover
    --hover-text-color: ${palette.gray.dark3};
    // Selected
    --active-text-color: ${palette.white};
    // Disabled
    --disabled-text-color: ${palette.gray.light1};
    // Divider
    --divider-background-color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    --base-text-color: ${palette.gray.light1};
    --base-background-color: rgba(255, 255, 255, 0);
    --base-shadow-color: rgba(255, 255, 255, 0);
    // Hover
    --hover-text-color: ${palette.gray.light2};
    // Selected
    --active-text-color: ${palette.black};
    // Disabled
    --disabled-text-color: ${palette.gray.dark2};
    // Divider
    --divider-background-color: ${palette.gray.dark2};
  `,
};

export const optionSizeStyle: Record<Size, string> = {
  [Size.XSmall]: css`
    --font-size: 12px;
    --line-height: 16px;
    --padding-inline: 12px;
    --text-transform: uppercase;
    --font-weight: ${fontWeights.bold};
    --divider-height: 12px;
    --padding-block: 3px;
  `,
  [Size.Default]: css`
    --font-size: 13px;
    --line-height: 24px;
    --padding-inline: 12px; // left/right
    --text-transform: none;
    --font-weight: ${fontWeights.medium};
    --divider-height: 18px;
    --padding-block: 3px;
  `,
  [Size.Large]: css`
    --font-size: 16px;
    --line-height: 28px;
    --padding-inline: 12px;
    --text-transform: none;
    --font-weight: ${fontWeights.medium};
    --divider-height: 20px;
    --padding-block: 4px;
  `,
};

export const optionStyle = ({
  theme,
  size = 'default',
  baseFontSize = 14,
}: {
  theme: Theme;
  size: Size;
  baseFontSize: 14 | 16;
}) =>
  cx(
    optionThemeStyle[theme],
    optionSizeStyle[size],
    css`
      position: relative;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      z-index: 3;

      &:first-child,
      &[data-lg-checked='true'],
      &[data-lg-checked='true'] + [data-lg-checked='false'],
      &:focus-within + :not(:focus-within) {
        --divider-background-color: transparent;
      }

      /* 
      * Adds the divider line to unselected segments 
      */
      &:before {
        --divider-width: 1px;
        content: '';
        position: absolute;
        height: var(--divider-height);
        width: var(--divider-width);
        left: calc(0px - (var(--segment-gap) + var(--divider-width)) / 2);
        top: calc(
          (
              var(--line-height) + var(--padding-block) * 2 -
                var(--divider-height)
            ) / 2
        );
        transition: background-color ${transitionDuration.default}ms ease-in-out;
        background-color: var(--divider-background-color);
      }
    `,
    {
      // Update font size according to baseFontSize
      [css`
        --font-size: 16px;
      `]: size === 'default' && baseFontSize === 16,
    },
  );

export const boxStyle = css`
  width: 100%;
  height: 100%;
  text-decoration: none;
`;

export const buttonStyle = css`
  font-family: ${fontFamilies.default};
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: var(--padding-block) var(--padding-inline);
  background-color: var(--base-background-color);
  border-radius: var(--indicator-radius);
  text-align: center;
  font-size: var(--font-size);
  line-height: var(--line-height);
  text-transform: var(--text-transform, none);
  font-weight: var(--font-weight);
  color: var(--base-text-color);
  box-shadow: 0px 1px 2px var(--base-shadow-color);
  cursor: pointer;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: color, box-shadow;
  text-decoration: none;
  outline: none;
  border: none;

  svg {
    transition: color ${transitionDuration.default}ms ease-in-out;
  }

  &:hover {
    color: var(--hover-text-color);
  }

  &[aria-selected='true'] {
    color: var(--active-text-color);
  }

  &:disabled {
    color: var(--disabled-text-color);
    cursor: not-allowed;
  }

  &[aria-selected='false']:not(:disabled):not(:hover) {
    svg {
      color: ${palette.gray.base};
    }
  }
`;

export const iconOnlyThemeStyles = css`
  &[aria-selected='false']:not(:disabled):not(:hover) {
    svg {
      color: var(--base-text-color);
    }
  }
`;

export const buttonFocusStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus {
      box-shadow: ${focusRing.light.default};
    }
  `,
  [Theme.Dark]: css`
    &:focus {
      box-shadow: ${focusRing.dark.default};
    }
  `,
};

export const labelStyle = css`
  min-height: var(--line-height);
  gap: calc(var(--font-size) / 2);
  display: flex;
  align-items: center;
  min-width: 0;

  svg {
    flex-shrink: 0;
  }
`;

export const labelTextStyles = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
