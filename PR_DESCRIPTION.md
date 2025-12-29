# PR Title

`[LG-5844] feat(collection-toolbar): add CollectionToolbarTitle compound component`

---

# PR Description

## ✍️ Proposed changes

This PR introduces the `CollectionToolbarTitle` compound component for the `CollectionToolbar` package. The title component:

- Uses the compound component pattern (`CompoundComponent` and `CompoundSubComponent` utilities) to integrate seamlessly with the parent `CollectionToolbar`
- Renders an `H3` typography element for the title content
- Only displays when the `CollectionToolbar` variant is set to `Collapsible`
- Exports `Size` and `Variant` enums for better component API ergonomics

Additionally, this PR improves the Storybook configuration with proper `StoryMetaType`, argument types, and a `LiveExample` story that demonstrates the title component usage.

🎟️ _Jira ticket:_ [LG-5844](https://jira.mongodb.org/browse/LG-5844)

## ✅ Checklist

- [ ] I have added stories/tests that prove my fix is effective or that my feature works
- [ ] I have added necessary documentation (if appropriate)
- [ ] I have run `pnpm changeset` and documented my changes

## 🧪 How to test changes

1. Run `pnpm storybook` and navigate to **Components / CollectionToolbar**
2. View the **LiveExample** story to see the `CollectionToolbar.Title` in action
3. Toggle the `variant` control to `Collapsible` - the title should appear
4. Toggle the `variant` control to `Default` - the title should be hidden
5. Verify that the title renders correctly with different `size` and `darkMode` combinations
