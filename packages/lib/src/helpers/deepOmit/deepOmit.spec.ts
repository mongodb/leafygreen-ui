import { deepOmit } from './deepOmit';

describe('deepOmit', () => {
  describe('basic functionality', () => {
    it('omits top-level properties', () => {
      const obj = {
        a: 1,
        b: 2,
        c: 3,
      };
      const result = deepOmit(obj, ['b']);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('omits multiple top-level properties', () => {
      const obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      };
      const result = deepOmit(obj, ['b', 'd']);
      expect(result).toEqual({ a: 1, c: 3 });
    });
  });

  describe('nested object handling', () => {
    it('omits nested properties using dot notation', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: 3,
        },
      };
      const result = deepOmit(obj, ['b.d']);
      expect(result).toEqual({
        a: 1,
        b: {
          c: 2,
        },
      });
    });

    it('handles deeply nested properties', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: 3,
          e: {
            f: 4,
            g: 5,
            h: {
              i: 6,
              j: {
                k: {
                  l: 'very deep',
                  m: 'also very deep',
                },
              },
            },
          },
        },
      };
      const result = deepOmit(obj, ['b.e.f', 'b.e.h.j.k.l']);
      expect(result).toEqual({
        a: 1,
        b: {
          c: 2,
          d: 3,
          e: {
            g: 5,
            h: {
              i: 6,
              j: {
                k: {
                  m: 'also very deep',
                },
              },
            },
          },
        },
      });
    });

    it('matches the JSDoc example', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: 3,
          e: {
            f: 4,
          },
        },
      };
      const result = deepOmit(obj, ['b.d', 'b.e.f']);
      expect(result).toEqual({
        a: 1,
        b: {
          c: 2,
          e: {},
        },
      });
    });
  });

  describe('edge cases', () => {
    it('handles empty object', () => {
      const obj = {};
      const result = deepOmit(obj, ['a']);
      expect(result).toEqual({});
    });

    it('handles empty paths array', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
        },
      };
      const result = deepOmit(obj, []);
      expect(result).toEqual(obj);
    });

    it('handles non-existent paths', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
        },
      };
      const result = deepOmit(obj, ['x.y.z', 'b.nonexistent']);
      expect(result).toEqual(obj);
    });

    it('handles null and undefined values', () => {
      const obj = {
        a: 1,
        nullVal: null,
        undefinedVal: undefined,
        c: {
          d: 2,
        },
      };
      const result = deepOmit(obj, ['c.d']);
      expect(result).toEqual({
        a: 1,
        nullVal: null,
        undefinedVal: undefined,
        c: {},
      });
    });

    it('handles objects with numeric string keys', () => {
      const obj = {
        '0': 'zero',
        '1': {
          '2': 'two',
          '3': 'three',
        },
        a: 'letter',
      };
      const result = deepOmit(obj, ['1.3']);
      expect(result).toEqual({
        '0': 'zero',
        '1': {
          '2': 'two',
        },
        a: 'letter',
      });
    });
  });

  describe('array handling', () => {
    it('arrays are not transformed to objects', () => {
      const obj = {
        a: 1,
        b: [1, 2, 3],
        c: {
          d: [4, 5, 6],
          e: 7,
        },
      };
      const result = deepOmit(obj, ['c.e']);
      expect(result).toEqual({
        a: 1,
        b: [1, 2, 3],
        c: {
          d: [4, 5, 6],
        },
      });
    });

    it('arrays containing objects are not transformed to objects', () => {
      const obj = {
        a: 1,
        b: {
          c: [
            { x: 1, y: 2 },
            { x: 3, y: 4 },
          ],
          d: 5,
        },
      };
      const result = deepOmit(obj, ['b.d']);
      expect(result).toEqual({
        a: 1,
        b: {
          c: [
            { x: 1, y: 2 },
            { x: 3, y: 4 },
          ],
        },
      });
    });
  });

  describe('complex data types', () => {
    it('complex objects (functions, Date, RegExp) are left intact', () => {
      const fn = () => 'test';
      const date = new Date('2023-01-01');
      const regex = /test/g;
      const obj = {
        a: 1,
        fn,
        date,
        regex,
        c: {
          d: 2,
        },
      };
      const result = deepOmit(obj, ['c.d']);
      expect(result).toEqual({
        a: 1,
        fn,
        date,
        regex,
        c: {},
      });
    });
  });

  describe('immutability', () => {
    it('does not modify the original object', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: 3,
        },
      };
      const originalObj = JSON.parse(JSON.stringify(obj));
      deepOmit(obj, ['b.d']);
      expect(obj).toEqual(originalObj);
    });

    it('creates a new object reference', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
        },
      };
      const result = deepOmit(obj, []);
      expect(result).not.toBe(obj);
      expect(result.b).not.toBe(obj.b);
    });
  });

  describe('mixed path types', () => {
    it('handles combination of top-level and nested paths', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3,
            f: 4,
          },
        },
        g: 5,
      };
      const result = deepOmit(obj, ['a', 'b.d.e', 'g']);
      expect(result).toEqual({
        b: {
          c: 2,
          d: {
            f: 4,
          },
        },
      });
    });

    it('handles overlapping paths', () => {
      const obj = {
        a: {
          b: {
            c: 1,
            d: 2,
          },
          e: 3,
        },
      };
      const result = deepOmit(obj, ['a.b', 'a.b.c']);
      expect(result).toEqual({
        a: {
          e: 3,
        },
      });
    });
  });

  it('does not filter literal key names', () => {
    const obj = {
      user: {
        a: 1,
        'b.c': 'should-stay',
      },
      b: {
        c: 2,
        d: ['3', '4'],
      },
    };
    const result = deepOmit(obj, ['b.c']);

    expect(result).toEqual({
      user: {
        a: 1,
        'b.c': 'should-stay',
      },
      b: {
        d: ['3', '4'],
      },
    });
  });
});
