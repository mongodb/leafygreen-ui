# PR Title Generation Instructions

These guidelines are intended to standardize how PR titles are generated for this codebase. They are designed to be both human- and AI-readable to ensure consistency and compatibility with tools like GitHub Copilot.

## PR Title Format

- Generate PR titles in the following format:  
  `[LG-1337] feat(scope): concise summary of the main change`
- `LG-1337` is the Jira ticket code.
  - Look for changeset files (`.changeset/*.md`) in the commits to identify the Jira ticket code
  - Extract the ticket code from changeset files if present. If there are multiple relevant codes, separate with the "|" character
  - Omit the Jira code if it cannot be determined, but keep the rest of the format.
- `feat`, `fix`, `chore`, etc. should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) standard, using the most significant change type from the commits.
- `scope` should indicate the most relevant area, file, or component affected (e.g., `button`, `popover`).
- The message should be a brief, clear description of the main change.

## Examples

- `[LG-1234] feat(button): add size prop`
- `[LG-5678] fix(popover): resolve positioning issue`
- `[LG-9012] perf(table): optimize rendering for large datasets`
- `[LG-3456] build: update webpack configuration`
