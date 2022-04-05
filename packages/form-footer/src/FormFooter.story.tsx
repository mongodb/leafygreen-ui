import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import FormFooter from '.';

storiesOf('Packages/FormFooter', module)
  .add('Default', () => (
    <FormFooter
      className={css`
        position: fixed;
        bottom: 0;
        left: 0;
      `}
      primaryButton={{
        text: text('Primary button text', 'Save Draft'),
      }}
      cancelButtonText={text('Cancel button text', '')}
      backButtonText={text('Back button text', '')}
      errorMessage={text('Error message', 'There is an error in this form')}
      contentClassName={css`
        max-width: 1024px;
      `}
    />
  ))
  .add('with custom primary button', () => (
    <FormFooter
      className={css`
        position: fixed;
        bottom: 0;
        left: 0;
      `}
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
      cancelButtonText={text('Cancel button text', '')}
      backButtonText={text('Back button text', 'Go back')}
      errorMessage={text('Error message', 'There is an error in this form')}
    />
  ));
