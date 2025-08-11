import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, transitionDuration } from '@leafygreen-ui/tokens';

/**
 * Generates the CSS styles for the CodeEditorCopyButton component.
 * Handles theming, copy state visual feedback, and panel/minimal variants.
 *
 * @param theme - The current theme (light or dark)
 * @param copied - Whether the button is in the "copied" state
 * @param showPanel - Whether this is the panel variant (affects styling)
 * @param className - Additional CSS class names to apply
 * @returns Combined CSS class string
 */
export const getCopyButtonStyles = ({
  theme,
  copied,
  showPanel,
  className,
}: {
  theme: Theme;
  copied: boolean;
  showPanel: boolean;
  className?: string;
}) =>
  cx(
    css`
      align-self: center;

      &[aria-disabled='false'] {
        color: ${color[theme].icon.primary.default};
      }

      div[role='tooltip'] svg {
        width: 26px;
        height: 26px;
      }

      &,
      & > div > svg {
        transition: all ${transitionDuration.default}ms ease-in-out;
      }
    `,
    {
      [copiedThemeStyle[theme]]: copied,
      [minimalButtonThemeStyle[theme]]: !showPanel,
    },
    className,
  );

/**
 * Theme-specific styles applied when the button is in the "copied" state.
 * Shows green background and white text to indicate successful copy operation.
 */
export const copiedThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &,
    & > div > svg {
      color: ${palette.white};

      &:focus,
      &:hover {
        color: ${palette.white};
      }
    }

    background-color: ${palette.green.dark1};

    &:focus,
    &:hover {
      background-color: ${palette.green.dark1};
      &::before {
        background-color: ${palette.green.dark1};
      }
    }
  `,
  [Theme.Dark]: css`
    &,
    & > div > svg {
      color: ${palette.gray.dark3};

      &:focus,
      &:hover {
        color: ${palette.gray.dark3};
      }
    }

    background-color: ${palette.green.base};

    &:focus,
    &:hover {
      background-color: ${palette.green.base};

      &::before {
        background-color: ${palette.green.base};
      }
    }
  `,
};

/**
 * Generates styles for the minimal button variant when in copied state.
 * Used for minimal/hover copy buttons outside of panels.
 *
 * @param theme - The current theme
 * @returns CSS styles for the minimal copied state
 */
export const getMinimalButtonCopiedStyles = ({
  theme,
}: {
  theme: Theme;
}) => css`
  border-color: ${color[theme].icon.primary.default};
`;

/**
 * Theme-specific styles for the minimal button variant.
 * Applied when the copy button is not in a panel (showPanel = false).
 */
export const minimalButtonThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    border-color: ${palette.gray.base};
  `,
  [Theme.Dark]: css`
    border-color: ${palette.gray.light2};
  `,
};
