/* eslint-disable no-console */
import chalk from 'chalk';
import spawn from 'cross-spawn';
import readline from 'readline';

export interface SpawnLoggedOptions {
  /**
   * The name of the command to prefix the logs with
   */
  name?: string;
  /**
   * Whether to pipe the command's stdout and stderr to the console
   */
  verbose?: boolean;
  /**
   * The working directory where the command will run inside
   */
  cwd: string;
  /**
   * The environment variables to use for the spawned process
   */
  env?: NodeJS.ProcessEnv;
}

export class SpawnLogger {
  /**
   * Available colors for PID prefixes
   */
  COLORS = [
    chalk.cyan,
    chalk.green,
    chalk.yellow,
    chalk.blue,
    chalk.magenta,
    chalk.greenBright,
    chalk.yellowBright,
    chalk.blueBright,
    chalk.magentaBright,
    chalk.cyanBright,
  ] as const;

  /**
   * Round-robin color index
   */
  colorIndex = 0;

  /**
   * Get the next color in round-robin fashion
   */
  getNextColor() {
    const color = this.COLORS[this.colorIndex];
    this.colorIndex = (this.colorIndex + 1) % this.COLORS.length;
    return color;
  }

  /**
   * Spawns a command and logs the output
   * @param command - The command to execute (e.g., 'pnpm', 'npm')
   * @param args - The command arguments
   * @param options - The options for the spawn command
   * @param options.name - The name of the command to prefix its output logs with. Defaults to launched process id.
   * @param options.verbose - Whether to pipe the command's stdout and stderr to the console.
   * @param options.cwd - The working directory where the command will run.
   * @param options.env - The environment variables to use for the spawned process (no other environment variables will be used).
   */
  async spawn(
    command: string,
    args: Array<string>,
    options: SpawnLoggedOptions,
  ): Promise<void> {
    const { name, verbose, cwd, env } = options;

    const child = spawn(command, args, {
      cwd,
      env,
    });

    const colorFn = this.getNextColor();
    const prefix = colorFn(name ? `[${name}]` : `[${child.pid}]`);

    const commandStr = [command, ...args].join(' ');
    console.log(
      `\n${prefix} ${chalk.dim('→')} ${chalk.dim(cwd)}\n` +
        `${prefix} ${chalk.cyan('$')} ${chalk.bold(commandStr)}\n`,
    );

    const exitCode = await new Promise<number | null>((resolve, reject) => {
      if (verbose) {
        const [stdout, stderr] = [
          readline.createInterface({ input: child.stdout! }),
          readline.createInterface({ input: child.stderr! }),
        ];

        stdout.on('line', line => {
          console.log(`${prefix} ${chalk.dim(line)}`);
        });

        stderr.on('line', line => {
          console.error(`${prefix} ${chalk.reset(line)}`);
        });

        child.on('exit', function () {
          stdout.close();
          stderr.close();
        });
      }

      child.on('exit', code => resolve(code));
      child.on('error', reject);
      child.on('disconnect', reject);
    });

    if (exitCode) {
      console.log(
        `${prefix} ${chalk.dim('→')} ${chalk.red(
          `finished with exit code ${exitCode}`,
        )}\n`,
      );

      throw new Error(`Command failed with exit code ${exitCode}`);
    } else {
      console.log(
        `${prefix} ${chalk.dim('→')} ${chalk.dim('finished successfully')}\n`,
      );
    }
  }
}

const defaultInstance = new SpawnLogger();

export async function spawnLogged(
  command: string,
  args: Array<string>,
  options: SpawnLoggedOptions,
): Promise<void> {
  return defaultInstance.spawn(command, args, options);
}
