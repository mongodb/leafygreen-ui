/**
 * Spec file for Polymorphic types.
 *
 * Here we simply declare typed variables,
 * and expect them to satisfy the type constraints
 *
 */
/* eslint-disable @typescript-eslint/no-unused-vars, jest/no-disabled-tests */
import React, { ReactElement } from 'react';

import {
  InheritedProps,
  PolymorphicAs,
  PolymorphicProps,
} from './Polymorphic.types';

const TestAnchorLike = (_props: { href: string }) => <></>;
const TestNotAnchorLike = (_props: { children?: any }) => <></>;
const getRandAs = (): PolymorphicAs => (Math.random() > 0.5 ? 'div' : 'a');

test.skip('Polymorphic types', () => {
  // PolymorphicAs
  {
    const _A: PolymorphicAs = 'a';
    const _A2 = 'a' satisfies PolymorphicAs;

    const _B: PolymorphicAs = 'button';
    const _B2 = 'button' satisfies PolymorphicAs;

    const _C: PolymorphicAs = TestAnchorLike;
    const _C2 = TestAnchorLike satisfies PolymorphicAs;

    const _D: PolymorphicAs = TestNotAnchorLike;
    const _D2 = TestNotAnchorLike satisfies PolymorphicAs;

    const _E: React.ElementType<any> = (() => <></>) satisfies PolymorphicAs;

    const _F: React.FunctionComponent<any> = (() => (
      <></>
    )) satisfies PolymorphicAs;
  }

  // InheritedProps
  {
    // anchor
    {
      const _A: InheritedProps<'a'> = {
        href: '',
      };

      const _A2: InheritedProps<'a'> = {
        // @ts-expect-error - 'as' is not inherited from anchor
        as: 'a',
        href: '',
      };
    }

    // button
    {
      const _B: InheritedProps<'button'> = {
        type: 'submit',
      };
    }

    // anchor-like
    {
      const _C: InheritedProps<typeof TestAnchorLike> = {
        href: '',
      };
    }

    // not anchor-like
    {
      const _D: InheritedProps<typeof TestNotAnchorLike> = {
        children: 'foobar',
      };
    }

    {
      const _G1: InheritedProps<PolymorphicAs> = {
        id: '',
      };
      const _G2: InheritedProps<PolymorphicAs> = {
        // @ts-expect-error - href not inherited by a generic PolymorphicAs
        href: '',
      };
    }

    const randAs: PolymorphicAs = getRandAs();
    const _R: InheritedProps<typeof randAs> = {
      id: '',
    };
    const _R2: InheritedProps<typeof randAs> = {
      // @ts-expect-error - href not inherited by a random PolymorphicAs
      href: '',
    };
  }

  // PolymorphicProps
  {
    // anchor
    {
      const _A: PolymorphicProps<'a'> = {
        href: 'mongodb.design',
      };

      const _A2: PolymorphicProps<'a'> = {
        as: 'a',
        href: 'mongodb.design',
      };

      // @ts-expect-error - 'a' requires href
      const _A3: PolymorphicProps<'a'> = {};
      // @ts-expect-error - explicit `as` can't be reassigned
      const _A4: PolymorphicProps<'a'> = { as: 'button' };
    }

    // button
    {
      const _B: PolymorphicProps<'button'> = {
        as: 'button',
      };

      const _B2: PolymorphicProps<'button'> = {
        // @ts-expect-error href not valid on  button
        href: 'mongodb.design',
      };
      const _B3: PolymorphicProps<'button'> = {
        // @ts-expect-error `as` can't be reassigned
        as: 'a',
        href: 'mongodb.design',
      };

      const _B4: PolymorphicProps<'button'> = {
        as: 'button',
        // @ts-expect-error href not valid on explicit button
        href: 'mongodb.design',
      };
    }

    // anchor-like
    {
      const _C: PolymorphicProps<typeof TestAnchorLike> = {
        as: TestAnchorLike,
        href: 'mongodb.design',
      };
      // @ts-expect-error - href required on anchor-like
      const _C2: PolymorphicProps<typeof TestAnchorLike> = {
        as: TestAnchorLike,
      };
      const _C3: PolymorphicProps<typeof TestAnchorLike> = {
        // @ts-expect-error - can't reassign `as`
        as: TestNotAnchorLike,
      };
    }

    // not anchor-like
    {
      const _D: PolymorphicProps<typeof TestNotAnchorLike> = {
        as: TestNotAnchorLike,
      };

      const _D2: PolymorphicProps<typeof TestNotAnchorLike> = {
        as: TestNotAnchorLike,
        // @ts-expect-error - href not valid on not-anchor-like
        href: 'mongodb.design',
      };

      const _D3: PolymorphicProps<typeof TestNotAnchorLike> = {
        // @ts-expect-error - can't reassign `as`
        as: TestAnchorLike,
      };
    }

    // typed generic PolymorphicAs
    {
      const _G1a: PolymorphicProps<PolymorphicAs> = {
        as: 'a',
        // @ts-expect-error - href not inherited by a generic PolymorphicAs
        href: '',
      };
      const _G2a: PolymorphicProps<PolymorphicAs> = {
        as: 'button',
      };
      const _G3a: PolymorphicProps<PolymorphicAs> = {
        as: TestAnchorLike,
        // @ts-expect-error - href not inherited by a generic PolymorphicAs
        href: '',
      };
      const _G4a: PolymorphicProps<PolymorphicAs> = {
        as: TestNotAnchorLike,
      };

      const _G1b: PolymorphicProps<PolymorphicAs> = {
        as: 'a' as PolymorphicAs,
        // @ts-expect-error - href not inherited by a generic PolymorphicAs
        href: '',
      };
      const _G2b: PolymorphicProps<PolymorphicAs> = {
        as: 'button' as PolymorphicAs,
      };
      const _G3b: PolymorphicProps<PolymorphicAs> = {
        as: TestAnchorLike as PolymorphicAs,
        // @ts-expect-error - href not inherited by a generic PolymorphicAs
        href: '',
      };
      const _G4b: PolymorphicProps<PolymorphicAs> = {
        as: TestNotAnchorLike as PolymorphicAs,
      };
    }

    const randAs = getRandAs();
    const _R: PolymorphicProps<typeof randAs> = {
      as: randAs,
      // @ts-expect-error - href not inherited by a generic PolymorphicAs
      href: 'mongodb.design',
    };
  }
});
