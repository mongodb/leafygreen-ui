import React from 'react';
import { PropsWithChildren } from 'react';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { DarkModeProps } from '@leafygreen-ui/lib';

const DarkModeWrapper = ({
  children,
  darkMode = false,
}: PropsWithChildren<DarkModeProps>) => {
  const styles = css`
    background-color: ${darkMode ? palette.gray.dark2 : palette.white};
    padding: 20px;
  `;

  return <div className={styles}>{children}</div>;
};

export default DarkModeWrapper;
