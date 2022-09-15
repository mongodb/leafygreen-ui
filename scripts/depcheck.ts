/* eslint-disable no-console */
import depcheck from 'depcheck';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { exit } from 'process';
import chalk from 'chalk'
import { Command } from 'commander'
import packageJson from '../package.json';
import {
  SpawnOptions,
  spawnSync
} from 'child_process';
const lgPackages = readdirSync('packages/')
const devDependencies = Object.keys(packageJson.devDependencies)

const cli = new Command('depcheck')
  .option('-f, --fix', 'Option to fix any errors found', false)
  .parse(process.argv);
const fix: boolean = cli.opts()['fix']

checkDependencies()

async function checkDependencies() {
  let issuesFound = false;

  for (const pkg of lgPackages) {
    const check = await depcheck(resolve(__dirname, `../packages/${pkg}`), {})
    const {dependencies: unused, missing: missingLocal} = check

    const missing = Object.keys(missingLocal).filter(dep => !devDependencies.includes(dep))

    if (missing.length > 0 || unused.length > 0) {

      (missing.length > 0) && console.log(`${chalk.green(`packages/${pkg}`)} is missing: ${chalk.redBright(missing.join(', '))}`);
      (unused.length > 0) && console.log(`${chalk.green(`packages/${pkg}`)} doesn't use ${chalk.blueBright(unused.join(', '))}`);

      if (fix) {
        fixDependencies(pkg, missing, unused)
      } else {
        issuesFound = true;
      }

      console.log('')
    }
  }

  if (issuesFound) {
    exit(1)
  } else {
    exit(0)
  }
}

function fixDependencies(pkg: string, missing: Array<string>, unused: Array<string>) {
  const cmdOpts:SpawnOptions = {stdio: 'inherit', cwd: `packages/${pkg}`};
  (missing.length > 0 ) && spawnSync('yarn', ['add', '-W', ...missing], cmdOpts);
  (unused.length > 0) && spawnSync('yarn', ['remove', ...unused], cmdOpts)
}
