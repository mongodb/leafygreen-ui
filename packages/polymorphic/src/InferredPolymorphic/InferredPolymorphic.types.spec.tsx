/**
 * Spec file for InferredPolymorphic types
 *
 * Here we simply declare typed variables
 * and expect them to satisfy the type constraints
 *
 */
/* eslint-disable @typescript-eslint/no-unused-vars, jest/no-disabled-tests, padding-line-between-statements */

import React, { MouseEventHandler } from 'react';

import {
  PolymorphicAs,
  PolymorphicRef,
} from '../Polymorphic/Polymorphic.types';
import { NodeUrlLike } from '../utils/Polymorphic.utils';

import { useInferredPolymorphic, useInferredPolymorphicProps } from './hooks';
import { InferredPolymorphic } from './InferredPolymorphic';
import {
  AnchorLike,
  AnchorLikeProps,
  InferredPolymorphicProps,
  InferredPolymorphicRenderFunction,
} from './InferredPolymorphic.types';

const TestAnchorLike = ((_props: { href: string }) => (
  <></>
)) satisfies PolymorphicAs;
const TestNodeURLAnchorLike = ((_props: { href: NodeUrlLike }) => (
  <></>
)) satisfies PolymorphicAs;

const TestArbitraryComponent = ((_props: { someProp: any }) => (
  <></>
)) satisfies PolymorphicAs;

const getRandAs = (): PolymorphicAs => (Math.random() > 0.5 ? 'div' : 'a');

describe.skip('Inferred Polymorphic types', () => {
  test('AnchorLike', () => {
    'a' satisfies AnchorLike;
    // @ts-expect-error - not assignable to AnchorLike
    'button' satisfies AnchorLike;
    TestAnchorLike satisfies AnchorLike;
    // @ts-expect-error - not assignable to AnchorLike
    TestArbitraryComponent satisfies AnchorLike;
    TestNodeURLAnchorLike satisfies AnchorLike;
  });

  test('AnchorLikeProps', () => {
    // explicit 'a'
    {
      const _A: AnchorLikeProps<'a'> = {
        as: 'a',
        href: '',
      };

      // @ts-expect-error - expect href
      const _A2: AnchorLikeProps<'a'> = {
        as: 'a',
      };
    }

    // button
    {
      // @ts-expect-error T must extend AnchorLike
      const _B: AnchorLikeProps<'button'> = { as: 'button' };

      // @ts-expect-error Nothing is inferred yet
      const _B2: AnchorLikeProps<'button'> = { href: 'mongodb' };
    }

    // anchor-like
    {
      const _C: AnchorLikeProps<typeof TestAnchorLike> = {
        as: TestAnchorLike,
        href: '',
      };

      // @ts-expect-error - expect href
      const _C2: AnchorLikeProps<typeof TestAnchorLike> = {
        as: TestAnchorLike,
      };

      // explicit as is not required here
      const _C3: AnchorLikeProps<typeof TestAnchorLike> = {
        href: '',
      };
    }

    // TestNodeURLAnchorLike
    {
      const _E: AnchorLikeProps<typeof TestNodeURLAnchorLike> = {
        as: TestNodeURLAnchorLike,
        href: '', // FIXME: if `href` is a string, we infer `as="a"`
      };

      const _E2: AnchorLikeProps<typeof TestNodeURLAnchorLike> = {
        as: TestNodeURLAnchorLike,
        href: {
          hostname: 'mongodb.design',
        } as NodeUrlLike,
      };
    }

    // undefined
    {
      const _U: AnchorLikeProps<undefined> = { as: 'a', href: '' }; // undefined type arg sets expected `as` = 'a'
      const _U2: AnchorLikeProps<undefined> = { href: '' }; // undefined type arg infers `as` = 'a'
      // @ts-expect-error - undefined type sets as = 'a'
      const _U3: AnchorLikeProps<undefined> = { as: 'button', href: '' };
    }

    // generic PolymorphicAs
    {
      // @ts-expect-error T must extend AnchorLike
      const _G: AnchorLikeProps<PolymorphicAs> = { as: 'a' };
    }
  });

  test('InferredPolymorphicProps', () => {
    // anchor
    {
      const _A: InferredPolymorphicProps<'a'> = {
        href: 'mongodb.design',
      };

      const _A2: InferredPolymorphicProps<'a'> = {
        as: 'a',
        href: 'mongodb.design',
      };

      // @ts-expect-error - 'a' requires href
      const _A3: InferredPolymorphicProps<'a'> = {};
      // @ts-expect-error - explicit `as` can't be reassigned
      const _A4: InferredPolymorphicProps<'a'> = { as: 'button' };
    }

    // button
    {
      const _B: InferredPolymorphicProps<'button'> = {
        as: 'button',
      };

      // as='a' inferred from href regardless of type T
      const _B2: InferredPolymorphicProps<'button'> = {
        href: 'mongodb.design',
      };
      const _B3: InferredPolymorphicProps<'button'> = {
        as: 'a',
        href: 'mongodb.design',
      };

      const _B4: InferredPolymorphicProps<'button'> = {
        as: 'button',
        // @ts-expect-error href does not exist explicit button
        href: 'mongodb.design',
      };
    }

    // AnchorLike
    {
      const _C: InferredPolymorphicProps<typeof TestAnchorLike> = {
        as: TestAnchorLike,
        href: 'mongodb.design',
      };
      // @ts-expect-error - href required on anchor-like
      const _C2: InferredPolymorphicProps<typeof TestAnchorLike> = {
        as: TestAnchorLike,
      };
    }

    // not AnchorLike
    {
      const _D: InferredPolymorphicProps<typeof TestArbitraryComponent> = {
        as: TestArbitraryComponent,
        someProp: 'foobar',
      };

      const _D2: InferredPolymorphicProps<typeof TestArbitraryComponent> = {
        as: TestArbitraryComponent,
        // @ts-expect-error - href does not exist on TestNotAnchorLike
        href: 'mongodb.design',
      };
    }

    // NodeURL AnchorLike
    {
      const _E: InferredPolymorphicProps<typeof TestNodeURLAnchorLike> = {
        as: TestNodeURLAnchorLike,
        href: '', // FIXME: if `href` is a string, we infer `as="a"`
      };

      const _E2: InferredPolymorphicProps<typeof TestNodeURLAnchorLike> = {
        as: TestNodeURLAnchorLike,
        href: {
          hostname: 'mongodb.design',
        },
      };
    }

    // typed generic PolymorphicAs
    {
      const _G0: InferredPolymorphicProps<PolymorphicAs> = {}; // empty object is technically valid
      const _G1a: InferredPolymorphicProps<PolymorphicAs> = {
        as: 'a',
        href: '',
      };
      const _G2a: InferredPolymorphicProps<PolymorphicAs> = {
        as: 'button',
      };
      const _G3a: InferredPolymorphicProps<PolymorphicAs> = {
        as: TestAnchorLike, // extends InheritedExplicitAnchorLikeProps
        href: 'mongodb.design',
      };
      const _G4a: InferredPolymorphicProps<PolymorphicAs> = {
        as: TestArbitraryComponent,
        someProp: 'foobar',
      };
      const _G5a: InferredPolymorphicProps<PolymorphicAs> = {
        as: TestNodeURLAnchorLike,
        href: { hostname: 'mongodb.design' },
      };

      const _G1b: InferredPolymorphicProps<PolymorphicAs> = {
        as: 'a' as PolymorphicAs,
        href: 'mongodb.design',
      };
      const _G2b: InferredPolymorphicProps<PolymorphicAs> = {
        as: 'button' as PolymorphicAs,
      };
      const _G3b: InferredPolymorphicProps<PolymorphicAs> = {
        as: TestAnchorLike as PolymorphicAs,
        href: 'mongodb.design',
      };
      const _G4b: InferredPolymorphicProps<PolymorphicAs> = {
        as: TestArbitraryComponent as PolymorphicAs,
        someProp: 'foobar',
      };
      const _G5b: InferredPolymorphicProps<PolymorphicAs> = {
        as: TestNodeURLAnchorLike as PolymorphicAs,
        href: { hostname: 'mongodb.design' },
      };
    }

    const randAs = getRandAs();
    const _R: InferredPolymorphicProps<typeof randAs> = {
      as: randAs,
      href: 'mongodb.design',
    };
  });

  test('InferredPolymorphicRenderFunction', () => {
    const renderInferredPoly: InferredPolymorphicRenderFunction = (p, r) => (
      <></>
    );

    // accepts empty props
    renderInferredPoly({}, null);

    // Accepts href without `as`
    renderInferredPoly({ href: '' }, null);

    // as = anchor
    {
      // @ts-expect-error - href is required on anchor
      renderInferredPoly({ as: 'a' }, null);
      renderInferredPoly({ as: 'a', href: '' }, null);
      renderInferredPoly({ as: 'a', href: '', id: 'abc' }, null);
    }

    // button
    {
      renderInferredPoly({ as: 'button' }, null);
      // @ts-expect-error href not valid on explicit button
      renderInferredPoly({ as: 'button', href: '' }, null);
      // @ts-expect-error misc. props not valid
      renderInferredPoly({ as: 'button', foo: 'bar' }, null);
    }

    // AnchorLike
    {
      renderInferredPoly({ as: TestAnchorLike, href: 'mongodb.design' }, null);
      // @ts-expect-error - href is required on TestAnchorLike
      renderInferredPoly({ as: TestAnchorLike }, null);
    }

    // not AnchorLike
    {
      renderInferredPoly(
        { as: TestArbitraryComponent, someProp: 'lorem' },
        null,
      );
      // @ts-expect-error - someProp is required
      renderInferredPoly({ as: TestArbitraryComponent }, null);
      renderInferredPoly(
        // @ts-expect-error - href is not valid
        { as: TestArbitraryComponent, someProp: 'lorem', href: '' },
        null,
      );
      // @ts-expect-error - misc. props not valid
      renderInferredPoly({ as: TestArbitraryComponent, foo: 'bar' }, null);
    }

    // NodeURL AnchorLike
    {
      renderInferredPoly({ as: TestNodeURLAnchorLike, href: '' }, null);

      renderInferredPoly(
        {
          as: TestNodeURLAnchorLike,
          href: {
            hostname: 'mongodb.design',
          },
        },
        null,
      );
    }

    // generically typed
    {
      renderInferredPoly({ as: 'a' as PolymorphicAs }, null);
      renderInferredPoly({ as: 'a' as PolymorphicAs, href: '' }, null);

      renderInferredPoly({ as: 'button' as PolymorphicAs }, null);
      renderInferredPoly({ as: 'button' as PolymorphicAs, href: '' }, null);
      renderInferredPoly(
        { as: 'button' as PolymorphicAs, 'aria-label': 'bar' },
        null,
      );
      // @ts-expect-error - misc. props not allowed
      renderInferredPoly({ as: 'button' as PolymorphicAs, foo: 'bar' }, null);

      renderInferredPoly({ as: TestAnchorLike as PolymorphicAs }, null);
      renderInferredPoly(
        { as: TestAnchorLike as PolymorphicAs, href: '' },
        null,
      );
      renderInferredPoly(
        // @ts-expect-error - misc. props not allowed
        { as: TestAnchorLike as PolymorphicAs, foo: 'bar' },
        null,
      );

      renderInferredPoly({ as: TestArbitraryComponent as PolymorphicAs }, null);
      renderInferredPoly(
        // @ts-expect-error - when generically defined, non-JSXIntrinsicAttributes are not valid
        { as: TestArbitraryComponent as PolymorphicAs, someProp: 'lorem' },
        null,
      );

      renderInferredPoly(
        {
          as: TestNodeURLAnchorLike as PolymorphicAs,
          // @ts-expect-error - when generically defined, non-JSXIntrinsicAttributes are not valid
          href: { hostname: 'mongo' },
        },
        null,
      );
    }

    // Arbitrary
    {
      const randAs: PolymorphicAs = getRandAs();
      const href1 = '';
      renderInferredPoly({ as: randAs }, null); // href not required
      renderInferredPoly({ as: randAs, href: href1 }, null); // but href is allowed
      renderInferredPoly({ as: randAs, 'aria-label': 'bar' }, null); // any intrinsic attribute is allowed
      // @ts-expect-error - misc props not allowed when As is generically defined
      renderInferredPoly({ as: randAs, foo: 'bar' }, null);

      const { as, href } = useInferredPolymorphicProps(randAs, {});
      renderInferredPoly({ as: as, href: href }, null);
    }
  });

  test('InferredPolymorphicComponentType', () => {
    interface MyProps {
      value?: { id: string };
    }
    const MyInferredPoly = InferredPolymorphic<MyProps, 'button'>(p => <></>);
    MyInferredPoly.displayName = 'MyInferredPoly';
    MyInferredPoly.propTypes = {};

    // accepts empty props
    <MyInferredPoly />;
    // extends default element intrinsic attributes
    <MyInferredPoly name="some name" />;
    // @ts-expect-error - intrinsic attribute types get overridden by PropType
    <MyInferredPoly value="some-value" />;
    <MyInferredPoly value={{ id: '1234' }} />; // intrinsic attribute types get overridden

    // accepts href without `as`
    <MyInferredPoly href="" />;

    // as = anchor
    {
      // @ts-expect-error - href is required
      <MyInferredPoly as={'a'} />;
      <MyInferredPoly as={'a'} href={'mongodb.design'} />;

      // Infers the event argument of onClick callbacks
      <MyInferredPoly
        as="a"
        href={'mongodb.design'}
        onClick={event => {
          event.preventDefault();
          const _El: HTMLAnchorElement = event.currentTarget;
          // @ts-expect-error - event.currentTarget is not a button
          const _a: HTMLButtonElement = event.currentTarget;
        }}
      />;
    }

    // as = 'button'
    {
      <MyInferredPoly as="button" />;
      // @ts-expect-error href not valid on explicit button
      <MyInferredPoly as="button" href="mongodb.design" />;
      // @ts-expect-error misc. props not valid
      <MyInferredPoly as="button" foo="bar" />;

      // Infers the event argument of onClick callbacks
      <MyInferredPoly
        as="button"
        onClick={event => {
          event.preventDefault();
          const _El: HTMLButtonElement = event.currentTarget;
          // @ts-expect-error - event.currentTarget is not an anchor
          const _a: HTMLAnchorElement = event.currentTarget;
        }}
      />;
    }

    // anchor-like
    {
      <MyInferredPoly as={TestAnchorLike} href="mongodb.design" />;
      // @ts-expect-error - href is required for TestAnchorLike
      <MyInferredPoly as={TestAnchorLike} />;
    }

    // not anchor-like
    {
      <MyInferredPoly as={TestArbitraryComponent} someProp="lorem" />;
      // @ts-expect-error - someProp is required
      <MyInferredPoly as={TestArbitraryComponent} />;
      // @ts-expect-error - href is not valid
      <MyInferredPoly as={TestArbitraryComponent} someProp="lorem" href="" />;
      // @ts-expect-error - misc. props not valid
      <MyInferredPoly as={TestArbitraryComponent} someProp="lorem" foo="bar" />;
    }

    // TestNodeURLAnchorLike
    {
      <MyInferredPoly as={TestNodeURLAnchorLike} href={{ hostname: '' }} />;
    }

    // generically typed
    {
      <MyInferredPoly as={'a' as PolymorphicAs} />;
      <MyInferredPoly as={'a' as PolymorphicAs} href="" />;

      <MyInferredPoly as={'button' as PolymorphicAs} />;
      <MyInferredPoly as={'button' as PolymorphicAs} href="" />;
      <MyInferredPoly as={'button' as PolymorphicAs} aria-label="bar" />;

      // @ts-expect-error - misc. props not allowed
      <MyInferredPoly as={'button' as PolymorphicAs} foo="bar" />;

      <MyInferredPoly as={TestAnchorLike as PolymorphicAs} />;
      <MyInferredPoly as={TestAnchorLike as PolymorphicAs} href="" />;
      // @ts-expect-error - misc. props not allowed
      <MyInferredPoly as={TestAnchorLike as PolymorphicAs} foo="bar" />;

      <MyInferredPoly as={TestArbitraryComponent as PolymorphicAs} />;
      <MyInferredPoly
        as={TestArbitraryComponent as PolymorphicAs}
        // @ts-expect-error - when generically defined, non-JSX Intrinsic Attributes are not valid
        someProp="lorem"
      />;

      <MyInferredPoly
        as={TestNodeURLAnchorLike as PolymorphicAs}
        // @ts-expect-error - when generically defined, non-JSX Intrinsic Attributes are not valid
        href={{ hostname: '' }}
      />;
    }

    // arbitrary
    {
      const randAs: PolymorphicAs = getRandAs();
      const href1 = '';
      <MyInferredPoly as={randAs} />; // href not required
      <MyInferredPoly as={randAs} href={href1} />; // but href is allowed
      <MyInferredPoly as={randAs} aria-label={'bar'} />; // any intrinsic attribute is allowed
      // @ts-expect-error - misc props not allowed when as is generically defined
      <MyInferredPoly as={randAs} foo={'bar'} />;

      const { as, href } = useInferredPolymorphicProps(randAs, {});
      <MyInferredPoly as={as} href={href} />;
    }

    // With Refs & Handlers
    {
      // undefined
      const btnRef = React.createRef<HTMLButtonElement>();
      const anchorRef = React.createRef<HTMLAnchorElement>();
      const htmlElementRef = React.createRef<HTMLElement>();
      const anyRef = React.createRef<any>();
      const unknownRef = React.createRef();
      const onBtnClick: MouseEventHandler<HTMLButtonElement> = () => {};
      const onAnchorClick: MouseEventHandler<HTMLAnchorElement> = () => {};
      const onElementClick: MouseEventHandler<HTMLElement> = () => {};
      const onAnyClick: MouseEventHandler = () => {};

      {
        <MyInferredPoly ref={btnRef} />;
        <MyInferredPoly onClick={onBtnClick} />;
        <MyInferredPoly href="" onClick={onAnchorClick} />;
        // @ts-expect-error - when passing a ref, `as` must be explicit
        <MyInferredPoly href="" ref={anchorRef} />;
        // @ts-expect-error
        <MyInferredPoly ref={anchorRef} />;
        // when passing a ref, `as` must be explicit
        <MyInferredPoly href="" ref={btnRef} />;
      }

      // anchor
      {
        <MyInferredPoly as={'a'} href={'mongodb.design'} ref={anchorRef} />;
        <MyInferredPoly
          as={'a'}
          href={'mongodb.design'}
          ref={anchorRef}
          onClick={onAnchorClick}
        />;
        <MyInferredPoly
          as={'a'}
          href={'mongodb.design'}
          // @ts-expect-error - incorrect ref type
          ref={React.createRef<HTMLButtonElement>()}
        />;

        <MyInferredPoly
          as={'a'}
          href={'mongodb.design'}
          // @ts-expect-error - incorrect handler type
          onClick={onBtnClick}
        />;
      }

      // button
      {
        <MyInferredPoly as={'button'} ref={btnRef} />;
        <MyInferredPoly as={'button'} onClick={onBtnClick} />;
        <MyInferredPoly as={'button'} onClick={onBtnClick} ref={btnRef} />;
        // @ts-expect-error - incorrect ref type
        <MyInferredPoly as={'button'} ref={anchorRef} />;
        // @ts-expect-error - incorrect handler type
        <MyInferredPoly as={'button'} onClick={onAnchorClick} />;
        // @ts-expect-error - incorrect handler type
        <MyInferredPoly as={'button'} onClick={onAnchorClick} ref={btnRef} />;
      }

      {
        <MyInferredPoly
          as={TestArbitraryComponent}
          someProp={'lorem'}
          ref={unknownRef}
        />;

        <MyInferredPoly
          as={TestArbitraryComponent}
          someProp={'lorem'}
          ref={btnRef}
        />;

        <MyInferredPoly
          as={TestArbitraryComponent}
          someProp={'lorem'}
          ref={anyRef}
        />;

        <MyInferredPoly
          as={TestArbitraryComponent}
          someProp={'lorem'}
          // @ts-expect-error onClick is not a prop on TestArbitraryComponent
          onClick={onBtnClick}
        />;
      }

      {
        const arbAs: PolymorphicAs = getRandAs();
        const arbRef = btnRef as PolymorphicRef<typeof arbAs>;

        <MyInferredPoly as={arbAs} ref={anyRef} />;
        <MyInferredPoly as={arbAs} ref={arbRef} />;
        <MyInferredPoly as={arbAs} ref={arbRef} onClick={onAnyClick} />;

        // @ts-expect-error - ref type can't be unknown
        <MyInferredPoly as={arbAs} ref={unknownRef} />;
        // @ts-expect-error - ref type can't be explicit
        <MyInferredPoly as={arbAs} ref={btnRef} />;
        // @ts-expect-error - `as` can be SVG, which is not extended by HTMLElement
        <MyInferredPoly as={arbAs} ref={htmlElementRef} />;

        // @ts-expect-error - handler must match as prop
        <MyInferredPoly as={arbAs} ref={arbRef} onClick={onBtnClick} />;
        // @ts-expect-error `as` can be SVG, which is not extended by HTMLElement
        <MyInferredPoly as={arbAs} ref={arbRef} onClick={onElementClick} />;
      }
    }
  });

  test('InferredPolymorphic factory', () => {
    interface MyProps {
      value?: { id: string };
      variant?: 'default' | 'primary';
    }
    const MyInferredPoly = InferredPolymorphic<MyProps, 'button'>(
      ({ as: asProp, ...props }, fwdRef) => {
        const { as, rest } = useInferredPolymorphic(asProp, props);

        as satisfies PolymorphicAs;
        rest.value satisfies MyProps['value'];
        rest.variant satisfies MyProps['variant'];
        rest.href satisfies string | undefined;
        rest.target satisfies string | undefined;
        rest.rel satisfies string | undefined;
        fwdRef satisfies React.RefObject<PolymorphicAs> | null;
        fwdRef satisfies React.RefObject<typeof as> | null;

        return <></>;
      },
    );
  });
});
