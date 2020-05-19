const alphanumericCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

export const sortFunction = ({
  data,
  key,
  direction,
}: {
  data: Array<any>;
  key: string;
  direction: 'asc' | 'desc';
}) => {
  return data.sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (direction !== 'desc') {
      return alphanumericCollator.compare(aVal, bVal);
    }

    return alphanumericCollator.compare(bVal, aVal);
  });
};

const DataType = {
  NominalNumber: 'nominalNumber',
  Quantity: 'quantity',
  Weight: 'weight',
  ZipCode: 'zipCode',
  String: 'string',
  Date: 'date',
} as const;

type DataType = typeof DataType[keyof typeof DataType];

export { DataType };
