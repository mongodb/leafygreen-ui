import { css, cx } from '@leafygreen-ui/emotion';

const baseStyles = css`
  width: 100%;
  position: relative;
  height: inherit;
`;

const drawerBaseStyles = css`
  display: grid;
  grid-template-columns: auto 0px;
`;

const toolbarBaseStyles = css`
  display: grid;
  grid-template-columns: auto 48px;
  grid-template-areas: 'main drawer';
`;

export const getOverlayDrawerLayoutStyles = ({
  className,
  hasToolbar = false,
}: {
  className?: string;
  hasToolbar?: boolean;
}) =>
  cx(
    baseStyles,
    {
      [toolbarBaseStyles]: hasToolbar,
      [drawerBaseStyles]: !hasToolbar,
    },
    className,
  );
