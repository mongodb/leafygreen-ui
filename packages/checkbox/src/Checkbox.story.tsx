import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Checkbox from '.';

function Control() {
  const [checked, setChecked] = React.useState(false);
  const darkMode = boolean('darkMode', false);

  return (
    <Checkbox
      darkMode={darkMode}
      checked={checked}
      disabled={boolean('Disabled', false)}
      indeterminate={boolean('Indeterminate', false)}
      bold={boolean('Bold', false)}
      animate={boolean('Animate', true)}
      onChange={() => setChecked(curr => !curr)}
      label={text('Label', 'I agree to this thing.')}
      className={css`
        padding: 20px;
        background-color: ${darkMode ? uiColors.gray.dark3 : uiColors.white};
      `}
    />
  );
}

storiesOf('Checkbox', module)
  .add('Uncontrolled', () => {
    const darkMode = boolean('darkMode', false);

    return (
      <Checkbox
        darkMode={darkMode}
        disabled={boolean('Disabled', false)}
        indeterminate={boolean('Indeterminate', false)}
        label={text('Label', 'I agree to this thing.')}
        bold={boolean('Bold', false)}
        animate={boolean('Animate', true)}
        className={css`
          padding: 20px;
          background-color: ${darkMode ? uiColors.gray.dark3 : uiColors.white};
        `}
      />
    );
  })
  .add('Controlled', () => <Control />);
