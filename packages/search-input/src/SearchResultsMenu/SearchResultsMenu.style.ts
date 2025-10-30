import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  boxShadows,
  color,
  spacing,
} from '@leafygreen-ui/tokens';

const searchResultsMenuStyles = css`
  border-radius: ${borderRadius[300]}px;
`;

export const getSearchResultsMenuStyles = ({
  theme,
  menuWidth,
}: {
  theme: Theme;
  menuWidth: number;
}) =>
  cx(
    searchResultsMenuStyles,
    css`
      width: ${menuWidth}px;
      min-width: ${menuWidth}px;
      background-color: ${color[theme].background.primary.default};
      border: 1px solid ${color[theme].border.secondary.default};
      box-shadow: ${boxShadows[theme][1]};
    `,
  );

export const searchResultsListStyles = css`
  padding: ${spacing[300]}px 0;
  margin: 0;
  border-radius: ${borderRadius[300]}px;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

export const getSearchResultsListStyles = ({
  maxHeightValue,
}: {
  maxHeightValue: string;
}) =>
  cx(
    searchResultsListStyles,
    css`
      max-height: ${maxHeightValue};
    `,
  );
