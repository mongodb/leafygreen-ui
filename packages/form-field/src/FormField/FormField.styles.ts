import { css } from '@leafygreen-ui/emotion';
import { BaseFontSize, spacing, typeScales } from '@leafygreen-ui/tokens';

export const formFieldFontStyles: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: 20px; // Hardcoding because it does not match body2 lineHeight
  `,
};

export const labelTextContainerStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing[1]}px;
`;

export const errorTextContainerStyle = css`
  margin-top: ${spacing[1]}px;
`;
