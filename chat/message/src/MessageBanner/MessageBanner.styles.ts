import { Variant } from '@leafygreen-ui/banner';
import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

/**
 * These base styles override the default styles of the LG Banner component.
 */
export const baseStyles = css`
  // Remove the Banner's left border wedge
  &:before {
    content: '';
    background: transparent;
  }
  // Customize the border
  border-width: ${spacing[25]}px;
  border-radius: ${spacing[600]}px;
  border-left-color: unset;

  max-width: fit-content;
  padding: ${spacing[200]}px ${spacing[300]}px;
`;

/**
 * These match the base border-color styles for each variant of the LG Banner component.
 */
const lightModeInfoMessageBannerStyles = css`
  border-color: ${palette.blue.light2};
`;
const lightModeWarningMessageBannerStyles = css`
  border-color: ${palette.yellow.light2};
`;
const lightModeDangerMessageBannerStyles = css`
  border-color: ${palette.red.light2};
`;
const lightModeSuccessMessageBannerStyles = css`
  border-color: ${palette.green.light2};
`;
const darkModeInfoMessageBannerStyles = css`
  border-color: ${palette.blue.dark2};
`;
const darkModeWarningMessageBannerStyles = css`
  border-color: ${palette.yellow.dark2};
`;
const darkModeDangerMessageBannerStyles = css`
  border-color: ${palette.red.dark2};
`;
const darkModeSuccessMessageBannerStyles = css`
  border-color: ${palette.green.dark2};
`;

export const variantStyles: Record<Theme, Record<Variant, string>> = {
  [Theme.Dark]: {
    [Variant.Info]: darkModeInfoMessageBannerStyles,
    [Variant.Warning]: darkModeWarningMessageBannerStyles,
    [Variant.Danger]: darkModeDangerMessageBannerStyles,
    [Variant.Success]: darkModeSuccessMessageBannerStyles,
  },
  [Theme.Light]: {
    [Variant.Info]: lightModeInfoMessageBannerStyles,
    [Variant.Warning]: lightModeWarningMessageBannerStyles,
    [Variant.Danger]: lightModeDangerMessageBannerStyles,
    [Variant.Success]: lightModeSuccessMessageBannerStyles,
  },
};

export const multilineStyles = ({ isMultiline }: { isMultiline: boolean }) =>
  isMultiline
    ? css`
        border-radius: ${spacing[300]}px;
      `
    : undefined;
