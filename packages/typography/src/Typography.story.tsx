import React from 'react';
import { storiesOf } from '@storybook/react';
import { H1, H2, Subtitle, Body, Disclaimer } from '.';

storiesOf('Typography', module).add('Default', () => (
  <div>
    <H1>Heading 1</H1>
    <H2>Heading 2</H2>
    <Subtitle>Subtitle</Subtitle>
    <Body weight="medium">Body</Body>
    <Disclaimer>Disclaimer</Disclaimer>
  </div>
));
