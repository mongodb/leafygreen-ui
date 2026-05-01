---
'@leafygreen-ui/delete-wizard': minor
---

Creates reusable `RecommendationCard` & `ReviewCard` for Deletion Wizards

```tsx
<RecommendationCard
  category="Things"
  title="Do a thing"
  description="Before deleting, you need to do a thing."
  link={<Link href="https://mongodb.design">mongodb.design</Link>}
/>,
```

```tsx
<ReviewCard
  title={
    <ReviewCardTitleWithCountEmphasis
      verb="Terminate"
      count={6}
      resource="clusters"
    />
  }
  description="Completing this action will terminate all clusters"
>
  <Table>...</Table>
</ReviewCard>
```
