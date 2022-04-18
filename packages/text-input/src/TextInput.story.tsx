import React, { useState } from 'react';
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

storiesOf('Packages/TextInput', module)
  .add('Default', () => {
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
            sizeVariant={select(
              'Size Variant',
              ['xsmall', 'small', 'default', 'large'],
              'default',
            )}
            errorMessage={text('Error Message', 'This is an error message')}
            darkMode={darkMode}
            baseFontSize={select('Base Font Size', [14, 16], 14)}
          />
        </div>
      </LeafyGreenProvider>
    );
  })
  .add('Validation Demo', () => {
    const emailRegex =
      // eslint-disable-next-line no-control-regex
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const [state, setState] = useState<'none' | 'valid' | 'error'>('none');

    const handleValidation = (value: string) => {
      if (value.match(emailRegex)) {
        setState('valid');
      } else {
        setState('error');
      }
    };

    return (
      <LeafyGreenProvider>
        <div
          className={css`
            width: 256px;
            height: 100px;
          `}
        >
          <TextInput
            label="Email"
            description="Enter your email address"
            placeholder="lauren@ipsum.com"
            state={state}
            type="email"
            errorMessage="Invalid email"
            handleValidation={handleValidation}
          />
        </div>
      </LeafyGreenProvider>
    );
  });
