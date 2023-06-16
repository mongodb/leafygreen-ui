import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

// Using a background allows the "border" to appear underneath the individual tab color
export const modeColors = {
  [Theme.Light]: {
    underlineColor: css`
      background: linear-gradient(
        0deg,
        ${palette.gray.light2} 1px,
        rgb(255 255 255 / 0%) 1px
      );
    `,
  },

  [Theme.Dark]: {
    underlineColor: css`
      background: linear-gradient(
        0deg,
        ${palette.gray.dark2} 1px,
        rgb(255 255 255 / 0%) 1px
      );
    `,
  },
};

export const tabContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const inlineChildrenWrapperStyle = css`
  display: flex;
  align-items: center;
`;

export const listStyle = css`
  list-style: none;
  padding: 0;
  display: flex;
  width: 100%;
  overflow-x: auto;

  /* Remove scrollbar */

  /* Chrome, Edge, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE */
  scrollbar-width: none; /* Firefox */
`;
