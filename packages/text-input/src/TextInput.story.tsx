import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { uiColors } from '@leafygreen-ui/palette';
import { cx, css } from '@leafygreen-ui/emotion';
import TextInput, { TextInputType } from '.';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

const wrapperStyle = css`
  width: 400px;
  padding: 40px;
`;

storiesOf('TextInput', module).add('Default', () => {
  const darkMode = boolean('darkMode', false);

  return (
    <LeafyGreenProvider>
      <div
        className={cx(wrapperStyle, {
          [css`
            background-color: ${uiColors.gray.dark3};
          `]: darkMode,
        })}
      >
        <TextInput
          label={text('Label', 'Input Label')}
          description={text(
            'Description',
            'This is a description for the input',
          )}
          optional={boolean('Optional', false)}
          disabled={boolean('Disabled', false)}
          placeholder={text(
            'Placeholder Text',
            'This is some placeholder text',
          )}
          state={select('State', ['none', 'valid', 'error'], 'none')}
          type={select(
            'Type',
            Object.values(TextInputType),
            TextInputType.Text,
          )}
          errorMessage={text('Error Message', 'This is an error message')}
          darkMode={darkMode}
          handleValidation={value => console.log(`handleValidation ${value}`)}
        />
      </div>
    </LeafyGreenProvider>
  );
});
