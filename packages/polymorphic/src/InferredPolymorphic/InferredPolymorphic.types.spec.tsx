/**
 * Spec file for InferredPolymorphic types
 *
 * Here we simply declare typed variables
 * and expect them to satisfy the type constraints
 *
 */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { ComponentPropsWithRef, ReactElement } from 'react';

// import { InferredPolymorphic } from '../InferredPolymorphic';
import {
  AsProp,
  InheritedProps,
  PolymorphicAs,
  PolymorphicRef,
} from '../Polymorphic/Polymorphic.types';
import { getPolymorphicProps } from '../utils/getPolymorphicProps';
import { NodeUrlLike } from '../utils/Polymorphic.utils';

import {
  AnchorLike,
  AnchorLikeProps,
  InferredPolymorphicProps,
  InferredPolymorphicPropsWithRef,
  InferredPolymorphicRenderFunction,
  InferredProps,
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
    const _U: AnchorLikeProps<undefined> = { as: 'a', href: '' }; // undefined type arg sets `as` = 'a'
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

// InferredProps
{
  // anchor
  {
    const _A: InferredProps<'a'> = {
      href: 'mongodb.design',
    };
    const _A2: InferredProps<'a'> = {
      as: 'a',
      href: 'mongodb.design',
    };
    // @ts-expect-error - requires href
    const _A3: InferredProps<'a'> = {};
    // @ts-expect-error - explicit `as` can't be reassigned
    const _A4: InferredProps<'a'> = { as: 'button' };
  }

  // 'button'
  {
    const _B: InferredProps<'button'> = {
      as: 'button',
    };

    // as='a' inferred from href regardless of type T
    const _B2: InferredProps<'button'> = { href: '' };
    const _B3: InferredProps<'button'> = { as: 'a', href: '' };
    // @ts-expect-error href not valid on explicit button
    const _B4: InferredProps<'button'> = { as: 'button', href: '' };
  }

  anchor - like;
  {
    const _C: InferredProps<typeof TestAnchorLike> = {
      /**
       * The InferredProps internal type infers as="a" with the presence of an href.
       * `InferredPolymorphicProps` is the true prop type
       */
      // @ts-expect-error
      as: TestAnchorLike,
      href: 'mongodb.design',
    };
  }

  // not anchor-like
  {
    const _D: InferredProps<typeof TestNotAnchorLike> = {
      as: TestNotAnchorLike,
    };

    const _D2: InferredProps<typeof TestNotAnchorLike> = {
      // @ts-expect-error
      as: TestAnchorLike,
      href: 'mongodb.design',
    };
  }

  // generic PolymorphicAs
  {
    const _G1a: InferredProps<PolymorphicAs> = {
      as: 'a',
      href: 'mongodb.design',
    };
    const _G2a: InferredProps<PolymorphicAs> = {
      as: 'button',
    };
    const _G3a: InferredProps<PolymorphicAs> = {
      as: TestAnchorLike,
      href: 'mongodb.design', // href should be inherited
    };
    const _G4a: InferredProps<PolymorphicAs> = {
      as: TestNotAnchorLike,
      someProp: 'foobar', // someProp should be inherited,
      someOtherProp: false,
    };

    const _G1b: InferredProps<PolymorphicAs> = {
      as: 'a' as PolymorphicAs,
      href: 'mongodb.design', // href should be inherited
    };
    const _G2b: InferredProps<PolymorphicAs> = {
      as: 'button' as PolymorphicAs,
    };
    const _G3b: InferredProps<PolymorphicAs> = {
      as: TestAnchorLike as PolymorphicAs,
      href: 'mongodb.design', // href should be inherited
    };
    const _G4b: InferredProps<PolymorphicAs> = {
      as: TestNotAnchorLike as PolymorphicAs,
      someProp: 'foobar', // someProp should be inherited
    };
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
      // @ts-expect-error href not valid on explicit button
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

    // @ts-expect-error - href is not valid on TestNotAnchorLike
    const _D2: InferredPolymorphicProps<typeof TestNotAnchorLike> = {
      as: TestNotAnchorLike,
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

/* {
  const makeInferredProps = <T extends PolymorphicAs>(
    arg: { as?: T } & ComponentPropsWithRef<T>,
  ) => arg;

  type ExtractAsProp<P> = P extends { as: infer T } ? T : never;

  type InferredProps<P extends { as: PolymorphicAs }> = ReturnType<
    typeof makeInferredProps<ExtractAsProp<P>>
  >;

  const _A: InferredProps<{ as: 'a'; href: 'mongo' }> = {
    as: 'a',
    href: 'mongo',
  };

  type RenderFunction = <P extends { as: PolymorphicAs } & Record<string, any>>(
    props: InferredProps<P>,
  ) => ReactElement;

  const Render: RenderFunction = _props => <></>;

  const _B: Parameters<RenderFunction>[0] = {
    as: 'a',
    href: 'mongo',
  };

  Render({});
  Render({ as: 'button', type: 'submit' });
  Render({ as: 'a', href: '' });

  <>
    <Render />
    <Render as="a" />
  </>;
} */
// InferredPolymorphicRenderFunction

{
  // type InferredRenderFunction = <T extends PolymorphicAs>(
  //   props: InferredPolymorphicPropsWithRef<T, {}>,
  //   ref: PolymorphicRef<T>,
  // ) => ReactElement | null;

  const renderPoly: InferredPolymorphicRenderFunction = (_props, _ref) => <></>;

  renderPoly({}, null);
  renderPoly({ as: 'button' }, null);
  // @ts-expect-error - href is required
  renderPoly({ as: 'a' }, null);
  renderPoly({ as: 'a', href: 'mongodb.design' }, null);
  renderPoly({ as: 'a', href: 'mongodb.design', id: 'abc' }, null);

  // @ts-expect-error - when as is indeterminate, href is required
  renderPoly({ as: 'button' as PolymorphicAs }, null);
  renderPoly({ as: 'button' as PolymorphicAs, href: '' }, null); // <- as: Type 'string' is not assignable to type 'FunctionComponent<any>'

  renderPoly({ as: TestAnchorLike, href: 'mongodb.design' }, null);
  renderPoly({ as: TestNotAnchorLike, someProp: 'lorem' }, null);
  renderPoly(
    // @ts-expect-error - when as is indeterminate, href is required
    { as: TestNotAnchorLike as PolymorphicAs, someProp: 'lorem' },
    null,
  );
  renderPoly(
    {
      as: TestNotAnchorLike as PolymorphicAs, // <- Type 'PolymorphicAs' is not assignable to type 'FunctionComponent<any> | undefined'.
      someProp: 'lorem',
      href: 'mongodb.design',
    },
    null,
  );

  const randAs: PolymorphicAs = getRandAs();
  const href1 = '';
  renderPoly({ as: randAs, href: href1 }, null); // <- Type 'string' is not assignable to type 'undefined'.

  const { as, href } = getPolymorphicProps();
  renderPoly({ as: as, href: href }, null); // <- Type 'PolymorphicAs' is not assignable to type 'FunctionComponent<any> | undefined'.
}

// InferredPolymorphic
{
  const MyInferredPoly = InferredPolymorphic<{}, 'button'>(_props => {
    return <></>;
  });

  <MyInferredPoly />;
  <MyInferredPoly as="button" />;
  // @ts-expect-error - href is required
  <MyInferredPoly as={'a'} />;
  <MyInferredPoly as={'a'} href={'mongodb.design'} />;
  // @ts-expect-error - when as is indeterminate, href is required
  <MyInferredPoly as={'button' as PolymorphicAs} />;
  <MyInferredPoly as={'button' as PolymorphicAs} href="" />;

  <MyInferredPoly as={TestAnchorLike} href="mongodb.design" />;
  <MyInferredPoly as={TestAnchorLike as PolymorphicAs} href="mongodb.design" />;
  // @ts-expect-error
  <MyInferredPoly as={TestAnchorLike} />;
  <MyInferredPoly as={TestNotAnchorLike}>lorem</MyInferredPoly>;
  // @ts-expect-error - when as is indeterminate, href is required
  <MyInferredPoly as={TestNotAnchorLike as PolymorphicAs} href="">
    foo
  </MyInferredPoly>;
  <MyInferredPoly as={TestNotAnchorLike as PolymorphicAs}>foo</MyInferredPoly>;

  const randAs: PolymorphicAs = getRandAs();
  const href1 = '';
  <MyInferredPoly as={randAs} href={href1} />;

  const { as, href } = getPolymorphicProps();
  <MyInferredPoly as={as} href={href} />;
}
