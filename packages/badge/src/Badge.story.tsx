import React from 'react';
import { text, select } from '@storybook/addon-knobs';
import Badge from './Badge';
import { Variant } from '.';

export default {
  title: 'Packages/Badge',
  subtitle: '',
  component: Badge,
};

export const basic = () => (
  <Badge variant={select('Variant', Object.values(Variant), Variant.LightGray)}>
    {text('Badge Text', 'Badge')}
  </Badge>
);
