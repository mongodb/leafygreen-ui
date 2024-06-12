/**
 * Spec file for InferredPolymorphic types
 *
 * Here we simply declare typed variables
 * and expect them to satisfy the type constraints
 *
 */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';

import { PolymorphicAs } from '../Polymorphic/Polymorphic.types';
import { getInferredPolymorphicProps } from '../utils/getInferredPolymorphicProps';
import { NodeUrlLike } from '../utils/Polymorphic.utils';

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
const TestNotAnchorLike = ((_props: { someProp: any }) => (
  <></>
)) satisfies PolymorphicAs;
const getRandAs = (): PolymorphicAs => (Math.random() > 0.5 ? 'div' : 'a');

// AnchorLike
{
  const _A: AnchorLike = 'a';
  // @ts-expect-error - not assignable to AnchorLike
  const _B: AnchorLike = 'button';
  const _C: AnchorLike = TestAnchorLike;
  const _D: AnchorLike = (_props: { href: NodeUrlLike }) => <></>;
  // @ts-expect-error - not assignable to AnchorLike
  const _E: AnchorLike = TestNotAnchorLike;
}

// AnchorLikeProps

{
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
}

// InferredPolymorphicProps
{
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

  // anchor-like
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

  // not anchor-like
  {
    const _D: InferredPolymorphicProps<typeof TestNotAnchorLike> = {
      as: TestNotAnchorLike,
      someProp: 'foobar',
    };

    const _D2: InferredPolymorphicProps<typeof TestNotAnchorLike> = {
      as: TestNotAnchorLike,
      // @ts-expect-error - href does not exist on TestNotAnchorLike
      href: 'mongodb.design',
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
      as: TestNotAnchorLike,
      someProp: 'foobar',
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
      as: TestNotAnchorLike as PolymorphicAs,
      someProp: 'foobar',
    };
  }

  const randAs = getRandAs();
  const _R: InferredPolymorphicProps<typeof randAs> = {
    as: randAs,
    href: 'mongodb.design',
  };
}

// InferredPolymorphicRenderFunction
{
  const renderInferredPoly: InferredPolymorphicRenderFunction = (p, r) => <></>;

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

  // anchor-like
  {
    renderInferredPoly({ as: TestAnchorLike, href: 'mongodb.design' }, null);
    // @ts-expect-error - href is required on TestAnchorLike
    renderInferredPoly({ as: TestAnchorLike }, null);
  }

  // not anchor-like
  {
    renderInferredPoly({ as: TestNotAnchorLike, someProp: 'lorem' }, null);
    // @ts-expect-error - someProp is required
    renderInferredPoly({ as: TestNotAnchorLike }, null);
    renderInferredPoly(
      // @ts-expect-error - href is not valid
      { as: TestNotAnchorLike, someProp: 'lorem', href: '' },
      null,
    );
    // @ts-expect-error - misc. props not valid
    renderInferredPoly({ as: TestNotAnchorLike, foo: 'bar' }, null);
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
    renderInferredPoly({ as: TestAnchorLike as PolymorphicAs, href: '' }, null);
    renderInferredPoly(
      // @ts-expect-error - misc. props not allowed
      { as: TestAnchorLike as PolymorphicAs, foo: 'bar' },
      null,
    );

    renderInferredPoly({ as: TestNotAnchorLike as PolymorphicAs }, null);
    renderInferredPoly(
      // @ts-expect-error - when generically defined, non-JSXIntrinsicAttributes are not valid
      { as: TestNotAnchorLike as PolymorphicAs, someProp: 'lorem' },
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

    const { as, href } = getInferredPolymorphicProps();
    renderInferredPoly({ as: as, href: href }, null);
  }
}

// InferredPolymorphic
{
  interface MyProps {
    value?: { id: string };
  }

  const MyInferredPoly = InferredPolymorphic<MyProps, 'button'>(props => {
    return <></>;
  });

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
  }

  // as = 'button'
  {
    <MyInferredPoly as="button" />;
    // @ts-expect-error href not valid on explicit button
    <MyInferredPoly as="button" href="mongodb.design" />;
    // @ts-expect-error misc. props not valid
    <MyInferredPoly as="button" foo="bar" />;
  }

  // anchor-like
  {
    <MyInferredPoly as={TestAnchorLike} href="mongodb.design" />;
    // @ts-expect-error - href is required for TestAnchorLike
    <MyInferredPoly as={TestAnchorLike} />;
  }

  // not anchor-like
  {
    <MyInferredPoly as={TestNotAnchorLike} someProp="lorem" />;
    // @ts-expect-error - someProp is required
    <MyInferredPoly as={TestNotAnchorLike} />;
    // @ts-expect-error - href is not valid
    <MyInferredPoly as={TestNotAnchorLike} someProp="lorem" href="" />;
    // @ts-expect-error - misc. props not valid
    <MyInferredPoly as={TestNotAnchorLike} someProp="lorem" foo="bar" />;
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

    <MyInferredPoly as={TestNotAnchorLike as PolymorphicAs} />;
    // @ts-expect-error - when generically defined, non-JSXIntrinsicAttributes are not valid
    <MyInferredPoly as={TestNotAnchorLike as PolymorphicAs} someProp="lorem" />;
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

    const { as, href } = getInferredPolymorphicProps();
    <MyInferredPoly as={as} href={href} />;
  }
}

// // @ts-expect-error
// const bool = false;
