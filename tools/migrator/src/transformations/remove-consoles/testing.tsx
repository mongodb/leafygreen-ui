// @ts-nocheck
import React from 'react';

export const TestingCodemods = () => {
  const t = 'red';

  return (
    <>
      <p>Testing {t}</p>
    </>
  );
};

TestingCodemods.displayName = 'TestingCodemods';
// jscodeshift -t /Users/shaneeza.ali/Documents/sites/leafygreen-ui/tools/migrator/src/transformations/remove-consoles/index.ts /Users/shaneeza.ali/Documents/sites/leafygreen-ui/tools/migrator/src/transformations/remove-consoles/testing.tsx -p
