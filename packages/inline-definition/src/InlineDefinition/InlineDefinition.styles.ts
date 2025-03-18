import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

const triggerElementStyles = css`
  border-radius: 2px;
  text-decoration: underline dotted 2px;
  text-underline-offset: 0.125em;

  &:hover {
    a > * {
      // Remove the Link underline styles
      &::after {
        height: 0;
      }
    }
  }

  &:focus,
  &:focus-visible {
    outline-color: ${palette.blue.light1};
    outline-offset: 3px;
    outline-style: solid;
    outline-width: 2px;
  }
`;

const triggerElementModeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    text-decoration-color: ${palette.black};

    &:hover,
    &:focus,
    &:focus-visible {
      text-decoration-color: ${palette.black};
    }
  `,
  [Theme.Dark]: css`
    text-decoration-color: ${palette.gray.light2};

    &:hover,
    &:focus,
    &:focus-visible {
      text-decoration-color: ${palette.gray.light2};
    }
  `,
};

export const getTriggerElementStyles = (theme: Theme, className?: string) =>
  cx(triggerElementStyles, triggerElementModeStyles[theme], className);
