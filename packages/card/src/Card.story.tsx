import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { css, cx } from '@leafygreen-ui/emotion';
import Card from './Card';
import { uiColors } from '@leafygreen-ui/palette';

const containerStyle = css`
  padding: 16px;
  height: 70px;
  width: 140px;
  display: flex;
  align-items: center;
  text-align: center;
`;

storiesOf('Card', module).add('Default', () => {
  const hasClickBehavior = boolean('Has click behavior', true);
  const darkMode = boolean('darkMode', false);

  return (
    <div
      className={css`
        padding: 24px;
        background-color: ${darkMode ? uiColors.gray.dark3 : uiColors.white};
      `}
    >
      <Card
        as="div"
        onClick={hasClickBehavior ? () => alert('hello') : undefined}
        darkMode={darkMode}
        className={cx(
          containerStyle,
          css`
            color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
          `,
        )}
      >
        This is a card component
      </Card>
    </div>
  );
});
