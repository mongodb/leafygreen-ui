import React from 'react';
import { PropsWithChildren } from 'react';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

const DarkModeWrapper = ({
  children,
  darkMode = false,
}: PropsWithChildren<{ darkMode?: boolean }>) => {
  const styles = css`
    background-color: ${darkMode ? palette.black : palette.white};
    padding: 20px;
  `;

  return <div className={styles}>{children}</div>;
};

export default DarkModeWrapper;
