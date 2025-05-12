# `@lg-tools/prompt-kit`

Shared prompts for LeafyGreen repositories.

## Usage

It's recommended to use `@lg-tools/prompt-kit` in tandem with `@lg-tools/cli`. The `lg merge-prompts-vscode` script will automatically merge the shared prompts into `.vscode/settings.json`.

### Options

To see all options for this command, run:

```bash
> lg merge-prompts-vscode --help
```

### Steps:

1. Ensure both `@lg-tools/prompt-kit` and `@lg-tools/cli` are installed.
2. Run the following command:
   ```bash
   > lg merge-prompts-vscode
   ```
3. Open your VS Code settings to verify that the prompts have been successfully added.
