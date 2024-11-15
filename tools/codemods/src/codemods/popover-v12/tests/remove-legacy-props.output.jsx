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
    return (
      /* Please manually remove prop: popoverZIndex */
      /* Please manually remove prop: portalClassName */
      /* Please manually remove prop: portalContainer */
      /* Please manually remove prop: portalRef */
      /* Please manually remove prop: scrollContainer */
      /* Please manually remove prop: usePortal */
      <InfoSprinkle usePortal={false} {...props} />
    );
  };

  return (
    <>
      <LeafyGreenCode />
      <DatePicker />
      <GuideCue />
      <InfoSprinkle />
      <InlineDefinition />
      <NumberInput />
      <LGSearchInput />
      <InfoSprinkle />
      <InfoSprinkle />
      <InfoSprinkle />
      <InfoSprinkle>
        <Child usePortal={false} />
      </InfoSprinkle>
      {/* Please manually remove prop: popoverZIndex */}
      {/* Please manually remove prop: portalClassName */}
      {/* Please manually remove prop: portalContainer */}
      {/* Please manually remove prop: portalRef */}
      {/* Please manually remove prop: scrollContainer */}
      {/* Please manually remove prop: usePortal */}
      <InfoSprinkle usePortal={true} {...spreadProps} />
      <WrappedInfoSprinkle />
    </>
  );
};
