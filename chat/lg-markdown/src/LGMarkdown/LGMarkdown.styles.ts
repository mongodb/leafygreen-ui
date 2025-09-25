import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

const BLOCKQUOTE_WEDGE_WIDTH = 3;
const LIST_INDENT_SPACING = spacing[400];
const VERTICAL_SPACING = spacing[200];

const getBlockquoteStyles = (theme: Theme) => css`
  position: relative;
  margin: 0;
  padding-left: ${spacing[300]}px;
  display: flex;

  /* wedge default state */
  &:before {
    content: '';
    position: absolute;
    background-color: ${theme === Theme.Light
      ? palette.gray.light1
      : palette.gray.dark1};
    pointer-events: none;
    top: 0;
    bottom: 0;
    left: 0;
    width: ${BLOCKQUOTE_WEDGE_WIDTH}px;
    border-radius: ${borderRadius[400]}px;
  }
`;

const getHrStyles = (theme: Theme) => css`
  margin: 0;
  background-color: ${color[theme].border[Variant.Secondary][
    InteractionState.Default
  ]};
  width: 100%;
  height: 1px;
`;

const getBaseStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${VERTICAL_SPACING}px;

  blockquote {
    ${getBlockquoteStyles(theme)}
  }

  hr {
    ${getHrStyles(theme)}
  }

  li > :first-child {
    padding-top: ${VERTICAL_SPACING}px;
  }

  ol,
  ul {
    padding-inline-start: ${LIST_INDENT_SPACING}px;
    display: inline-flex;
    flex-direction: column;
    gap: ${VERTICAL_SPACING}px;
  }

  code,
  pre {
    white-space: pre-wrap;
  }
`;

export const getWrapperStyles = ({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) => cx(getBaseStyles(theme), className);
