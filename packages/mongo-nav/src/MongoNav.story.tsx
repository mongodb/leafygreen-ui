import React from 'react';
import { storiesOf } from '@storybook/react';
import MongoNav from '.';
import data from './data';

storiesOf('MongoNav', module).add('Default', () => (
  <MongoNav data={data} activeProduct="cloud" />
));
