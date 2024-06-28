import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';

export const OptionClassName = createUniqueClassName('option');

export const glyphFocusStyle = css`
  .${OptionClassName} {
    &:focus-visible & {
      color: currentColor;
    }
  }
`;
