import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

export const leftGlyphClassName = createUniqueClassName(
  'input-option-left-glyph',
);

export const getContentWrapperStyles = css`
  display: grid;
  grid-template-columns: ${spacing[400]}px 1fr ${spacing[400]}px;
  grid-template-areas: 'left-glyph text right-glyph';
  gap: ${spacing[200]}px;
  align-items: center;
  width: 100%;
`;

export const leftGlyphContainerStyles = css`
  grid-area: left-glyph;
  display: flex;
  height: 20px;
  align-items: center;
`;

export const textContainerStyles = css`
  grid-area: text;
`;

export const rightGlyphContainerStyles = css`
  grid-area: right-glyph;
`;

export const titleBaseStyles = css`
  overflow-wrap: anywhere;
`;

export const descriptionBaseStyles = css`
  max-height: ${spacing[1200]}px;
  overflow: hidden;
  font-size: inherit;
  text-overflow: ellipsis;
`;
