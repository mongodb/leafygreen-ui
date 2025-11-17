import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const bodyThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.black};
  `,
};

export const bodyTitleStyles = css`
  margin-bottom: 4px;
`;

export const buttonStyles = css`
  height: 28px;
`;

const closeStyles = css`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const closeHoverStyles = css`
  color: ${palette.gray.dark2};
  &:hover,
  &:active {
    &::before {
      background-color: ${palette.gray.light3};
    }
  }
`;

export const getCloseButtonStyle = (isDarkMode?: boolean) =>
  cx(closeStyles, {
    [closeHoverStyles]: isDarkMode,
  });

export const contentStyles = css`
  margin-bottom: 16px;
`;

export const footerStyles = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

export const stepStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark2};
  `,
};

const tooltipMultiStepStyles = css`
  padding: 32px 16px 16px;
`;

const tooltipStyles = css`
  cursor: auto;
`;

export const getTooltipStyles = ({
  isStandalone,
  tooltipClassName,
}: {
  isStandalone?: boolean;
  tooltipClassName?: string;
}) =>
  cx(
    { [tooltipMultiStepStyles]: !isStandalone },
    tooltipStyles,
    tooltipClassName,
  );
