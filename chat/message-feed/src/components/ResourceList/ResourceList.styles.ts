import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const getListStyles = ({ className }: { className?: string }) =>
  cx(
    css`
      display: flex;
      flex-direction: column;
      gap: ${spacing[400]}px;
      padding: 0;
      margin: 0;
    `,
    className,
  );
