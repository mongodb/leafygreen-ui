import React, { PropsWithChildren } from 'react';

import { css } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color } from '@leafygreen-ui/tokens';

const TitleEm = ({ children }: PropsWithChildren<{}>) => {
  const { theme } = useDarkMode();
  return (
    <em
      className={css`
        font-style: unset;
        color: ${color[theme].text.error.default};
      `}
    >
      {children}
    </em>
  );
};

export const ReviewCardTitleWithCountEmphasis = ({
  verb,
  count,
  resource,
}: {
  verb: string;
  count: number;
  resource: string;
}) => {
  return (
    <>
      {verb} <TitleEm>{count}</TitleEm> {resource}
    </>
  );
};
