import { bannerChildrenContainerClassName } from '@leafygreen-ui/banner';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

/**
 * These base styles override the default styles of the LG Banner component.
 */
export const baseStyles = css`
  // Remove the Banner's left border wedge
  &::before {
    content: '';
    background: transparent;
  }
  // Customize the border
  border-width: ${spacing[25]}px;
  border-radius: ${spacing[600]}px;

  max-width: fit-content;
  padding: ${spacing[150]}px ${spacing[200]}px;

  display: flex;
  gap: ${spacing[150]}px;

  .${bannerChildrenContainerClassName} {
    margin: 0;
  }
`;

export const multilineStyles = css`
  border-radius: ${spacing[300]}px;
`;

export const getMessageBannerStyles = ({
  className,
  isMultiline,
}: {
  className?: string;
  isMultiline: boolean;
}) =>
  cx(
    baseStyles,
    {
      [multilineStyles]: isMultiline,
    },
    className,
  );
