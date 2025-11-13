---
'@lg-tools/link': minor
'@lg-tools/cli': minor
---

- Add more detailed color-prefixed process logging to spawned commands in link tool
- Added new flags to `link` script to cover broader use cases:
  - `--no-parallel`: Run the link command sequentially for each package. Useful for when the default parallel approach fails
  - `--launch-env`: A string of environment variable lines as `KEY=VALUE`, separated by a newline. Only the specified environment variables will be used during npm link commands in the source and destination directories. This is useful to workaround environment variable pollution by tools such as version managers (e.g., asdf) or script runners (e.g., pnpm) that interfere with `npm link`. We recommend using `--launch-env="$(env)"` to use your original shell environment.
- Improve documentation for linking in DEVELOPER.md
