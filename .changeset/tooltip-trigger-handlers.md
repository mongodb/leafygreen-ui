---
'@leafygreen-ui/tooltip': minor
---

Exports `useTooltipTriggerEventHandlers` to enable handling external tooltip triggers.

```tsx
const [open, setOpen] = useState(false);
const tooltipEventHandlers = useTooltipTriggerEventHandlers({
  triggerEvent: TriggerEvent.Hover,
  setState: setOpen,
  onFocus: (e) => { console.log(e) } // side effects called on focus of the trigger
});

return (
<>
  <Button ref={triggerRef} {...tooltipEventHandlers}>
    Button
  </Button>
  <Tooltip
    refEl={triggerRef}
    open={open}
    setOpen={setOpen}
  >Content</Tooltip>
</>
)
```