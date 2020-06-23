import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
import IconButton, { Variant, Size } from './IconButton';

const containerStyle = css`
  padding: 60px;
`;

const darkBackground = css`
  background-color: ${uiColors.gray.dark3};
`;

function getContainerStyle(variant: Variant) {
  return cx(containerStyle, {
    [darkBackground]: variant === Variant.Dark,
  });
}

function getCommonProps() {
  return {
    'aria-label': 'Cloud',
    active: boolean('active', false),
    disabled: boolean('disabled', false),
    variant: select(
      'variant',
      Object.values(Variant) as Array<Variant>,
      Variant.Light,
    ),
    size: select('Size', Object.values(Size) as Array<Size>, Size.Default),
  };
}

storiesOf('IconButton', module)
  .add('Default', () => {
    const commonProps = getCommonProps();

    return (
      <div className={getContainerStyle(commonProps.variant)}>
        <IconButton {...commonProps}>
          <CloudIcon />
        </IconButton>
      </div>
    );
  })
  .add('Link', () => {
    const commonProps = getCommonProps();

    return (
      <div className={getContainerStyle(commonProps.variant)}>
        <IconButton {...commonProps} href="https://mongodb.design">
          <EllipsisIcon />
        </IconButton>
      </div>
    );
  });
