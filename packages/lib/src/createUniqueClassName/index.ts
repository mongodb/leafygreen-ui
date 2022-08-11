/**
 * `generateUniqueClassName` creates a string intended to be used as a pseudo-unique className.
 *
 * It returns a consecutive 4-number string prefixed by `lg-ui`, followed by a custom second prefix defined by the `prefix` param.
 *
 * @param prefix: a custom prefix that follows the `lg-ui` prefix.
 */
const generateUniqueClassName = (prefix: string) => {
  const count = classNameRegistry.get(prefix)?.length ?? 0
  console.log({count});
  return `lg-ui${prefix ? `-${prefix}` : ''}-${count.toString().padStart(4, '0')}`;
};

const classNameRegistry: Map<string, Array<string>> = new Map();

const createUniqueClassName = (prefix: string = ''): string => {
  const uniqueClassName = generateUniqueClassName(prefix);
  console.log({prefix, uniqueClassName});
  
  if (classNameRegistry.has(prefix)) {
    const prefixClasses = classNameRegistry.get(prefix)
    classNameRegistry.set(prefix, [uniqueClassName, ...prefixClasses as Array<string>])
  } else {
    classNameRegistry.set(prefix, [uniqueClassName]);
  }
  return uniqueClassName
};

export default createUniqueClassName;
