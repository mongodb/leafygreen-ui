declare namespace jest {
  interface Matchers<R, T> {
    toBePx: (expected: number) => R;
  }
}
