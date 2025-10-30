import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { addOverflowShadow, Side } from '@leafygreen-ui/tokens';

const footerBaseStyle = css`
  min-height: 92px;
  width: 100%;
  padding: 26px 24px;
  display: flex;
  align-items: center;

  button {
    white-space: nowrap;
  }
`;

const footerThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.black};
    border-top: 1px solid ${palette.gray.dark2};
  `,
};

export const contentStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const flexEndContent = css`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: inherit;
`;

export const bannerStyle = css`
  flex-grow: 0;
  padding-block: 7px;
  max-width: 700px;
`;

export const getFormFooterStyles = ({
  theme,
  className,
}: {
  theme: Theme;
  className?: string;
}) =>
  cx(
    footerBaseStyle,
    footerThemeStyle[theme],
    addOverflowShadow({ side: Side.Top, theme, isInside: false }),
    className,
  );
