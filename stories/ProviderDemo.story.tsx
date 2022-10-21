import React, { useState } from 'react';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import { Body } from '@leafygreen-ui/typography';

export default {
  title: 'LeafyGreen Provider/DarkMode',
};

const DarkModeComponent = () => {
  const { darkMode, theme, setDarkMode } = useDarkMode();
  // console.log({ darkMode, theme });

  return (
    <Card darkMode={darkMode}>
      <Body>
        Currently in <Badge>{`${theme}`}</Badge> mode
      </Body>
      <br />
      <Button onClick={() => setDarkMode(!darkMode)}>Toggle context</Button>
    </Card>
  );
};

export const DarkModeDemo = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <LeafyGreenProvider darkMode={darkMode}>
        <DarkModeComponent />
      </LeafyGreenProvider>
      <br />
      <Button onClick={() => setDarkMode(!darkMode)}>Toggle outer state</Button>
      <br />
      <div>
        Outer state darkMode: <Badge>{`${darkMode}`}</Badge>
      </div>
    </>
  );
};
