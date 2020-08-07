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
import { cx, css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { TableProvider } from './TableContext';
import TableHead from './TableHead';
import TableBody from './TableBody';
var tableStyles = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-collapse: collapse;\n  box-sizing: border-box;\n  border-bottom: 1px solid ", ";\n"], ["\n  border-collapse: collapse;\n  box-sizing: border-box;\n  border-bottom: 1px solid ", ";\n"])), uiColors.gray.light2);
export default function Table(_a) {
    var _b = _a.columns, columns = _b === void 0 ? [] : _b, _c = _a.data, dataProp = _c === void 0 ? [] : _c, children = _a.children, className = _a.className, rest = __rest(_a, ["columns", "data", "children", "className"]);
    return (React.createElement(TableProvider, { data: dataProp },
        React.createElement("table", __assign({ cellSpacing: "0", cellPadding: "0", className: cx(tableStyles, className) }, rest),
            React.createElement(TableHead, { columns: columns }),
            React.createElement(TableBody, null, children))));
}
var templateObject_1;
//# sourceMappingURL=Table.js.map