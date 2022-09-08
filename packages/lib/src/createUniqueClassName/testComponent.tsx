import React from 'react';
import createUniqueClassName from '.';

const className1 = createUniqueClassName();
const className2 = createUniqueClassName();

export const TestComponent = ({ ...props }) => {
  return (
    <div data-testid="el-1" className={className1}>
      <div data-testid="el-2" className={className2}></div>
    </div>
  );
};
