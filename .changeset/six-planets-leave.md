---
'@leafygreen-ui/lib': minor
---

Adds multiple `Deep` TS utility types, and `Concat` type.

### Concat

Concatenates two string literals with a separator.

```ts
type A = 'apple';
type B = 'banana';

Concat<A, B, '.'>; // 'apple.banana' string literal
```

### `DeepKeys`

Given some deep interface, `DeepKeys` returns all possible deep keys
as a union of dot-separated string literals.

```ts
interface MyInterface {
  a: {
    b: {
      c: any;
      d: any;
    };
    e: any;
  };
  f: any;
}

DeepKeys<MyInterface>; // 'a' | 'a.b' | 'a.b.c' | 'a.b.d' | 'a.e' | 'f'
```

### `DeepPartial`

Given some deep interface, `DeepPartial` returns a recursive partial of the given interface.

```ts
interface MyInterface {
  a: {
    b: {
      c: any;
      d: any;
    };
    e: any;
  };
  f: any;
}

const x = {
  a: {
    b: {
      d: 'foo',
    },
  },
} satisfies DeepPartial<MyInterface>;
```

### `DeepPathValues`

Given some deep interface, `DeepPathValues` maps the deep keys of an object to their path values.

```ts
interface MyInterface {
  a: {
    b: {
      c: any;
      d: any;
    };
    e: any;
  };
  f: any;
}

const x = {
  a: {
    b: {
      c: 'a.b.c',
      d: 'a.b.d',
    },
    e: 'a.e',
  },
  f: 'f',
} satisfies DeepPathValues<MyInterface>;
```

### `DeepPick`

Given some deep interface, `DeepPick` deeply picks the specified dot-separated keys from the object

```ts
interface MyInterface {
  a: {
    b: {
      c: any;
      d: any;
    };
    e: any;
  };
  f: any;
}

DeepPick<MyInterface, 'a.b'>; // { a: { b: any } }
```

### `DeepUnion`

Given some deep constant, `DeepUnion` returns a recursive union the values for a given type.

```ts
const MyObj = {
  a: {
    b: {
      c: 'carrot'
    },
   d: 'dragon'
  }
 e: 'eggplant'
} as const

DeepUnion<typeof MyObj> // 'carrot' | 'dragon' | 'eggplant'
```
