import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import FormFooter from '.';

storiesOf('FormFooter', module)
  .add('Default', () => (
    <FormFooter
      sticky={boolean('Sticky', true)}
      primaryButton={{
        text: text('Primary button text', 'Save Draft'),
      }}
      cancelText={text('Cancel button text', '')}
      backButtonText={text('Back button text', '')}
      errorMessage={text('Error message', 'There is an error in this form')}
      contentClassName={css`
        max-width: 1024px;
      `}
    />
  ))
  .add('with custom button', () => (
    <FormFooter
      sticky={boolean('Sticky', true)}
      primaryButton={
        <Button
          leftGlyph={<Icon glyph={'Cloud'} />}
          rightGlyph={<Icon glyph={'Checkmark'} />}
          variant="primary"
          disabled={boolean('Primary button disabled', false)}
        >
          Save to cloud
        </Button>
      }
      cancelText={text('Cancel button text', '')}
      backButtonText={text('Back button text', 'Go back')}
      errorMessage={text('Error message', 'There is an error in this form')}
    />
  ));
