import React from 'react';

import type { HTMLElementProps } from '../../packages/lib/dist/types';

const Input = (props: HTMLElementProps<'input', HTMLInputElement>) => (
  <input {...props} />
);
const Button = (props: HTMLElementProps<'button', HTMLButtonElement>) => (
  <button {...props} />
);

<Input
  ref={React.createRef<HTMLInputElement>()}
  onChange={event => {
    const input: HTMLInputElement = event.currentTarget;
    input.value = 'changed';
  }}
/>;
<Button
  ref={React.createRef<HTMLButtonElement>()}
  onClick={event => {
    const button: HTMLButtonElement = event.currentTarget;
    button.disabled = true;
  }}
/>;

// @ts-expect-error - intrinsic input props must not become any
<Input href="https://mongodb.design" />;
// @ts-expect-error - refs must match the intrinsic element
<Input ref={React.createRef<HTMLButtonElement>()} />;
// @ts-expect-error - this helper accepts intrinsic elements, not components
type _ComponentProps = HTMLElementProps<typeof Input>;

({
  href: 'https://mongodb.design',
  ref: React.createRef<HTMLAnchorElement>(),
}) satisfies HTMLElementProps<'a', HTMLAnchorElement>;
