import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { borderRadius } from '@leafygreen-ui/tokens';
import { color } from '@leafygreen-ui/tokens';
import { spacing } from '@leafygreen-ui/tokens';

import { Variant } from './InfoBlock.types';

const cardVariantStyles = {
  textContainerMaxWidth: 280,
  contentContainerHorizontalPadding: spacing[800],
};

const DEFAULT_CONTAINER_MAX_WIDTH = 336;

const variantStyles = {
  [Variant.Card]: {
    containerMaxWidth:
      cardVariantStyles.textContainerMaxWidth +
      2 * cardVariantStyles.contentContainerHorizontalPadding,
    contentContainerPadding: `${spacing[600]}px ${cardVariantStyles.contentContainerHorizontalPadding}px ${spacing[800]}px`,
    contentContainerGap: spacing[200],
    textContainerMaxWidth: `${cardVariantStyles.textContainerMaxWidth}px`,
    textContainerGap: spacing[200],
  },
  [Variant.Icon]: {
    containerMaxWidth: DEFAULT_CONTAINER_MAX_WIDTH,
    contentContainerGap: spacing[200],
    textContainerMaxWidth: 'initial',
    textContainerGap: spacing[200],
  },
  [Variant.Image]: {
    containerMaxWidth: DEFAULT_CONTAINER_MAX_WIDTH,
    contentContainerGap: spacing[400],
    textContainerMaxWidth: 'initial',
    textContainerGap: 0,
  },
} as const;

export const getContainerStyles = (variant: Variant, className?: string) => {
  const isCardVariant = variant === Variant.Card;

  return cx(
    css`
      max-width: ${variantStyles[variant].containerMaxWidth}px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow: ${isCardVariant ? 'hidden' : 'visible'};
      gap: ${isCardVariant ? 0 : spacing[200]}px;
    `,
    className,
  );
};

const fullSizeImgStyles = css`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const getImageVariantMediaContainerStyles = (theme: Theme) =>
  cx(
    css`
      background: ${color[theme].background.secondary.default};
      border: 1px solid ${color[theme].border.secondary.default};
      border-radius: ${borderRadius[600]}px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: ${spacing[300]}px;
    `,
    fullSizeImgStyles,
  );

export const getMediaContainerStyles = (theme: Theme, variant: Variant) =>
  cx({
    [getImageVariantMediaContainerStyles(theme)]: variant === Variant.Image,
    [fullSizeImgStyles]: variant === Variant.Card,
  });

export const getContentContainerStyles = (
  variant: Variant,
  hasMedia: boolean,
) => {
  const isCardVariant = variant === Variant.Card;
  const cardVariantPaddingTop = hasMedia ? spacing[600] : spacing[800];
  const cardVariantPaddingValue = `${cardVariantPaddingTop}px ${cardVariantStyles.contentContainerHorizontalPadding}px ${spacing[800]}px`;

  return css`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: ${isCardVariant ? cardVariantPaddingValue : 0};
    gap: ${variantStyles[variant].contentContainerGap}px;
  `;
};

export const getTextContainerStyles = (variant: Variant) => css`
  max-width: ${variantStyles[variant].textContainerMaxWidth};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${variantStyles[variant].textContainerGap}px;
`;

export const badgesContainerStyles = css`
  padding-top: ${spacing[100]}px;
  display: flex;
  gap: ${spacing[200]}px;
`;
