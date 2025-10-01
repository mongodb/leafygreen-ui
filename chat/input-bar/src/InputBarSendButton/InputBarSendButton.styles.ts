import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

/**
 * Off-palette value specific to primary button instances
 * @todo Consolidate usage of #00593F
 * @see https://jira.mongodb.org/browse/LG-5388
 *
 * @remarks This is a temporary duplicate to avoid importing the
 * `PRIMARY_BUTTON_INTERACTIVE_GREEN` constant from
 * `@leafygreen-ui/button/constants`. Consumers are blocked from upgrading
 * to the latest version of button package due to type issues from
 * `@leafygreen-ui/button@23.0.0` https://jira.mongodb.org/browse/LG-5462
 */
const PRIMARY_BUTTON_INTERACTIVE_GREEN = '#00593F';

export const getIconFill = ({
  disabled,
  theme,
}: {
  disabled: boolean;
  theme: Theme;
}) => {
  if (disabled) {
    return color[theme].icon[Variant.Disabled][InteractionState.Default];
  }

  return color[theme].icon[Variant.Primary][InteractionState.Default];
};

const getBaseIconButtonStyles = ({ theme }: { theme: Theme }) => {
  const darkMode = theme === Theme.Dark;
  return css`
    background-color: ${palette.green.dark2};
    border: 1px solid ${palette.green[darkMode ? 'base' : 'dark2']};
    color: ${palette.white};

    &:active,
    &:hover {
      background-color: ${PRIMARY_BUTTON_INTERACTIVE_GREEN};
      color: ${palette.white};
      box-shadow: 0 0 0 3px ${palette.green[darkMode ? 'dark3' : 'light2']};
    }

    &:focus-visible {
      background-color: ${PRIMARY_BUTTON_INTERACTIVE_GREEN};
      color: ${palette.white};
    }
  `;
};

const getDisabledIconButtonStyles = (theme: Theme) => css`
  background-color: ${color[theme].background[Variant.Disabled][
    InteractionState.Default
  ]};
  color: ${color[theme].icon[Variant.Disabled][InteractionState.Default]};
  border-color: ${color[theme].border[Variant.Disabled][
    InteractionState.Default
  ]};

  &:active,
  &:hover {
    background-color: ${color[theme].background[Variant.Disabled][
      InteractionState.Default
    ]};
    color: ${color[theme].icon[Variant.Disabled][InteractionState.Default]};
    box-shadow: none;
  }

  &:focus-visible {
    background-color: ${color[theme].background[Variant.Disabled][
      InteractionState.Default
    ]};
    color: ${color[theme].icon[Variant.Disabled][InteractionState.Default]};
  }
`;

export const getIconButtonStyles = ({
  disabled,
  theme,
}: {
  disabled: boolean;
  theme: Theme;
}) =>
  cx(getBaseIconButtonStyles({ theme }), {
    [getDisabledIconButtonStyles(theme)]: disabled,
  });
