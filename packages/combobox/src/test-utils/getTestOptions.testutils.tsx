import React from 'react';

import Icon from '@leafygreen-ui/icon';

import { ComboboxGroup, ComboboxOption } from '..';

export const getComboboxOptions = (withGlyphs = true) => [
  <ComboboxOption
    key="apple"
    value="apple"
    displayName="Apple"
    data-testid="test-id"
    description="Do I keep the doctor away?"
    // eslint-disable-next-line no-console
    onClick={(event, value) => console.log(event, value)}
    className="className"
  />,
  <ComboboxOption key="banana" value="banana" displayName="Banana" />,
  <ComboboxOption key="carrot" value="carrot" displayName="Carrot" disabled />,
  <ComboboxOption
    key="pomegranate"
    value="pomegranate"
    displayName="Pomegranate"
    glyph={withGlyphs ? <Icon glyph="Warning" /> : undefined}
    description="Watch out, I stain everything I touch LOL"
    disabled
  />,
  <ComboboxOption
    key="plantain"
    value="plantain"
    displayName="Plantain"
    glyph={withGlyphs ? <Icon glyph="Connect" /> : undefined}
    description="Don't confuse me with a banana"
    // eslint-disable-next-line no-console
    onClick={() => console.log('I was clicked')}
  />,
  <ComboboxOption
    key="paragraph"
    value="paragraph"
    displayName="Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper."
  />,
  <ComboboxOption
    key="hash"
    value="hash"
    displayName="5f4dcc3b5aa765d61d8327deb882cf995f4dcc3b5aa765d61d8327deb882cf99"
  />,
  <ComboboxOption
    key="dragonfruit"
    value="dragonfruit"
    displayName="Dragonfruit"
    description="Rawr"
  />,
  <ComboboxOption key="eggplant" value="eggplant" displayName="Eggplant" />,
  <ComboboxOption key="fig" value="fig" displayName="Fig" />,
  <ComboboxOption key="grape" value="grape" displayName="Grape" />,
  <ComboboxOption key="honeydew" value="honeydew" displayName="Honeydew" />,
  <ComboboxOption
    key="iceberg-lettuce"
    value="iceberg-lettuce"
    displayName="Iceberg lettuce"
  />,
  <ComboboxGroup key="peppers" label="Peppers">
    <ComboboxOption key="cayenne" value="cayenne" displayName="Cayenne" />
    <ComboboxOption
      key="ghost-pepper"
      value="ghost-pepper"
      displayName="Ghost pepper"
    />
    <ComboboxOption key="habanero" value="habanero" displayName="Habanero" />
    <ComboboxOption key="jalapeno" value="jalapeno" displayName="Jalapeño" />
    <ComboboxOption
      key="red-pepper"
      value="red-pepper"
      displayName="Red pepper"
    />
    <ComboboxOption
      key="scotch-bonnet"
      value="scotch-bonnet"
      displayName="Scotch bonnet"
      description="Don't touch your eyes"
    />
  </ComboboxGroup>,
];
