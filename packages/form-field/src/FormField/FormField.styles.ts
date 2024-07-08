import { css } from '@leafygreen-ui/emotion';
import {
  BaseFontSize,
  Size,
  spacing,
  typeScales,
  Variant,
} from '@leafygreen-ui/tokens';

import { FormFieldState } from './FormField.types';

export const getFontSizeStyles = ({
  baseFontSize,
  size,
}: {
  baseFontSize: BaseFontSize;
  size: Size;
}) => {
  if (size === Size.XSmall || size === Size.Small) {
    return css`
      font-size: ${typeScales.body1.fontSize}px;
      line-height: ${typeScales.body1.lineHeight}px;
    `;
  }

  if (size === Size.Default) {
    return css`
      font-size: ${baseFontSize}px;
      line-height: ${typeScales.body1.lineHeight}px;
    `;
  }

  if (size === Size.Large) {
    return css`
      font-size: ${typeScales.large.fontSize}px;
      line-height: ${typeScales.large.lineHeight}px;
    `;
  }
};

export const convertFormFieldStateToIconVariant = (state: FormFieldState) => {
  if (state === FormFieldState.Error) {
    return Variant.Error;
  }

  if (state === FormFieldState.Valid) {
    return Variant.Success;
  }

  return Variant.Primary;
};

export const textContainerStyle = css`
  display: flex;
  flex-direction: column;
`;

export const marginBottom = css`
  margin-bottom: ${spacing[100]}px;
`;
