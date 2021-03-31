---
'@leafygreen-ui/tooltip': patch
---

The eventListener attached to the document to listen for clicks to close a Tooltip when clicked was being called erroneously when the Tooltip's trigger was a React component. Previously, we were only checking to see if the target of the event was contained by the tooltip in order to determien whether or not to close the Tooltip when the backdrop was clicked. However, if the Tooltip's trigger is a React.Component the trigger is not a child of the tooltipNode, and therefore this check wasn't sufficient. Now, we are also ensuring that the trigger isn't included in the handleBackdropClick check, such that a tooltip isn't opened and then immediately closed by the handleBackdropClick function.
