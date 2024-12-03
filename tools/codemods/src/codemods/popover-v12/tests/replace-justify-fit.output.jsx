import React from 'react';

import { DatePicker as LGDatePicker } from '@leafygreen-ui/date-picker';
import { InfoSprinkle } from '@leafygreen-ui/info-sprinkle';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import { Menu } from '@leafygreen-ui/menu';
import Popover from '@leafygreen-ui/popover';
import LeafyGreenTooltip from '@leafygreen-ui/tooltip';

export const App = () => {
  return (
    <>
      <LGDatePicker justify="middle" />
      <InfoSprinkle justify="middle" />
      <InlineDefinition justify="middle" />
      <Menu justify="middle" renderMode="top-layer" />
      <Popover justify="middle" renderMode="top-layer" />
      <LeafyGreenTooltip justify="middle" renderMode="top-layer" />
    </>
  );
};
