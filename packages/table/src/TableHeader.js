var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import SortAscendingIcon from '@leafygreen-ui/icon/dist/SortAscending';
import SortDescendingIcon from '@leafygreen-ui/icon/dist/SortDescending';
import UnsortedIcon from '@leafygreen-ui/icon/dist/Unsorted';
import IconButton from '@leafygreen-ui/icon-button';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { commonCellStyles } from './styles';
import { useTableContext, TableTypes } from './TableContext';
var thStyle = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 144px;\n  border-width: 0px 1px 3px 1px;\n  border-color: ", ";\n  border-style: solid;\n"], ["\n  width: 144px;\n  border-width: 0px 1px 3px 1px;\n  border-color: ", ";\n  border-style: solid;\n"])), uiColors.gray.light2);
var flexDisplay = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  justify-content: space-between;\n"])));
var labelStyle = css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  color: ", ";\n  padding-right: 4px;\n"], ["\n  display: flex;\n  align-items: center;\n  color: ", ";\n  padding-right: 4px;\n"])), uiColors.gray.dark2);
var glyphColor = css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), uiColors.blue.base);
var glyphMap = {
    unsorted: UnsortedIcon,
    asc: SortAscendingIcon,
    desc: SortDescendingIcon,
};
export function normalizeAccessor(accessor) {
    var accessorFn = accessor;
    if (typeof accessor === 'string') {
        if (accessor.includes('.')) {
            var accessorArr_1 = accessor.split('.');
            accessorFn = function (data) {
                return accessorArr_1.reduce(function (obj, access) {
                    return obj[access];
                }, data);
            };
        }
        else {
            accessorFn = function (data) { return data[accessor]; };
        }
    }
    return accessorFn;
}
function TableHeader(_a) {
    var _b;
    var _c;
    var label = _a.label, onClick = _a.onClick, index = _a.index, className = _a.className, dataType = _a.dataType, sortBy = _a.sortBy, rest = __rest(_a, ["label", "onClick", "index", "className", "dataType", "sortBy"]);
    var _d = useTableContext(), _e = _d.state, sort = _e.sort, data = _e.data, dispatch = _d.dispatch;
    React.useEffect(function () {
        if (typeof index === 'number') {
            dispatch({
                type: TableTypes.RegisterColumn,
                payload: {
                    // Offsetting 0-index
                    index: index + 1,
                    dataType: dataType,
                },
            });
        }
    }, [dispatch, index, dataType]);
    var normalizedAccessor = sortBy && normalizeAccessor(sortBy);
    var glyph;
    if ((sort === null || sort === void 0 ? void 0 : sort.columnId) === index) {
        glyph = (_c = sort === null || sort === void 0 ? void 0 : sort.direction) !== null && _c !== void 0 ? _c : 'unsorted';
    }
    else {
        glyph = 'unsorted';
    }
    var Glyph = glyphMap[glyph];
    var sortRows = function () {
        if (typeof index === 'number' && normalizedAccessor) {
            dispatch({
                type: TableTypes.SortTableData,
                payload: {
                    columnId: index,
                    accessorValue: normalizedAccessor,
                    data: data,
                },
            });
        }
    };
    var sortButton = (React.createElement(IconButton, { "aria-label": "sort", onClick: sortRows, className: css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        margin-bottom: 2px;\n      "], ["\n        margin-bottom: 2px;\n      "]))) },
        React.createElement(Glyph, { size: "small", title: glyph + "-" + index, className: cx((_b = {},
                _b[glyphColor] = glyph === 'asc' || glyph === 'desc',
                _b)) })));
    return (React.createElement("th", __assign({}, rest, { className: cx(thStyle, commonCellStyles, className) }),
        React.createElement("div", { className: flexDisplay },
            React.createElement("span", { className: labelStyle }, label),
            sortBy != null && sortButton)));
}
TableHeader.displayName = 'TableHeader';
export default TableHeader;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=TableHeader.js.map