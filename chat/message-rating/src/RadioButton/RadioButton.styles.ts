import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  focusRing,
  hoverRing,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

const getBaseContainerStyles = (theme: Theme) => css`
  display: flex;
  height: 22px; // Matches X-Small Button height
  justify-content: center;
  align-items: center;
  gap: ${spacing[150]}px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border: 1px solid ${palette.gray.dark1};
  background-color: ${color[theme].background[Variant.Secondary][
    InteractionState.Default
  ]};

  &:hover {
    background-color: ${theme === Theme.Dark ? palette.gray.dark1 : 'initial'};
    box-shadow: ${hoverRing[theme].gray};
  }

  &:focus-visible {
    background-color: ${color[theme].background[Variant.Secondary][
      InteractionState.Focus
    ]};
    background-color: ${theme === Theme.Dark ? palette.gray.dark1 : 'initial'};
    box-shadow: ${focusRing[theme].default};
  }
`;

export const checkedStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    border-color: ${palette.white};
    background: ${palette.gray.light2};
    &:hover {
      border-color: ${palette.white};
      background: ${palette.gray.light2};
      box-shadow: none;
    }
  `,
  [Theme.Light]: css`
    background: ${palette.black};
    &:hover {
      background: ${palette.black}; // override default hover
      box-shadow: none;
    }
    &:focus-visible {
      box-shadow: none;
    }
  `,
};

const getCheckedStyles = (theme: Theme) => css`
  background-color: ${color[theme].background[Variant.InversePrimary][
    InteractionState.Default
  ]};
  border-color: ${theme === Theme.Dark ? palette.white : 'initial'};

  &:hover {
    background-color: ${color[theme].background[Variant.InversePrimary][
      InteractionState.Default
    ]};
    box-shadow: none;
  }

  &:focus-visible {
    background-color: ${color[theme].background[Variant.InversePrimary][
      InteractionState.Focus
    ]};
    box-shadow: none;
  }
`;

export const getContainerStyles = ({
  checked,
  className,
  theme,
}: {
  checked?: boolean;
  className?: string;
  theme: Theme;
}) =>
  cx(
    getBaseContainerStyles(theme),
    {
      [getCheckedStyles(theme)]: checked,
    },
    className,
  );

export const labelStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing[100]}px ${spacing[200]}px;
  height: 100%;
  cursor: pointer;
`;
