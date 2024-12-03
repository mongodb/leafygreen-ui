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
      <LGDatePicker justify="fit" />
      <InfoSprinkle justify="fit" />
      <InlineDefinition justify="fit" />
      <Menu justify="fit" renderMode="top-layer" />
      <Popover justify="fit" renderMode="top-layer" />
      <LeafyGreenTooltip justify="fit" renderMode="top-layer" />
    </>
  );
};
