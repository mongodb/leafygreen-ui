import React from 'react';
import { LogoMark } from '@leafygreen-ui/logo';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const orgNavContainer = css`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 13px;
  line-height: 15px;
  color: ${uiColors.gray.dark3};
  border-bottom: 1px solid ${uiColors.gray.light2};
`;

const projNavContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  height: 45px;
  box-shadow: 0 3px 7px 0 rgba(67, 117, 151, 0.08);
  overflow: hidden;
`;

export default function Loading() {
  return (
    <>
      <nav className={orgNavContainer}>
        <LogoMark height={30} />
      </nav>
      <nav className={projNavContainer} />
    </>
  );
}
