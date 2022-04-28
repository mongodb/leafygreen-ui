import React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Copyable, { Size } from '.';

storiesOf('Packages/Copyable', module).add('Default', () => {
  const darkMode = boolean('Dark mode', false);
  const label = text('Label', 'Label');
  const description = text('Description', 'Description') || undefined;
  const children = text('Text', 'npm install @leafygreen-ui/copyable');
  const isCopyable = boolean('Copyable', true);
  const size = select('Size', Object.values(Size), 'default');
  const baseFontSize = select('Base Font Size', [14, 16], 14);

  return (
    <LeafygreenProvider baseFontSize={baseFontSize}>
      <div
        style={{
          backgroundColor: darkMode ? '#21313C' : undefined,
          padding: 48,
        }}
      >
        <Copyable
          label={label}
          description={description}
          darkMode={darkMode}
          copyable={isCopyable}
          size={size}
        >
          {children}
        </Copyable>
      </div>
    </LeafygreenProvider>
  );
});
