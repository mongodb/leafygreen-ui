import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { H1, H2, Subtitle, Body, InlineCode, Disclaimer, Overline } from '.';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

storiesOf('Typography', module).add('Default', () => (
  <LeafygreenProvider typescale={select('typescale', [14, 16], 14)}>
    <div>
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <Subtitle>Subtitle</Subtitle>
      <Body weight="medium">Body</Body>
      <InlineCode>Code</InlineCode>
      <Disclaimer>Disclaimer</Disclaimer>
      <Overline>Overline</Overline>
    </div>
  </LeafygreenProvider>
));
