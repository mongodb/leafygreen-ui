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

  static snapshot(): Record<string, number> {
    const snapshot: Record<string, number> = {};
    this.registry.forEach(allocator => {
      snapshot[allocator.prefix] = allocator.value;
    });
    return snapshot;
  }

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
