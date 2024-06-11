import React, { ComponentPropsWithoutRef } from 'react';

import { PolymorphicAs } from '../Polymorphic/Polymorphic.types';
import { AnchorLike } from '..';

import {
  AnchorLikeProps,
  HrefLike,
  InheritedExplicitAnchorLikeProps,
} from './InferredPolymorphic.types';

export type InferredPolyProps<P extends { as?: PolymorphicAs }> = P extends {
  as: infer T extends PolymorphicAs;
}
  ? T extends AnchorLike // If `as` is defined...
    ? InheritedExplicitAnchorLikeProps<T, P> // and `as` is AnchorLike, return explicit AnchorLike props
    : ComponentPropsWithoutRef<T> & P // else, `as` is anything other than AnchorLike, return that `as` prop's props
  : P extends {
      href: infer H;
    }
  ? H extends HrefLike // if `href` is defined
    ? AnchorLikeProps<'a', P> // and when `href` is valid, return AnchorLike props
    : never // `href` must be HrefLike
  : P; // Neither `as` nor `href` are defined; return the props we're given

export type InferredRenderFunction = <P extends { as?: PolymorphicAs }>(
  props: InferredPolyProps<P>,
) => any;

const render: InferredRenderFunction = props => props;

const TestAnchorLike = ((_props: { href: string }) => (
  <></>
)) satisfies PolymorphicAs;
const TestNotAnchorLike = ((_props: { someProp: any }) => (
  <></>
)) satisfies PolymorphicAs;

render({});
render({ as: 'a', href: '' });
render({ as: 'button' });
render({ as: TestAnchorLike, href: '' });
render({ as: TestNotAnchorLike, someProp: '' });
