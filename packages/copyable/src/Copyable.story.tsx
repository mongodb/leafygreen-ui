import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Copyable, { Size } from '.';

function renderCopyable(
  props: Omit<
    React.ComponentProps<typeof Copyable>,
    'children' | 'label' | 'description' | 'variant'
  > = {},
) {
  const label = text('Label', 'Label');
  const description = text('Description', 'Description') || undefined;
  const children = text('Text', 'npm install @leafygreen-ui/copyable');
  const darkMode = boolean('Dark mode', false);
  return (
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
        {...props}
      >
        {children}
      </Copyable>
    </div>
  );
}

storiesOf('Copyable', module)
  .add('Default', () => renderCopyable())
  .add('Mobile', () => renderCopyable({ copyable: false }))
  .add('Education', () => renderCopyable({ size: Size.Large }));
