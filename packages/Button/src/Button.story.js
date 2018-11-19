import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { css } from 'react-emotion';
import Button from '.';

const buttonClass = css`
  & + & {
    margin-left: 0.5rem;
  }
`

storiesOf('Button', module).add(
  'docs',
  withInfo(`
    This component creates a button with all accessibility properties included,
    which triggers a function on click. The class(es), name, label, and click
    handlers are all customizable.`)(() => (
    <>
      <section className="storybook-container">
        <h2>Extra Small</h2>

        <Button
          variant='default'
          size='xsmall'
          className={buttonClass}>
          Default
        </Button>

        <Button
          variant='primary'
          size='xsmall'
          className={buttonClass}>
          Primary
        </Button>

        <Button
          variant='info'
          size='xsmall'
          className={buttonClass}>
          Info
        </Button>

        <Button
          variant='danger'
          size='xsmall'
          className={buttonClass}>
          Danger
        </Button>

        <Button
          variant='dark'
          size='xsmall'
          className={buttonClass}>
          Dark
        </Button>

        <Button
          variant='primary'
          size='xsmall'
          disabled='true'
          className={buttonClass}>
          Disabled
        </Button>
      </section>

      <section className="storybook-container">
        <h2>Small</h2>

        <Button
          variant='default'
          size='small'
          className={buttonClass}>
          Default
        </Button>

        <Button
          variant='primary'
          size='small'
          className={buttonClass}>
          Primary
        </Button>

        <Button
          variant='info'
          size='small'
          className={buttonClass}>
          Info
        </Button>

        <Button
          variant='danger'
          size='small'
          className={buttonClass}>
          Danger
        </Button>

        <Button
          variant='dark'
          size='small'
          className={buttonClass}>
          Dark
        </Button>

        <Button
          variant='primary'
          size='small'
          disabled='true'
          className={buttonClass}>
          Disabled
        </Button>
      </section>

      <section className="storybook-container">
        <h2>Normal</h2>

        <Button
          variant='default'
          className={buttonClass}>
          Default
        </Button>

        <Button
          variant='primary'
          className={buttonClass}>
          Primary
        </Button>

        <Button
          variant='info'
          className={buttonClass}>
          Info
        </Button>

        <Button
          variant='danger'
          className={buttonClass}>
          Danger
        </Button>

        <Button
          variant='dark'
          className={buttonClass}>
          Dark
        </Button>

        <Button
          variant='primary'
          disabled='true'
          className={buttonClass}>
          Disabled
        </Button>
      </section>

      <section className="storybook-container">
        <h2>Large</h2>

        <Button
          variant='default'
          size='large'
          className={buttonClass}>
          Default
        </Button>

        <Button
          variant='primary'
          size='large'
          className={buttonClass}>
          Primary
        </Button>

        <Button
          variant='info'
          size='large'
          className={buttonClass}>
          Info
        </Button>

        <Button
          variant='danger'
          size='large'
          className={buttonClass}>
          Danger
        </Button>

        <Button
          variant='dark'
          size='large'
          className={buttonClass}>
          Dark
        </Button>

        <Button
          variant='primary'
          size='large'
          disabled='true'
          className={buttonClass}>
          Disabled
        </Button>
      </section>
    </>
  )),
);
