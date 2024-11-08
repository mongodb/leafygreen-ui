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
    return <Copyable shouldTooltipUsePortal={false} {...props} />;
  };

  return (
    <>
      <Copyable />
      <Copyable shouldTooltipUsePortal={false} />
      <Copyable shouldTooltipUsePortal={true} />
      <Copyable shouldTooltipUsePortal>
        <Child shouldTooltipUsePortal={false} />
      </Copyable>
      <Copyable shouldTooltipUsePortal={true} {...spreadProps} />
      <WrappedCopyable />
    </>
  );
};
