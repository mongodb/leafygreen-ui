import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { focusRing, hoverRing } from '@leafygreen-ui/tokens';

import { checkBoxSize } from '../constants';

export const checkWrapperClassName = createUniqueClassName('check-wrapper');
export const inputClassName = createUniqueClassName('input');

export const containerStyle = css`
  display: grid;
  grid-template-columns: ${checkBoxSize}px auto;
  grid-template-areas: 'label label' '. description';
  gap: 0 8px;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  z-index: 0;
`;

/** &:disabled won't work and [disabled] isn't a valid property because this isn't an input */
export const disabledContainerStyle = css`
  cursor: not-allowed;
`;

export const labelStyle = css`
  grid-area: label;
  display: grid;
  grid-template-columns: ${checkBoxSize}px auto;
  grid-template-areas: 'check text';
  gap: 8px;
  justify-content: flex-start;
  align-items: baseline;
  cursor: pointer;
`;

export const labelHoverSelector = `
  &:hover:not(:focus-within)
    > .${inputClassName}:not([disabled])
      + .${checkWrapperClassName}
`;

export const labelHoverStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    ${labelHoverSelector} {
      box-shadow: ${hoverRing.light.gray};
    }
  `,
  [Theme.Dark]: css`
    ${labelHoverSelector} {
      box-shadow: ${hoverRing.dark.gray};
    }
  `,
};

export const disabledLabelStyle = css`
  cursor: not-allowed;
`;

export const disabledLabelDarkThemeOverrideStyle = css`
  color: ${palette.gray.base};
`;

export const inputStyle = css`
  margin: 0;
  position: absolute;
  height: 0;
  width: 0;
  left: 0;
  top: 0;
  pointer-events: none;
  opacity: 0;
`;

export const inputFocusStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus-visible + .${checkWrapperClassName} {
      box-shadow: ${focusRing.light.default};
    }
  `,
  [Theme.Dark]: css`
    &:focus-visible + .${checkWrapperClassName} {
      box-shadow: ${focusRing.dark.default};
    }
  `,
};

export const labelTextStyle = css`
  align-self: baseline;
`;

export const descriptionStyle = css`
  grid-area: description;
`;

export const labelTextColorStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
  `,

  [Theme.Dark]: css`
    color: ${palette.gray.light2};
  `,
};

export const disabledTextStyle = css`
  color: ${palette.gray.dark1};
`;
