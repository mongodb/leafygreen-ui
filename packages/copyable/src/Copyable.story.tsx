import React from 'react';
import { text, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Copyable, { Size, Variant } from '.';

function renderCopyable(
  props: Omit<
    React.ComponentProps<typeof Copyable>,
    'children' | 'label' | 'description' | 'variant'
  > = {},
) {
  const label = text('Label', 'Label');
  const description = text('Description', '') || undefined;
  const children = text('Text', 'npm install @leafygreen-ui/copyable');
  const variant = select('Variant', Object.values(Variant), Variant.Default);
  return (
    <div
      style={{
        backgroundColor: variant === Variant.Dark ? '#21313C' : undefined,
        padding: 48,
      }}
    >
      <Copyable
        label={label}
        description={description}
        variant={variant}
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
