/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * This test file ensures that all Typescript types behave as intended
 * for components extending Polymorphic/InferredPolymorphic
 *
 * We explicitly list all the examples instead of relying on `describe.each`,
 * since it's unclear whether TS will catch errors
 */
/* eslint-disable jest/no-disabled-tests */

import React from 'react';
import NextLink from 'next/link';

import { WrapperProps } from '../utils/Polymorphic.testutils';

import {
  AdvancedPolymorphic,
  AdvancedPolymorphicWithRef,
  ExampleInferred,
  ExampleInferredDefaultButton,
  ExamplePolymorphic,
  ExamplePolymorphicWithRef,
} from '.';

// prettier-ignore
describe('Typescript types', () => {
  // eslint-disable-next-line react/display-name
  const WrapperWithRef = React.forwardRef<HTMLSpanElement, WrapperProps>(
    ({ children, ...rest }: WrapperProps, ref) => {
      return (
        <span data-testid="wrapper" {...rest} ref={ref}>
          {children}
        </span>
      );
    },
  );

  const AnchorLikeWrapper = (props: JSX.IntrinsicElements['a']) => {
    return <a {...props}>content</a>;
  };


  const divRef: React.MutableRefObject<HTMLDivElement | null> = {current: null}
  const anchorRef: React.MutableRefObject<HTMLAnchorElement | null> = {current: null}
  const spanRef: React.MutableRefObject<HTMLSpanElement | null> = {current: null}


  test.skip('ExamplePolymorphic', () => {
    <>
      <ExamplePolymorphic />
      <ExamplePolymorphic>some content</ExamplePolymorphic>
      <ExamplePolymorphic as="div" />
      <ExamplePolymorphic as="div" ref={divRef} />
      <ExamplePolymorphic as="div" ref={divRef}>content</ExamplePolymorphic>
      <ExamplePolymorphic key="some-key" />
      {/* @ts-expect-error - Must pass the correct ref type */}
      <ExamplePolymorphic as="div" ref={anchorRef} />
      {/* @ts-expect-error href is not allowed on explicit div */}
      <ExamplePolymorphic as="div" href="mongodb.design" />
      {/* @ts-expect-error target is not allowed on explicit div */}
      <ExamplePolymorphic as="div" target="_blank" />
      {/* @ts-expect-error - href not allowed on strict polymorphic */}
      <ExamplePolymorphic href="mongodb.design" />

      {/* @ts-expect-error - Require href when as="a" */}
      <ExamplePolymorphic as="a" />
      <ExamplePolymorphic as="a" href="mongodb.design" />
      <ExamplePolymorphic as="a" href="mongodb.design" ref={anchorRef} />
      <ExamplePolymorphic as="a" href="mongodb.design">content</ExamplePolymorphic>

      <ExamplePolymorphic as="input" />

      <ExamplePolymorphic as={WrapperWithRef} />
      <ExamplePolymorphic as={WrapperWithRef} ref={spanRef} />
      <ExamplePolymorphic as={WrapperWithRef} ref={spanRef} darkMode={true} />
      {/* TODO: ts-expect-error - Must pass the correct ref type */}
      <ExamplePolymorphic as={WrapperWithRef} ref={divRef} />
      {/* @ts-expect-error - Theme is not a prop on WrapperWithRef */}
      <ExamplePolymorphic as={WrapperWithRef} ref={spanRef} theme={'dark'} />
      {/* @ts-expect-error - href is not a prop on WrapperWithRef */}
      <ExamplePolymorphic as={WrapperWithRef} href=".design" />

      <ExamplePolymorphic as={AnchorLikeWrapper} href=".design" />
      <ExamplePolymorphic as={NextLink} href=".design" />
      <ExamplePolymorphic as={() => <></>} />
      {/* @ts-expect-error href is not valid on an empty component */}
      <ExamplePolymorphic as={() => <></>} href="forbidden"/>
    </>;
  });

  test.skip('ExamplePolymorphicWithRef', () => {
    <>
      <ExamplePolymorphicWithRef />
      <ExamplePolymorphicWithRef>some content</ExamplePolymorphicWithRef>
      <ExamplePolymorphicWithRef as="div" />
      <ExamplePolymorphicWithRef as="div" ref={divRef} />
      <ExamplePolymorphicWithRef as="div" ref={divRef}>content</ExamplePolymorphicWithRef>
      <ExamplePolymorphicWithRef key="some-key" />
      {/* @ts-expect-error - Must pass the correct ref type */}
      <ExamplePolymorphicWithRef as="div" ref={anchorRef} />
      {/* @ts-expect-error href is not allowed on explicit div */}
      <ExamplePolymorphicWithRef as="div" href="mongodb.design" />
      {/* @ts-expect-error target is not allowed on explicit div */}
      <ExamplePolymorphicWithRef target="_blank" />
      {/* @ts-expect-error - href not allowed on strict polymorphic */}
      <ExamplePolymorphicWithRef href="mongodb.design" />

      {/* @ts-expect-error - Require href when as="a" */}
      <ExamplePolymorphicWithRef as="a" />
      <ExamplePolymorphicWithRef as="a" href="mongodb.design" />
      <ExamplePolymorphicWithRef as="a" href="mongodb.design" ref={anchorRef} />
      <ExamplePolymorphicWithRef as="a" href="mongodb.design">content</ExamplePolymorphicWithRef>

      <ExamplePolymorphicWithRef as="input" />

      <ExamplePolymorphicWithRef as={WrapperWithRef} />
      <ExamplePolymorphicWithRef as={WrapperWithRef} ref={spanRef} />
      <ExamplePolymorphicWithRef as={WrapperWithRef} ref={spanRef} darkMode={true} />
      {/* TODO: ts-expect-error - Must pass the correct ref type */}
      <ExamplePolymorphicWithRef as={WrapperWithRef} ref={divRef} />
      {/* @ts-expect-error - Theme is not a prop on WrapperWithRef */}
      <ExamplePolymorphicWithRef as={WrapperWithRef} ref={spanRef} theme={'dark'} />
      {/* @ts-expect-error - href is not a prop on WrapperWithRef */}
      <ExamplePolymorphicWithRef as={WrapperWithRef} ref={spanRef} href=".design" />

      <ExamplePolymorphicWithRef as={AnchorLikeWrapper} href=".design" />
      <ExamplePolymorphicWithRef as={NextLink} href=".design" />
      <ExamplePolymorphicWithRef as={() => <></>} />
      {/* @ts-expect-error href is not valid on an empty component */}
      <ExamplePolymorphicWithRef as={() => <></>} href="forbidden"/>
    </>;
  });

  test.skip('AdvancedPolymorphic', () => {
    <>
      <AdvancedPolymorphic />
      <AdvancedPolymorphic>some content</AdvancedPolymorphic>
      <AdvancedPolymorphic as="div" />
      <AdvancedPolymorphic as="div" ref={divRef} />
      <AdvancedPolymorphic as="div" ref={divRef}>content</AdvancedPolymorphic>
      <AdvancedPolymorphic key="some-key" />
      {/* @ts-expect-error - Must pass the correct ref type */}
      <AdvancedPolymorphic as="div" ref={anchorRef} />
      {/* @ts-expect-error href is not allowed on explicit div */}
      <AdvancedPolymorphic as="div" href="mongodb.design" />
      {/* @ts-expect-error target is not allowed on explicit div */}
      <AdvancedPolymorphic as="div" targe="_blank" />
      {/* @ts-expect-error - href not allowed on strict polymorphic */}
      <AdvancedPolymorphic href="mongodb.design" />

      {/* @ts-expect-error - Require href when as="a" */}
      <AdvancedPolymorphic as="a" />
      <AdvancedPolymorphic as="a" href="mongodb.design" />
      <AdvancedPolymorphic as="a" href="mongodb.design" ref={anchorRef} />
      <AdvancedPolymorphic as="a" href="mongodb.design">content</AdvancedPolymorphic>

      <AdvancedPolymorphic as="input" />

      <AdvancedPolymorphic as={WrapperWithRef} />
      <AdvancedPolymorphic as={WrapperWithRef} ref={spanRef} />
      <AdvancedPolymorphic as={WrapperWithRef} ref={spanRef} darkMode={true} />
      {/* TODO: ts-expect-error - Must pass the correct ref type */}
      <AdvancedPolymorphic as={WrapperWithRef} ref={divRef} />
      {/* @ts-expect-error - Theme is not a prop on WrapperWithRef */}
      <AdvancedPolymorphic as={WrapperWithRef} ref={spanRef} theme={'dark'} />
      {/* @ts-expect-error - href is not a prop on WrapperWithRef */}
      <AdvancedPolymorphic as={WrapperWithRef} ref={spanRef} href=".design" />

      <AdvancedPolymorphic as={AnchorLikeWrapper} href=".design" />
      <AdvancedPolymorphic as={NextLink} href=".design" />
      <AdvancedPolymorphic as={() => <></>} />
      {/* @ts-expect-error href is not valid on an empty component */}
      <AdvancedPolymorphic as={() => <></>} href="forbidden"/>
    </>;
  });

  test.skip('AdvancedPolymorphicWithRef', () => {
    <>
      <AdvancedPolymorphicWithRef />
      <AdvancedPolymorphicWithRef>some content</AdvancedPolymorphicWithRef>
      <AdvancedPolymorphicWithRef as="div" />
      <AdvancedPolymorphicWithRef as="div" ref={divRef} />
      <AdvancedPolymorphicWithRef as="div" ref={divRef}>content</AdvancedPolymorphicWithRef>
      <AdvancedPolymorphicWithRef key="some-key" />
      {/* @ts-expect-error - Must pass the correct ref type */}
      <AdvancedPolymorphicWithRef as="div" ref={anchorRef} />
      {/* @ts-expect-error href is not allowed on explicit div */}
      <AdvancedPolymorphicWithRef as="div" href="mongodb.design" />
      {/* @ts-expect-error href is not allowed on strict polymorphic */}
      <AdvancedPolymorphicWithRef href="mongodb.design" />
      {/* @ts-expect-error target is not allowed on explicit div */}
      <AdvancedPolymorphicWithRef as="div" target="_blank" />

      {/* @ts-expect-error - Require href when as="a" */}
      <AdvancedPolymorphicWithRef as="a" />
      <AdvancedPolymorphicWithRef as="a" href="mongodb.design" />
      <AdvancedPolymorphicWithRef as="a" href="mongodb.design" ref={anchorRef} />
      <AdvancedPolymorphicWithRef as="a" href="mongodb.design">content</AdvancedPolymorphicWithRef>

      <AdvancedPolymorphicWithRef as="input" />

      <AdvancedPolymorphicWithRef as={WrapperWithRef} />
      <AdvancedPolymorphicWithRef as={WrapperWithRef} ref={spanRef} />
      <AdvancedPolymorphicWithRef as={WrapperWithRef} ref={spanRef} darkMode={true} />
      {/* TODO: ts-expect-error - Must pass the correct ref type */}
      <AdvancedPolymorphicWithRef as={WrapperWithRef} ref={divRef} />
      {/* @ts-expect-error - Theme is not a prop on WrapperWithRef */}
      <AdvancedPolymorphicWithRef as={WrapperWithRef} ref={spanRef} theme={'dark'} />
      {/* @ts-expect-error - href is not a prop on WrapperWithRef */}
      <AdvancedPolymorphicWithRef as={WrapperWithRef} ref={spanRef} href=".design" />

      <AdvancedPolymorphicWithRef as={AnchorLikeWrapper} href=".design" />
      <AdvancedPolymorphicWithRef as={NextLink} href=".design" />
      <AdvancedPolymorphicWithRef as={() => <></>} />
      {/* @ts-expect-error href is not valid on an empty component */}
      <AdvancedPolymorphicWithRef as={() => <></>} href="forbidden"/>
    </>;
  });

  test.skip('ExampleInferred', () => {
    <>
      <ExampleInferred />
      <ExampleInferred>some content</ExampleInferred>
      <ExampleInferred as="div" />
      <ExampleInferred as="div" ref={divRef} />
      <ExampleInferred as="div" ref={divRef}>content</ExampleInferred>
      <ExampleInferred key="some-key" />
      {/* @ts-expect-error - Must pass the correct ref type */}
      <ExampleInferred as="div" ref={anchorRef} />
      {/* @ts-expect-error href is not allowed on explicit div */}
      <ExampleInferred as="div" href="mongodb.design" />
      {/* @ts-expect-error target is not allowed on explicit div */}
      <ExampleInferred as="div" target="_blank" />

      {/* @ts-expect-error - Require href when as="a" */}
      <ExampleInferred as="a" />
      <ExampleInferred href="mongodb.design" /> {/* This IS allowed for `inferred` */}
      <ExampleInferred as="a" href="mongodb.design" />
      <ExampleInferred as="a" href="mongodb.design" ref={anchorRef} />
      <ExampleInferred as="a" href="mongodb.design">content</ExampleInferred>


      <ExampleInferred as="input" />

      <ExampleInferred as={WrapperWithRef} />
      <ExampleInferred as={WrapperWithRef} ref={spanRef} />
      <ExampleInferred as={WrapperWithRef} ref={spanRef} darkMode={true} />
      {/* TODO: ts-expect-error - Must pass the correct ref type */}
      <ExampleInferred as={WrapperWithRef} ref={divRef} />
      {/* @ts-expect-error - Theme is not a prop on WrapperWithRef */}
      <ExampleInferred as={WrapperWithRef} theme={'dark'} />
      {/* @ts-expect-error - href is not a prop on WrapperWithRef */}
      <ExampleInferred as={WrapperWithRef} href=".design" />

      <ExampleInferred as={AnchorLikeWrapper} href=".design" />
      <ExampleInferred as={NextLink} href=".design" />
      {/** @ts-expect-error TODO: href is not valid on an empty component. See {@link InferredPolymorphicProps} */}
      <ExampleInferred as={() => <></>} />
      {/** TODO: ts-expect-error href is not valid on an empty component. See {@link InferredPolymorphicProps}*/}
      <ExampleInferred as={() => <></>} href="forbidden"/>
    </>;
  });

  test.skip('ExampleInferredDefaultButton', () => {
    <>
      <ExampleInferredDefaultButton />
      <ExampleInferredDefaultButton>some content</ExampleInferredDefaultButton>
      <ExampleInferredDefaultButton as="div" />
      <ExampleInferredDefaultButton as="div" ref={divRef} />
      <ExampleInferredDefaultButton as="div" ref={divRef}>content</ExampleInferredDefaultButton>
      <ExampleInferredDefaultButton key="some-key" />
      {/* @ts-expect-error - Must pass the correct ref type */}
      <ExampleInferredDefaultButton as="div" ref={anchorRef} />
      {/* @ts-expect-error - type not valid for anchor */}
      <ExampleInferredDefaultButton as="a" type="submit" />
      {/* @ts-expect-error - href not valid when explicitly set to button */}
      <ExampleInferredDefaultButton as="button" href="mongodb.design" />
      {/* @ts-expect-error href is not allowed on explicit div */}
      <ExampleInferredDefaultButton as="div" href="mongodb.design" />
      {/* @ts-expect-error target is not allowed on explicit div */}
      <ExampleInferredDefaultButton as="div" target="_blank" />

      {/* @ts-expect-error - Require href when as="a" */}
      <ExampleInferredDefaultButton as="a" />
      <ExampleInferredDefaultButton href="mongodb.design" /> {/* This IS allowed for `inferred` */}
      <ExampleInferredDefaultButton as="a" href="mongodb.design" />
      <ExampleInferredDefaultButton as="a" href="mongodb.design" ref={anchorRef} />
      <ExampleInferredDefaultButton as="a" href="mongodb.design">content</ExampleInferredDefaultButton>

      <ExampleInferredDefaultButton as="input" />

      <ExampleInferredDefaultButton as={WrapperWithRef} />
      <ExampleInferredDefaultButton as={WrapperWithRef} ref={spanRef} />
      <ExampleInferredDefaultButton as={WrapperWithRef} ref={spanRef} darkMode={true} />
      {/* TODO: ts-expect-error - Must pass the correct ref type */}
      <ExampleInferredDefaultButton as={WrapperWithRef} ref={divRef} />
      <ExampleInferredDefaultButton as={WrapperWithRef} ref={divRef} />
      {/* @ts-expect-error - Theme is not a prop on WrapperWithRef */}
      <ExampleInferredDefaultButton as={WrapperWithRef} ref={spanRef} theme={'dark'} />
      {/* @ts-expect-error - href is not a prop on WrapperWithRef */}
      <ExampleInferredDefaultButton as={WrapperWithRef} href=".design" />

      <ExampleInferredDefaultButton as={AnchorLikeWrapper} href=".design" />
      <ExampleInferredDefaultButton as={NextLink} href=".design" />
      {/** @ts-expect-error TODO: href is not valid on an empty component. See {@link InferredPolymorphicProps} */}
      <ExampleInferredDefaultButton as={() => <></>} />
      {/** TODO: ts-expect-error href is not valid on an empty component. See {@link InferredPolymorphicProps}*/}
      <ExampleInferredDefaultButton as={() => <></>} href="forbidden"/>
    </>;
  });
});
