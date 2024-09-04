---
'@leafygreen-ui/tabs': minor
---

Updates the `selected` and `setSelected` props to accept both strings and numbers. The string must match the text content from the `name` prop on the `Tab` component. 

```js
  const [selectedTab, setSelectedTab] = useState<string | number>('Tab 4');

  return (
    <div>
      <Button onClick={() => setSelectedTab('Tab 2')}>
        Set second tab as active
      </Button>
      <Tabs
        selected={selectedTab}
        setSelected={setSelectedTab}
      >
        <Tab name="Tab 1">
          Content 1
        </Tab>
        <Tab name="Tab 2">
          Content 2
        </Tab>
        <Tab name="Tab 3">
          Content 3
        </Tab>
        <Tab name="Tab 4">
          Content 4
        </Tab>
      <Tabs>
    </div>
  );
```
