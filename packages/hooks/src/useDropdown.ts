function Select({ children }) {
  const onSelect = useCallback(onSelect);
  const onClose = useCallback(onClose);

  const { focused, onFocus } = useFocusItems(
    children,
    disabled,
    onSelect,
    onClose,
  );

  const renderedChildren = React.Children.map(children, child => {
    // useInternalElement {...focused, onFocus}
    // React.cloneElement(child, {focused, onFocus})
  });
}

function Select({ children }) {
  // return <Popover>{createDropdownOptions(options, ())}</Popover>;
}
