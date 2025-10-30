import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

/**
 * Does not use tokens in order to have alignment with `ChatSideNavHeader` children
 */
const FOOTER_PADDING = 10;

/**
 * Adding 1px to the height due to the border being included in the height
 * when `box-sizing: border-box` is used
 */
const FOOTER_HEIGHT = 48 + 1;

const getBaseFooterStyles = (theme: Theme) => css`
  width: 100%;
  height: ${FOOTER_HEIGHT}px;
  border-top: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  padding: ${FOOTER_PADDING}px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const getFooterStyles = ({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) => cx(getBaseFooterStyles(theme), className);
