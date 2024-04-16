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
// npx jscodeshift -t /Users/shaneeza.ali/Documents/sites/leafygreen-ui/tools/migrator/src/transformations/remove-consoles/transform.ts /Users/shaneeza.ali/Documents/sites/leafygreen-ui/tools/migrator/src/transformations/remove-consoles/testing.tsx -p
