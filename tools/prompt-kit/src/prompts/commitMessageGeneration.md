# Commit Message Generation Instructions

These guidelines are intended to standardize how commit messages are generated for this codebase. They are designed to be both human- and AI-readable to ensure consistency and compatibility with tools like GitHub Copilot.

- Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) style for commit messages
- Use imperative form: `add`, not `adds` or `added`
- Keep subject line detailed but concise
- Include a `(scope)` where helpful - like a component or file

Examples:

- `feat(button): add size prop`
- `fix(popover): resolve positioning issue`
- `chore: update dependencies`
- `docs(charts legend): update README with example and prop table`
- `style: format code with lint command`
- `refactor(charts tooltip): abstract visibility logic into hook`
- `test: add unit tests for new functionality`
