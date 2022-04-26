import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
import IconButton, { Size } from './IconButton';

const containerStyle = css`
  padding: 60px;
`;

const darkBackground = css`
  background-color: ${uiColors.gray.dark3};
`;

function getContainerStyle(darkMode: boolean) {
  return cx(containerStyle, {
    [darkBackground]: darkMode,
  });
}

function getCommonProps() {
  return {
    'aria-label': 'Cloud',
    active: boolean('active', false),
    disabled: boolean('disabled', false),
    darkMode: boolean('darkMode', false),
    size: select('Size', Object.values(Size) as Array<Size>, Size.Default),
    // eslint-disable-next-line no-console
    onClick: () => console.log('Click'),
  };
}

storiesOf('Packages/IconButton', module)
  .add('Default', () => {
    const commonProps = getCommonProps();

    return (
      <LeafyGreenProvider>
        <div className={getContainerStyle(commonProps.darkMode)}>
          <IconButton {...commonProps}>
            <CloudIcon />
          </IconButton>
        </div>
      </LeafyGreenProvider>
    );
  })
  .add('Link', () => {
    const commonProps = getCommonProps();

    return (
      <div className={getContainerStyle(commonProps.darkMode)}>
        <IconButton {...commonProps} href="https://mongodb.design">
          <EllipsisIcon />
        </IconButton>
      </div>
    );
  });
