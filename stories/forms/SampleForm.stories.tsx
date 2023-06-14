import React from 'react';

import { Select } from '@leafygreen-ui/select';
import TextInput from '@leafygreen-ui/text-input';

export default {
  title: 'Form/Sample Forms',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Vertical = () => {
  return <div></div>;
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
