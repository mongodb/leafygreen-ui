import React from 'react';

import { Combobox } from '@leafygreen-ui/combobox';
import { Menu } from '@leafygreen-ui/menu';
import Popover from '@leafygreen-ui/popover';
import { Select } from '@leafygreen-ui/select';
import Tooltip from '@leafygreen-ui/tooltip';

export const App = () => {
  return (
    <>
      <Combobox usePortal />
      <Menu usePortal />
      <Popover renderMode="inline" />
      <Select renderMode="portal" />
      <Tooltip usePortal={false} />
    </>
  );
};
