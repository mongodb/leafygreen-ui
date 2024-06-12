/** Redefine a Readonly type as mutable */
export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
