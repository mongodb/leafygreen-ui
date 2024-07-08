import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';
import { css } from '@leafygreen-ui/emotion';
import { FormFieldState } from '@leafygreen-ui/form-field';
import { RadioBox, RadioBoxGroup } from '@leafygreen-ui/radio-box-group';
import { Select } from '@leafygreen-ui/select';
import TextInput from '@leafygreen-ui/text-input';
import { color, spacing } from '@leafygreen-ui/tokens';
import { H3 } from '@leafygreen-ui/typography';

import { countries } from './utils';

export default {
  title: 'Form/Sample Forms',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Vertical = () => {
  const [formState, setFormState] = useState<FormFieldState>(
    FormFieldState.None,
  );

  const handleChange = (e: React.FormEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setFormState(value as FormFieldState);
  };

  const defaultMessage = 'This is a message';

  return (
    <div
      className={css`
        border: 1px solid ${color.dark.border.primary.default};
        background-color: ${color.dark.background.primary.default};
        width: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${spacing[600]}px;
        padding: ${spacing[600]}px;
      `}
    >
      <RadioBoxGroup darkMode onChange={handleChange} value={formState}>
        <RadioBox value={FormFieldState.Error}>Error</RadioBox>
        <RadioBox value={FormFieldState.None}>None</RadioBox>
        <RadioBox value={FormFieldState.Valid}>Valid</RadioBox>
      </RadioBoxGroup>
      <Card darkMode>
        <H3
          darkMode
          className={css`
            margin-bottom: ${spacing[200]}px;
          `}
        >
          Enter Billing Address
        </H3>

        <Combobox
          state={formState}
          errorMessage={defaultMessage}
          successMessage={defaultMessage}
          darkMode
          label="Country"
          placeholder="Select country"
          multiselect={false}
          className={css`
            margin-bottom: ${spacing[400]}px;
          `}
        >
          {countries.map(country => (
            <ComboboxOption key={country} value={country} />
          ))}
        </Combobox>

        <TextInput
          state={formState}
          errorMessage={defaultMessage}
          successMessage={defaultMessage}
          darkMode
          label="Street Address"
          placeholder="Enter Street Address"
          required
          className={css`
            margin-bottom: ${spacing[400]}px;
          `}
        />

        <TextInput
          state={formState}
          errorMessage={defaultMessage}
          successMessage={defaultMessage}
          darkMode
          label="Apt/Suite/Floor"
          placeholder="Enter Apt #/Suite #/Floor #"
          optional
          className={css`
            margin-bottom: ${spacing[400]}px;
          `}
        />

        <TextInput
          state={formState}
          errorMessage={defaultMessage}
          successMessage={defaultMessage}
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
            state={formState}
            errorMessage={defaultMessage}
            successMessage={defaultMessage}
            label="State/Province/Region"
            required
            placeholder="Enter state/province/region"
            darkMode
          />

          <TextInput
            state={formState}
            errorMessage={defaultMessage}
            successMessage={defaultMessage}
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
    </div>
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
