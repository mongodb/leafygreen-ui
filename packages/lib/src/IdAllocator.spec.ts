import IdAllocator from './IdAllocator';

describe('packages/lib', () => {
  describe('IdAllocator', () => {
    beforeEach(() => {
      IdAllocator.restore();
    });

    test('generates IDs', () => {
      const allocator = IdAllocator.create('test');
      expect(allocator.generate()).toEqual('test-0');
      expect(allocator.generate()).toEqual('test-1');
      expect(allocator.generate()).toEqual('test-2');
    });

    test('generates different IDs per instance', () => {
      const allocator = IdAllocator.create('test');
      const otherAllocator = IdAllocator.create('other');

      expect(allocator.generate()).toEqual('test-0');
      expect(otherAllocator.generate()).toEqual('other-0');

      expect(allocator.generate()).toEqual('test-1');
      expect(otherAllocator.generate()).toEqual('other-1');

      expect(allocator.generate()).toEqual('test-2');
      expect(otherAllocator.generate()).toEqual('other-2');
    });

    test('is unique for each prefix', () => {
      const allocator = IdAllocator.create('test');
      expect(allocator).toBe(IdAllocator.create('test'));
    });

    test('can restore snapshots', () => {
      const allocator = IdAllocator.create('test');
      const otherAllocator = IdAllocator.create('other');
      const anotherAllocator = IdAllocator.create('another');

      for (let i = 0; i < 3; i++) {
        allocator.generate();
        otherAllocator.generate();
        anotherAllocator.generate();
      }

      const snapshot = {
        test: 0,
        other: 1,
      };

      IdAllocator.restore(snapshot);

      expect(allocator.generate()).toEqual('test-0');
      expect(otherAllocator.generate()).toEqual('other-1');
      expect(anotherAllocator.generate()).toEqual('another-0');
    });
  });
});
