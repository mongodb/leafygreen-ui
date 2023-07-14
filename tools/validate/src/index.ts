import { validateBuilds } from './builds';
import { validateDependencies } from './deps';
import { ValidateCommandOptions } from './validate.types';

export const validate = async (options: ValidateCommandOptions) => {
  const validators: Array<Promise<void>> = [];

  if (!options.buildsOnly) validators.push(validateDependencies(options));
  if (!options.depsOnly) validators.push(validateBuilds());

  Promise.all(validators)
    .then(() => {
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
};
