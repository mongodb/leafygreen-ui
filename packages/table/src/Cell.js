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
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { commonCellStyles } from './styles';
export var tdInnerDiv = createDataProp('td-inner-div');
var tdStyles = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  line-height: 16px;\n  position: relative;\n"], ["\n  line-height: 16px;\n  position: relative;\n"])));
var innerDivStyles = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n"], ["\n  display: flex;\n  align-items: center;\n"])));
var Cell = React.forwardRef(function (_a, ref) {
    var children = _a.children, className = _a.className, rest = __rest(_a, ["children", "className"]);
    return (React.createElement("td", __assign({ ref: ref, className: cx(commonCellStyles, tdStyles, className) }, rest),
        React.createElement("div", __assign({ className: innerDivStyles }, tdInnerDiv.prop), children)));
});
Cell.displayName = 'Cell';
export default Cell;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Cell.js.map