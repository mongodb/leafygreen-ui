import React from 'react';

import Copyable from '@leafygreen-ui/copyable';

const Child = (props) => {
  return <div>{props.children}</div>;
};

export const App = () => {
  const spreadProps = {
    prop: true,
  };

  const WrappedCopyable = (props) => {
    return (
      /* Please manually remove prop: shouldTooltipUsePortal */
      <Copyable shouldTooltipUsePortal={false} {...props} />
    );
  };

  return (
    <>
      <Copyable />
      <Copyable />
      <Copyable />
      <Copyable>
        <Child shouldTooltipUsePortal={false} />
      </Copyable>
      {/* Please manually remove prop: shouldTooltipUsePortal */}
      <Copyable shouldTooltipUsePortal={true} {...spreadProps} />
      <WrappedCopyable />
    </>
  );
};
