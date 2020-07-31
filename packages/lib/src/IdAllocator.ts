export default class IdAllocator {
  private static registry: Array<IdAllocator> = [];

  private value = 0;

  constructor(private prefix: string) {
    IdAllocator.registry.push(this);
  }

  generate(): string {
    return `${this.prefix}-${this.value++}`;
  }

  /* The following are only for testing!! */

  static snapshot() {
    return this.registry.map(allocator => [allocator, allocator.value]);
  }

  static restore(snapshot?: Array<[IdAllocator, number]>) {
    if (snapshot) {
      if (snapshot.length > this.registry.length) {
        throw Error('Invalid snapshot');
      }

      snapshot.forEach(([savedAllocator], index) => {
        const allocator = this.registry[index];
        if (allocator !== savedAllocator) {
          throw Error('Invalid snapshot');
        }
      });
    }

    this.registry.forEach((allocator, index) => {
      if (snapshot && index < snapshot.length) {
        allocator.value = snapshot[index][1];
      } else {
        allocator.value = 0;
      }
    });
  }
}
