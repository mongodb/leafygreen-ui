# PR Description Generation Instructions

These guidelines are intended to standardize how PR descriptions are generated for this codebase. They are designed to be both human- and AI-readable to ensure consistency and compatibility with tools like GitHub Copilot.

First, follow these instructions to generate the **PR Title**:

- The final title must be in the format: `[JIRA-ID] type(scope): concise summary of the main change`.
- To find the `JIRA-ID`, inspect the content of any changed files located in the `.changeset/` directory. Extract the Jira ticket code (e.g., `LG-1337`). If you find multiple ticket codes, separate them with a `|` character (e.g., `[LG-1337|LG-4567]`). If no ticket code is found, omit the `[JIRA-ID]` portion entirely.
- The `type` (e.g., `feat`, `fix`, `chore`) must follow the Conventional Commits standard based on the most significant change you analyze.
- The `scope` should be the most relevant area or component affected (e.g., `button`, `api`, `auth`).
- The summary should be a concise, lowercase description of the main change.

---

Next, use the following template **exactly** to generate the **PR Description**.

**IMPORTANT CHECKLIST LOGIC:** You must choose **only one** of the two checklists provided below. To decide which one to use, analyze the file paths in the staged git changes.

1. If you detect that a **net-new directory** has been created directly under `packages/`, `tools/`, `chat/`, or `charts/`, then you **must** use the "For new components" checklist.

```markdown
- [ ] I have added my new package to the global tsconfig
- [ ] I have added my new package to the Table of Contents on the global README
- [ ] I have verified the Live Example will look as intended on the design website.
```

2. Otherwise, use the "For bug fixes, new features & breaking changes" checklist.

```markdown
- [ ] I have added stories/tests that prove my fix is effective or that my feature works
- [ ] I have added necessary documentation (if appropriate)
- [ ] I have run `pnpm changeset` and documented my changes
```

Do not include both checklists in your final output.

```markdown
## ✍️ Proposed changes

[Generate a **brief and clear** description of the big picture changes and why they are being made. If it fixes a bug or implements a feature, concisely explain the problem being solved.]

🎟️ _Jira ticket:_ [Generate a link here using the TICKET-ID(s) you found, like `[LG-1234](https://jira.mongodb.org/browse/LG-1234)`]

## ✅ Checklist

[INSERT THE CORRECT CHECKLIST HERE BASED ON THE LOGIC ABOVE]

## 🧪 How to test changes

[Generate **concise, specific, and actionable** testing steps based on the changes made. For bug fixes, include simple steps to reproduce the issue. For features, provide clear steps to verify the new functionality.]
```
