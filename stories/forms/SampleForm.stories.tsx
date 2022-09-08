import React from 'react';
import TextInput from '@leafygreen-ui/text-input';
import { Select } from '@leafygreen-ui/select';

export default {
  title: 'Form/Sample Forms',
};

export const Vertical = () => {
  return <div></div>;
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
