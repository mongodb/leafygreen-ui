import emotion from './emotion';

function createDisplayName(componentName) {
  return componentName;
}

const ccClassName = (...args) => args.join(' ');

export default { ccClassName, emotion, createDisplayName };
