import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { borderRadius, color, spacing } from '@leafygreen-ui/tokens';

const getTriggerStyles = (theme: Theme) => {
  const backgroundColor = color[theme].background.info.default;
  const textColor = palette.blue[theme === Theme.Dark ? 'light2' : 'dark3'];

  return css`
    border: none;
    background-color: ${backgroundColor};
    color: ${textColor};
    border-radius: 0 0 ${borderRadius[400]}px ${borderRadius[400]}px;
    padding: 0 ${spacing[200]}px;

    &:focus-visible {
      background-color: ${backgroundColor};
      color: ${textColor};
      box-shadow: none;
    }

    &:hover,
    &:active {
      background-color: ${backgroundColor};
      color: ${textColor};
      box-shadow: none;
    }
  `;
};

const getGlyphStyles = (theme: Theme) => css`
  & svg[role='presentation'] {
    color: ${palette.blue[theme === Theme.Dark ? 'light2' : 'dark2']};
  }
`;

export const getButtonStyles = ({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) => cx(getTriggerStyles(theme), getGlyphStyles(theme), className);
