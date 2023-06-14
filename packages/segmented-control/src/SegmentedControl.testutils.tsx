import React from 'react';

import Icon from '@leafygreen-ui/icon';
import { SegmentedControlOption } from '@leafygreen-ui/segmented-control';

export const TestChildren = {
  Basic: [
    <SegmentedControlOption key="dragonfruit" value="dragonfruit">
      Dragonfruit fruit
    </SegmentedControlOption>,
    <SegmentedControlOption key="eggplant" value="eggplant">
      Eggplant banana
    </SegmentedControlOption>,
    <SegmentedControlOption key="fig" value="fig">
      Fig
    </SegmentedControlOption>,
    <SegmentedControlOption key="grape" value="grape" disabled>
      Grape
    </SegmentedControlOption>,
  ],
  WithIcons: [
    <SegmentedControlOption
      key="json"
      value="json"
      glyph={<Icon glyph="CurlyBraces" />}
    >
      JSON and more
    </SegmentedControlOption>,
    <SegmentedControlOption key="xml" value="xml" glyph={<Icon glyph="Code" />}>
      XML
    </SegmentedControlOption>,
    <SegmentedControlOption
      disabled
      key="shell"
      value="shell"
      glyph={<Icon glyph="Shell" />}
    >
      Shell
    </SegmentedControlOption>,
  ],
  IconsOnly: [
    <SegmentedControlOption
      key="cloud"
      value="cloud"
      glyph={<Icon glyph="Cloud" />}
    />,
    <SegmentedControlOption
      key="globe"
      value="globe"
      glyph={<Icon glyph="GlobeAmericas" />}
    />,
    <SegmentedControlOption
      disabled
      key="government"
      value="government"
      glyph={<Icon glyph="GovernmentBuilding" />}
    />,
  ],
};
