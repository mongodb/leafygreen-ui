import { css } from '@leafygreen-ui/emotion';
import { Size, spacing, typeScales } from '@leafygreen-ui/tokens';

export const containerStyles = css`
  display: flex;
  gap: ${spacing[100]}px;
`;

export const spacingTop = css`
  padding-top: ${spacing[100]}px;
`;

export const hideContainerStyle = css`
  opacity: 0;
`;

export const iconWrapperStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const getIconWrapperHeight = (size: Size) => {
  return css`
    height: ${size === Size.Large
      ? typeScales.large.lineHeight
      : typeScales.body1.lineHeight}px;
  `;
};
