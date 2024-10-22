import React from 'react';

const Copyable = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const Child = (props: any) => {
  return <div>{props.children}</div>;
};

export const App = () => {
  const spreadProps = {
    prop: true,
  } as const;

  const WrappedCopyable = (props: any) => {
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
