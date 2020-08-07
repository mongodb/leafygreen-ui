var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { createContext, useContext, useMemo, useReducer } from 'react';
var TableTypes = {
    RegisterColumn: 'REGISTER_COLUMN_INFO',
    SortTableData: 'SORT_TABLE_DATA',
    SetHasNestedRows: 'SET_HAS_NESTED_ROWS',
    SetHasRowSpan: 'SET_HAS_ROW_SPAN',
};
export { TableTypes };
var DataType = {
    Number: 'number',
    Weight: 'weight',
    ZipCode: 'zipCode',
    String: 'string',
    Date: 'date',
};
export { DataType };
var TableContext = createContext({
    state: {
        data: [],
    },
    dispatch: function () { },
});
export function reducer(state, action) {
    var _a;
    var _b, _c;
    switch (action.type) {
        case TableTypes.SetHasRowSpan:
            return __assign(__assign({}, state), { hasRowSpan: action.payload });
        case TableTypes.SetHasNestedRows:
            return __assign(__assign({}, state), { hasNestedRows: action.payload });
        case TableTypes.RegisterColumn:
            return __assign(__assign({}, state), { columnInfo: __assign(__assign({}, state.columnInfo), (_a = {}, _a[action.payload.index] = {
                    dataType: action.payload.dataType,
                }, _a)) });
        case TableTypes.SortTableData:
            return __assign(__assign({}, state), { sort: {
                    columnId: action.payload.columnId,
                    direction: ((_b = state.sort) === null || _b === void 0 ? void 0 : _b.direction) === 'desc' ? 'asc' : 'desc',
                    accessorValue: action.payload.accessorValue,
                }, data: sortFunction({
                    data: action.payload.data,
                    direction: ((_c = state.sort) === null || _c === void 0 ? void 0 : _c.direction) === 'desc' ? 'asc' : 'desc',
                    accessorValue: action.payload.accessorValue,
                }) });
        default:
            return __assign({}, state);
    }
}
export function TableProvider(_a) {
    var children = _a.children, data = _a.data;
    var initialState = {
        sort: {
            direction: undefined,
        },
        data: data,
        hasNestedRows: false,
    };
    var _b = useReducer(reducer, initialState), state = _b[0], dispatch = _b[1];
    var contextValue = useMemo(function () {
        return { state: state, dispatch: dispatch };
    }, [state, dispatch]);
    return (React.createElement(TableContext.Provider, { value: contextValue }, children));
}
export function useTableContext() {
    return useContext(TableContext);
}
var alphanumericCollator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
});
export var sortFunction = function (_a) {
    var data = _a.data, accessorValue = _a.accessorValue, direction = _a.direction;
    return data.sort(function (a, b) {
        var aVal = accessorValue(a);
        var bVal = accessorValue(b);
        if (direction !== 'desc') {
            return alphanumericCollator.compare(aVal, bVal);
        }
        return alphanumericCollator.compare(bVal, aVal);
    });
};
//# sourceMappingURL=TableContext.js.map