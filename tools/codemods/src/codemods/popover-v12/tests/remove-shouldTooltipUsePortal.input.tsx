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
