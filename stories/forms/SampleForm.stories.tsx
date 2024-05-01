import React from 'react';

import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';
import { css } from '@leafygreen-ui/emotion';
import { Select } from '@leafygreen-ui/select';
import TextInput from '@leafygreen-ui/text-input';
import { spacing } from '@leafygreen-ui/tokens';
import { H3 } from '@leafygreen-ui/typography';

import { countries } from './utils';

export default {
  title: 'Form/Sample Forms',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Vertical = () => {
  return (
    <Card
      className={css`
        width: 400px;
      `}
      darkMode
    >
      <H3
        darkMode
        className={css`
          margin-bottom: ${spacing[200]}px;
        `}
      >
        Enter Billing Address
      </H3>

      <Combobox
        darkMode
        label="Country"
        placeholder="Select country"
        multiselect={false}
        className={css`
          margin-bottom: ${spacing[400]}px;
        `}
      >
        {countries.map(country => (
          <ComboboxOption value={country} />
        ))}
      </Combobox>

      <TextInput
        darkMode
        label="Street Address"
        placeholder="Enter Street Address"
        required
        className={css`
          margin-bottom: ${spacing[400]}px;
        `}
      />

      <TextInput
        darkMode
        label="Apt/Suite/Floor"
        placeholder="Enter Apt #/Suite #/Floor #"
        optional
        className={css`
          margin-bottom: ${spacing[400]}px;
        `}
      />

      <TextInput
        darkMode
        label="City"
        placeholder="Enter City"
        className={css`
          margin-bottom: ${spacing[400]}px;
        `}
      />

      <div
        className={css`
          display: flex;
          gap: ${spacing[600]}px;
          margin-bottom: ${spacing[600]}px;
        `}
      >
        <TextInput
          label="State/Province/Region"
          required
          placeholder="Enter state/province/region"
          darkMode
        />

        <TextInput
          darkMode
          label="ZIP or Postal Code"
          placeholder="Enter ZIP/postal"
        />
      </div>

      <Button
        darkMode
        className={css`
          width: 100%;
        `}
      >
        Save and Continue
      </Button>
    </Card>
  );
};
Vertical.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Horizontal = () => {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      <TextInput
        placeholder="lauren@ipsum.com"
        type="search"
        errorMessage="Invalid search"
        aria-label="Storybook"
      />
      <Select aria-labelledby="Storybook" readOnly value="Storybook">
        Children
      </Select>
    </div>
  );
};
Horizontal.parameters = {
  chromatic: { disableSnapshot: true },
};
