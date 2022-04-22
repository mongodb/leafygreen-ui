import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import Card from './Card';
import { palette, uiColors } from '@leafygreen-ui/palette';

const containerStyle = css`
  display: flex;
  align-items: center;
  text-align: center;
`;

storiesOf('Packages/Card', module).add('Default', () => {
  const hasClickBehavior = boolean('Has click behavior', true);
  const darkMode = boolean('darkMode', false);

  return (
    <div
      className={css`
        padding: 24px;
        background-color: ${darkMode ? uiColors.gray.dark3 : palette.white};
      `}
    >
      <Card
        as="div"
        onClick={hasClickBehavior ? () => alert('hello') : undefined}
        darkMode={darkMode}
        className={containerStyle}
        tabIndex={0}
      >
        This is a card component
      </Card>
    </div>
  );
});
