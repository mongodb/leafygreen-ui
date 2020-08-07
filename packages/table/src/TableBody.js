import React from 'react';
import { useTableContext } from './TableContext';
function TableBody(_a) {
    var children = _a.children;
    var data = useTableContext().state.data;
    return (React.createElement("tbody", null, data.map(function (datum, index) { return children({ datum: datum, index: index }); })));
}
export default TableBody;
//# sourceMappingURL=TableBody.js.map