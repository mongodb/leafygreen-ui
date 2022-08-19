import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { TransitionStatus } from 'react-transition-group';

export const transitionDuration = 300;

/**
 * Styles
 */

export const cardStyle = (darkMode: boolean) => css`
  --card-divider-color: ${darkMode ? palette.gray.dark2 : palette.gray.light2};
  display: block;
  width: 100%;
  padding: 0;
  color: ${darkMode ? palette.gray.light2 : palette.black};
`;

export const summaryStyle = css`
  display: grid;
  grid-template-columns: auto 24px;
  padding: 24px;
  column-gap: 8px;
  cursor: pointer;
  color: inherit;
`;

export const summaryHeader = css`
  display: inline-block;
  color: inherit;
`;

export const summaryText = css`
  color: inherit;
  margin-top: 4px;
`;

export const summaryThemeStyle: Record<Theme, string> = {
  [Theme.Dark]: cx(
    summaryText,
    css`
      color: ${palette.gray.light1};
    `,
  ),
  [Theme.Light]: cx(
    summaryText,
    css`
      color: ${palette.black};
    `,
  ),
};

export const flagTextStyle = css`
  font-style: italic;
  font-size: 12px;
  letter-spacing: 0.2px;

  &::before {
    content: ' (';
  }
  &::after {
    content: ')';
  }
`;

export const iconStyle = css`
  grid-column: 2;
  grid-row: 1/3;
  transition: transform ${transitionDuration}ms ease-in-out;
`;

export const iconTransitionStyle: { [key in TransitionStatus]: string } = {
  entering: css`
    transform: rotate(180deg);
  `,
  entered: css`
    transform: rotate(180deg);
  `,
  exiting: css`
    transform: rotate(0deg);
  `,
  exited: css`
    transform: rotate(0deg);
  `,
  unmounted: '',
};

export const childrenWrapperStyle = css`
  overflow: hidden;
  transition: ${transitionDuration}ms ease-in-out;
  transition-property: all;
  transform-origin: top left;
  padding-inline: 24px;
  box-sizing: content-box;
  border-top: 1px solid transparent;
  visibility: visible;
`;

export const childrenWrapperTransitionStyle = (
  state: TransitionStatus,
  height?: number,
): string => {
  switch (state) {
    case 'entering':
      return css`
        max-height: ${height || 9999}px;
        padding-block: 24px;
        border-color: var(--card-divider-color);
      `;
    case 'entered':
      return css`
        max-height: ${height || 9999}px;
        padding-block: 24px;
        border-color: var(--card-divider-color);
      `;
    case 'exiting':
      return css`
        max-height: 0;
        padding-block: 0;
      `;
    case 'exited':
      return css`
        max-height: 0;
        padding-block: 0;
        visibility: hidden;
      `;
    default:
      return ``;
  }
};
