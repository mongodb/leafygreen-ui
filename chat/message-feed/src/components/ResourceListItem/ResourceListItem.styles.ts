import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, spacing, typeScales } from '@leafygreen-ui/tokens';

export const getListItemStyles = ({ className }: { className?: string }) =>
  cx(
    css`
      display: flex;
      gap: ${spacing[200]}px;
      align-items: center;
      font-size: ${typeScales.body1.fontSize}px;
      line-height: ${typeScales.body1.lineHeight}px;
    `,
    className,
  );

export const iconWrapperStyles = css`
  display: flex;
`;

export const getIconStyles = ({ theme }: { theme: Theme }) =>
  cx(
    css`
      color: ${color[theme].icon.primary.default};
    `,
  );
