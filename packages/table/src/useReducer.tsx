const alphanumericCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

const sortFunction = ({ data, key, direction }) => {
  return data.sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (direction !== 'desc') {
      return alphanumericCollator.compare(aVal, bVal);
    }

    return alphanumericCollator.compare(bVal, aVal);
  });
};

export function reducer(state, action) {
  switch (action.type) {
    case 'ADD_STICKY_COLUMN':
      return {
        ...state,
        stickyColumns: [...state.stickyColumns, action.payload],
      };
    case 'SORT':
      return {
        ...state,
        sort: {
          columnId: action.payload.columnId,
          direction: state.sort.direction === 'desc' ? 'asc' : 'desc',
          key: action.payload.key,
        },
        data: sortFunction({
          data: action.payload.data,
          direction: state.sort.direction === 'desc' ? 'asc' : 'desc',
          key: action.payload.key,
        }),
      };
    default:
      return state;
  }
}
