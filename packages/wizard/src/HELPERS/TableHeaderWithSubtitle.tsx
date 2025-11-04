import React from 'react';

import { css } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color } from '@leafygreen-ui/tokens';

export const TableHeaderWithSubtitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const { theme } = useDarkMode();

  return (
    <div>
      <div
        className={css`
          white-space: nowrap;
        `}
      >
        {title}
      </div>
      <div
        className={css`
          color: ${color[theme].text.secondary.default};
          font-weight: 400;
        `}
      >
        {subtitle}
      </div>
    </div>
  );
};
