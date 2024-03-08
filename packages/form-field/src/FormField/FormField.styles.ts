import { css } from '@leafygreen-ui/emotion';
import { BaseFontSize, Size, spacing, typeScales } from '@leafygreen-ui/tokens';

export const getFontSize = ({
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
      font-size: 18px;
      line-height: 24px;
    `;
  }
};

export const labelTextContainerStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing[100]}px;
`;

export const errorTextContainerStyle = css`
  margin-top: ${spacing[100]}px;
`;
