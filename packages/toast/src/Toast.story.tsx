import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, select, text, boolean } from '@storybook/addon-knobs';
import Toast, { Variant } from '.';

storiesOf('Packages/Toast', module).add('Default', () => {
  const variant = select('Variant', Object.values(Variant), 'success');
  const knobs = {
    variant,
    progress:
      variant === 'progress'
        ? number('Progress', 1, { range: true, min: 0, max: 1, step: 0.01 })
        : undefined,
    title: text('Title', 'Exercitation incididunt ea proident velit mollit'),
    body: text('Body', 'Velit ea exercitation qui aute dolor proident.'),
    open: boolean('Open', true),
    close: boolean('Close', false) ? () => {} : undefined,
  };

  return <Toast {...knobs} />;
});
