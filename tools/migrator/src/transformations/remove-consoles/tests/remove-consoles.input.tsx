/* eslint-disable no-console */
// @ts-nocheck
import React from 'react';

export const TestingCodemods = () => {
  const t = 'red';

  console.log('hey');

  return (
    <>
      <p>Testing {t}</p>
    </>
  );
};

TestingCodemods.displayName = 'TestingCodemods';
