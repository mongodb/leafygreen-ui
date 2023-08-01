import { validateBuilds } from './builds';
import { validateDependencies } from './dependencies';
import { ValidateCommandOptions } from './validate.types';

// TODO: Check more than just `packages`
export const validate = async (options: ValidateCommandOptions) => {
  const validators: Array<Promise<void>> = [];

  if (!options.buildsOnly) validators.push(validateDependencies(options));
  if (!options.depsOnly) validators.push(validateBuilds(options));

  Promise.all(validators)
    .then(() => {
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
};
