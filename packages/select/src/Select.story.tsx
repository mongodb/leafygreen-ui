import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { uiColors } from '@leafygreen-ui/palette';
import { Option, OptionGroup, Select, Size } from '.';

storiesOf('Select', module)
  .add('Uncontrolled', () => {
    const darkMode = boolean('darkMode', false);
    const label = text('Label', 'Label');
    const description = text('Description', 'This is a description');
    const placeholder = text('Placeholder', 'Select');
    const size = select('Size', Object.values(Size), Size.Default);
    const disabled = boolean('Disabled', false);
    const withIcons = boolean('With icons', false);
    const glyph = withIcons ? <BeakerIcon /> : undefined;
    const useProvider = boolean('Use LeafygreenProvider', false);
    const Provider = useProvider ? LeafygreenProvider : React.Fragment;
    const usePortal = boolean('usePortal', false);

    return (
      <div
        className={css`
          position: absolute;
          background-color: ${darkMode ? uiColors.gray.dark3 : uiColors.white};
          padding: 20px;
          height: 100%;
          width: ${size === Size.Fill ? '600px' : undefined};
        `}
      >
        <Provider>
          <Select
            darkMode={darkMode}
            size={size}
            label={label}
            description={description}
            placeholder={placeholder}
            name="pets"
            defaultValue="cat"
            disabled={disabled}
            usePortal={usePortal}
          >
            <OptionGroup label="Common">
              <Option value="dog" glyph={glyph}>
                Dog
              </Option>
              <Option value="cat" glyph={glyph}>
                Cat
              </Option>
            </OptionGroup>
            <OptionGroup label="Less common">
              <Option value="hamster" glyph={glyph}>
                Hamster
              </Option>
              <Option value="parrot">Parrot</Option>
            </OptionGroup>
            <Option glyph={glyph}>Mexican spiny-tailed iguana</Option>
            <Option value="spider" glyph={glyph} disabled>
              Spider
            </Option>
          </Select>
        </Provider>
      </div>
    );
  })
  .add('Controlled', () => {
    const darkMode = boolean('darkMode', false);
    const label = text('Label', 'Label');
    const description = text('Description', 'This is a description');
    const placeholder = text('Placeholder', 'Select');
    const size = select('Size', Object.values(Size), Size.Default);
    const disabled = boolean('Disabled', false);
    const withIcons = boolean('With icons', false);
    const glyph = withIcons ? <BeakerIcon /> : undefined;
    const usePortal = boolean('usePortal', false);
    const useProvider = boolean('Use LeafygreenProvider', false);
    const Provider = useProvider ? LeafygreenProvider : React.Fragment;

    const [value, setValue] = useState('cat');

    return (
      <div
        className={css`
          position: absolute;
          background-color: ${darkMode ? uiColors.gray.dark3 : uiColors.white};
          padding: 20px;
          height: 100%;
        `}
      >
        <Provider>
          <Select
            darkMode={darkMode}
            size={size}
            label={label}
            description={description}
            placeholder={placeholder}
            name="pets"
            value={value}
            onChange={setValue}
            disabled={disabled}
            usePortal={usePortal}
          >
            <OptionGroup label="Common">
              <Option value="dog" glyph={glyph}>
                Dog
              </Option>
              <Option value="cat" glyph={glyph}>
                Cat
              </Option>
            </OptionGroup>
            <OptionGroup label="Less common">
              <Option value="hamster" glyph={glyph}>
                Hamster
              </Option>
              <Option value="parrot" glyph={glyph}>
                Parrot
              </Option>
            </OptionGroup>
            <Option glyph={glyph}>Mexican spiny-tailed iguana</Option>
            <Option value="spider" glyph={glyph} disabled>
              Spider
            </Option>
          </Select>
        </Provider>
      </div>
    );
  });
