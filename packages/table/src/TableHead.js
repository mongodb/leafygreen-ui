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
import React from 'react';
import HeaderRow from './HeaderRow';
import TableHeader from './TableHeader';
import { isComponentType } from '@leafygreen-ui/lib';
import { useTableContext } from './TableContext';
function TableHead(_a) {
    var _b = _a.columns, columns = _b === void 0 ? [] : _b;
    var usingHeaderRow = React.useRef(false);
    // Breaks tables with a colSpan when we don't subscribe to state here, trying to figure out why
    // @ts-expect-error
    var state = useTableContext().state; // eslint-disable-line @typescript-eslint/no-unused-vars
    function createCols(array) {
        return array.map(function (child, index) {
            var tableHeaderCommonProps = {
                key: index,
                index: index,
            };
            if (isComponentType(child, 'HeaderRow')) {
                usingHeaderRow.current = true;
                var children = (child === null || child === void 0 ? void 0 : child.props).children;
                return React.cloneElement(child, {
                    children: createCols(React.Children.toArray(children)),
                });
            }
            if (isComponentType(child, 'TableHeader')) {
                return React.cloneElement(child, tableHeaderCommonProps);
            }
            if (typeof child === 'string') {
                return React.createElement(TableHeader, __assign({}, tableHeaderCommonProps, { label: child }));
            }
            return child;
        });
    }
    var columnArray = 
    // @ts-ignore Property 'type' does not exist on type '{}'.ts(2339)
    columns.type === React.Fragment
        ? React.Children.toArray(columns.props.children)
        : columns;
    if (usingHeaderRow.current) {
        return React.createElement("thead", null, createCols(columnArray));
    }
    return (React.createElement("thead", null,
        React.createElement(HeaderRow, null, createCols(columnArray))));
}
export default TableHead;
//# sourceMappingURL=TableHead.js.map