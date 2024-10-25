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
    return <InfoSprinkle usePortal={false} {...props} />;
  };

  return (
    <>
      <Code usePortal />
      <DatePicker />
      <GuideCue />
      <InfoSprinkle usePortal />
      <InlineDefinition usePortal={false} />
      <NumberInput usePortal={true} />
      <SearchInput usePortal />
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
