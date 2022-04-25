import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
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

storiesOf('Packages/Checkbox', module)
  .add('Uncontrolled', () => {
    const darkMode = boolean('darkMode', false);

    return (
      <LeafygreenProvider>
        <Checkbox
          darkMode={darkMode}
          disabled={boolean('Disabled', false)}
          indeterminate={boolean('Indeterminate', false)}
          animate={boolean('Animate', true)}
          label={text('Label', 'I agree to this thing.')}
          description={text(
            'Description',
            'Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
          )}
          className={css`
            padding: 20px;
            background-color: ${darkMode
              ? uiColors.gray.dark3
              : uiColors.white};
            max-width: 512px;
          `}
        />
      </LeafygreenProvider>
    );
  })
  .add('Controlled', () => (
    <LeafygreenProvider>
      <Control />
    </LeafygreenProvider>
  ))
  .add('No Label', () => {
    return (
      <LeafygreenProvider>
        <Checkbox
          aria-label="Some Check"
          animate={true}
          className={css`
            padding: 20px;
          `}
        />
      </LeafygreenProvider>
    );
  });
