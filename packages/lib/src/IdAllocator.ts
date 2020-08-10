export default class IdAllocator {
  private static registry: Map<string, IdAllocator> = new Map();

  private value = 0;
  private prefix: string;

  private constructor(prefix: string) {
    this.prefix = prefix;
  }

  static create(prefix: string): IdAllocator {
    const instance = this.registry.get(prefix) ?? new IdAllocator(prefix);
    IdAllocator.registry.set(prefix, instance);
    return instance;
  }

  generate(): string {
    return `${this.prefix}-${this.value++}`;
  }

  /* The following are only for testing!! */

  /**
   * Stores the current state of all instances into an object
   * that can be used with the `restore` method to return all
   * of the instances back to the previous point in time.
   * @returns snapshot
   */
  static snapshot(): Record<string, number> {
    const snapshot: Record<string, number> = {};
    this.registry.forEach(allocator => {
      snapshot[allocator.prefix] = allocator.value;
    });
    return snapshot;
  }

  /**
   * @param snapshot If provided, all instances will be reset
   * to the state they were in when the snapshot was created.
   * Otherwise, all instances will be reset to being as if
   * they were just created.
   */
  static restore(snapshot?: Record<string, number>) {
    this.registry.forEach(allocator => {
      if (!snapshot || !(allocator.prefix in snapshot)) {
        allocator.value = 0;
      }
    });

    if (snapshot) {
      Object.entries(snapshot).forEach(([prefix, value]) => {
        const instance = this.registry.get(prefix) ?? this.create(prefix);
        instance.value = value;
      });
    }
  }
}
