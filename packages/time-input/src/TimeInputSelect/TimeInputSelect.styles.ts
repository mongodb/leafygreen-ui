import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, typeScales, fontWeights } from '@leafygreen-ui/tokens';

export const wrapperBaseStyles = css`
  margin-left: -1px;

  &:hover,
  &:focus-within {
    z-index: 2;
  }
`;

export const getSelectDisabledStyles = (theme: Theme) => css`
  button {
    background-color: ${color[theme].background.disabled.default};
    border-color: ${color[theme].border.disabled.default};
  }
`;

export const selectStyles = css`
  > div {
    display: flex;
  }

  button {
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;

    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    font-weight: ${fontWeights.medium};
  }
`;
