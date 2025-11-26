import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { addOverflowShadow, Side, spacing } from '@leafygreen-ui/tokens';

// Specified by Design team
const MIN_HEIGHT = 92;

const footerBaseStyle = css`
  width: 100%;
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

const innerContainerBaseStyle = css`
  min-height: ${MIN_HEIGHT}px;
  width: 100%;
  padding: ${spacing[600]}px;
  display: flex;
  align-items: center;
  background: inherit;

  button {
    white-space: nowrap;
  }
`;

const contentStyle = css`
  display: flex;
  align-items: center;
  gap: ${spacing[200]}px;
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
}) => cx(footerBaseStyle, footerThemeStyle[theme], className);

export const getInnerContainerStyles = ({ theme }: { theme: Theme }) =>
  cx(
    innerContainerBaseStyle,
    addOverflowShadow({ side: Side.Top, theme, isInside: false }),
  );

export const getContentStyles = (contentClassName?: string) =>
  cx(contentStyle, contentClassName);
