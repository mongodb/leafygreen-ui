# PR Description Generation Instructions

These guidelines are intended to standardize how PR descriptions are generated for this codebase. They are designed to be both human- and AI-readable to ensure consistency and compatibility with tools like GitHub Copilot.

## Instructions for AI Generation

When generating PR descriptions:

1. **Extract Jira ticket information** from changeset files (`.changeset/*.md`) or commit messages
2. **Analyze the changes** to determine if they are bug fixes, new features, or breaking changes
3. **Identify the scope** of changes (which components/packages are affected)
4. **Generate specific testing instructions** based on the type of changes made
5. **Check for new components** and include appropriate checklist items

## PR Description Template

Use this exact template structure:

```markdown
## ✍️ Proposed changes

[Generate a clear, concise description of the big picture changes and why they should be accepted. If it fixes a bug or implements a feature, explain the problem being solved.]

🎟 _Jira ticket:_ [TICKET-ID](https://jira.mongodb.org/browse/[TICKET-ID])

## ✅ Checklist

### For bug fixes, new features & breaking changes

- [ ] I have added/updated test specs that prove my fix is effective or that my feature works
- [ ] I have added/updated stories that prove my fix is effective or that my feature works
- [ ] I have added necessary documentation (if appropriate)
- [ ] I have run `pnpm changeset` and documented my changes

### For new components

- [ ] I have added my new package to the global tsconfig
- [ ] I have added my new package to the Table of Contents on the global README
- [ ] I have verified the new component has a Live Example story and will appear as intended on the design website.

## 🧪 How to test changes

[Generate specific, actionable testing steps based on the changes made. Include:

- Steps to reproduce the issue (for bug fixes)
- How to verify new functionality works (for features)
- What to look for during testing
- Any specific scenarios or edge cases to test]
```
