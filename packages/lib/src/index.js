import emotion from './emotion';

function createDisplayName(componentName) {
  return `LG-${componentName}`;
}

const ccClassName = (...args) => args.join(' ');

export default { ccClassName, emotion, createDisplayName };
