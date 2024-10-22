import React from 'react';

const Code = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const DatePicker = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const GuideCue = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const InfoSprinkle = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const InlineDefinition = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const NumberInput = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const SearchInput = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const Child = (props: any) => {
  return <div>{props.children}</div>;
};

export const App = () => {
  const spreadProps = {
    prop: true,
  } as const;

  const WrappedInfoSprinkle = (props: any) => {
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
      <Code />
      <DatePicker />
      <GuideCue />
      <InfoSprinkle />
      <InlineDefinition />
      <NumberInput />
      <SearchInput />
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
