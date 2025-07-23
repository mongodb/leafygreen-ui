import React from 'react';

import LeafyGreenCode from '@leafygreen-ui/code';
import { DatePicker } from '@leafygreen-ui/date-picker';
import { GuideCue } from '@leafygreen-ui/guide-cue';
import { InfoSprinkle } from '@leafygreen-ui/info-sprinkle';
import InlineDefinition from '@leafygreen-ui/inline-definition';
import { NumberInput } from '@leafygreen-ui/number-input';
import { SearchInput as LGSearchInput } from '@leafygreen-ui/search-input';

const Child = (props) => {
  return <div>{props.children}</div>;
};

export const App = () => {
  const spreadProps = {
    prop: true,
  };

  const WrappedInfoSprinkle = (props) => {
    return <InfoSprinkle usePortal={false} {...props} />;
  };

  return (
    <>
      <LeafyGreenCode usePortal />
      <DatePicker />
      <GuideCue />
      <InfoSprinkle usePortal />
      <InlineDefinition usePortal={false} />
      <NumberInput usePortal={true} />
      <LGSearchInput usePortal />
      <InfoSprinkle />
      <InfoSprinkle
        portalClassName="portal-class"
        portalRef={{ current: null }}
      />
      <InfoSprinkle
        portalContainer={{ current: null }}
        scrollContainer={{ current: null }}
      />
      <InfoSprinkle popoverZIndex={9999} usePortal>
        <Child usePortal={false} />
      </InfoSprinkle>
      <InfoSprinkle usePortal={true} {...spreadProps} />
      <WrappedInfoSprinkle />
    </>
  );
};
