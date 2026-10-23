import React from 'react';

import {
  InferredPolymorphic,
  Polymorph,
  Polymorphic,
} from '../../packages/polymorphic/dist/types';
import type {
  InferredPolymorphicComponentType,
  InferredPolymorphicRenderFunction,
} from '../../packages/polymorphic/dist/types/InferredPolymorphic/InferredPolymorphic.types';
import type {
  IntrinsicElements,
  PolymorphicComponentType,
  PolymorphicRenderFunction,
} from '../../packages/polymorphic/dist/types/Polymorphic/Polymorphic.types';
import type { LoosePolymorphicProps } from '../../packages/polymorphic/dist/types/utils/Polymorphic.utils';

const render: PolymorphicRenderFunction<{}, 'button'> = (_props, _ref) => null;
render satisfies PolymorphicComponentType<{}, 'button'>;
render({}, null);
// @ts-expect-error - internal render functions require the ref argument
render({});

const inferredRender: InferredPolymorphicRenderFunction<{}, 'button'> = (
  _props,
  _ref,
) => null;
inferredRender satisfies InferredPolymorphicComponentType<{}, 'button'>;
inferredRender({}, null);
// @ts-expect-error - internal render functions require the ref argument
inferredRender({});

const Component = Polymorphic<{}, 'button'>(render);
const InferredComponent = InferredPolymorphic<{}, 'button'>(inferredRender);

<Component />;
<Component ref={React.createRef<HTMLButtonElement>()} />;
<Component
  as="a"
  href="https://mongodb.design"
  ref={React.createRef<HTMLAnchorElement>()}
/>;
<InferredComponent />;
<InferredComponent ref={React.createRef<HTMLButtonElement>()} />;
<InferredComponent href="https://mongodb.design" />;
<InferredComponent
  as="a"
  href="https://mongodb.design"
  ref={React.createRef<HTMLAnchorElement>()}
/>;
<Polymorph
  as="a"
  href="https://mongodb.design"
  ref={React.createRef<HTMLAnchorElement>()}
/>;

// @ts-expect-error - explicit anchors require href
<Component as="a" />;
// @ts-expect-error - explicit buttons do not accept href
<Component<'button'> as="button" href="https://mongodb.design" />;
// @ts-expect-error - refs must match the selected element
<Component<'button'> ref={React.createRef<HTMLAnchorElement>()} />;
// @ts-expect-error - explicit inferred anchors require href
<InferredComponent as="a" />;
<InferredComponent<'a'>
  as="a"
  href="https://mongodb.design"
  // @ts-expect-error - refs must match the selected element
  ref={React.createRef<HTMLButtonElement>()}
/>;

'a' satisfies IntrinsicElements<{ href: string }>;
// @ts-expect-error - buttons do not accept href
'button' satisfies IntrinsicElements<{ href: string }>;
({
  href: 'https://mongodb.design',
  children: 'link',
}) satisfies LoosePolymorphicProps;
