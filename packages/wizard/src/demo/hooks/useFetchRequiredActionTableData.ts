import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { LGRowData, LGTableDataType } from '@leafygreen-ui/table';

interface FetchRequiredActionTableDataArgs<D extends LGRowData> {
  demoData: Array<LGTableDataType<D>>;
  _demoDelay?: number;
}

interface FetchRequiredActionTableDataReturnType<D extends LGRowData> {
  tableData: Array<LGTableDataType<D>>;
  setTableData: Dispatch<SetStateAction<Array<LGTableDataType<D>>>>;
  isLoading: boolean;
}

export const useFetchRequiredActionTableData = <D extends LGRowData>({
  demoData,
  _demoDelay,
}: FetchRequiredActionTableDataArgs<D>): FetchRequiredActionTableDataReturnType<D> => {
  const [isLoading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<Array<LGTableDataType<D>>>([]);

  useEffect(() => {
    if (_demoDelay === 0) {
      setTableData(demoData);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTableData(demoData);
    }, _demoDelay ?? 500 + 5000 * Math.random());
  }, [_demoDelay, demoData]);

  return {
    isLoading,
    tableData,
    setTableData,
  };
};
