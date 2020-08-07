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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { isComponentType } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useTableContext, TableTypes, DataType } from './TableContext';
import { tdInnerDiv } from './Cell';
var rowStyle = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-top: 1px solid ", ";\n  color: ", ";\n\n  & > td > ", " {\n    height: 40px;\n    overflow: hidden;\n    transition: all 150ms ease-in-out;\n  }\n"], ["\n  border-top: 1px solid ", ";\n  color: ", ";\n\n  & > td > ", " {\n    height: 40px;\n    overflow: hidden;\n    transition: all 150ms ease-in-out;\n  }\n"])), uiColors.gray.light2, uiColors.gray.dark2, tdInnerDiv.selector);
var altColor = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  &:nth-of-type(even) {\n    background-color: ", ";\n  }\n"], ["\n  &:nth-of-type(even) {\n    background-color: ", ";\n  }\n"])), uiColors.gray.light3);
var iconButtonMargin = css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-right: 4px;\n"], ["\n  margin-right: 4px;\n"])));
var disabledStyle = css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background-color: ", ";\n  color: ", ";\n  cursor: not-allowed;\n  border-top: 1px solid ", ";\n  border-bottom: 1px solid ", ";\n"], ["\n  background-color: ", ";\n  color: ", ";\n  cursor: not-allowed;\n  border-top: 1px solid ", ";\n  border-bottom: 1px solid ", ";\n"])), uiColors.gray.light2, uiColors.gray.base, uiColors.gray.light1, uiColors.gray.light1);
var displayFlex = css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n"], ["\n  display: flex;\n  align-items: center;\n"])));
var truncation = css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  max-width: 100px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n"], ["\n  max-width: 100px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n"])));
var transitionStyles = {
    default: css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    transition: border 150ms ease-in-out;\n    border-top-color: transparent;\n\n    & > td {\n      padding-top: 0px;\n      padding-bottom: 0px;\n    }\n\n    & > td > ", " {\n      max-height: 0;\n    }\n  "], ["\n    transition: border 150ms ease-in-out;\n    border-top-color: transparent;\n\n    & > td {\n      padding-top: 0px;\n      padding-bottom: 0px;\n    }\n\n    & > td > ", " {\n      max-height: 0;\n    }\n  "])), tdInnerDiv.selector),
    entered: css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    border-top-color: ", ";\n\n    & > td > ", " {\n      max-height: 40px;\n    }\n  "], ["\n    border-top-color: ", ";\n\n    & > td > ", " {\n      max-height: 40px;\n    }\n  "])), uiColors.gray.light2, tdInnerDiv.selector),
};
function styleColumn(index, dataType) {
    var justify;
    if (dataType === DataType.Number) {
        justify = 'flex-end';
    }
    else {
        justify = 'flex-start';
    }
    return css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    & td:nth-child(", ") > div {\n      justify-content: ", ";\n    }\n  "], ["\n    & td:nth-child(", ") > div {\n      justify-content: ", ";\n    }\n  "])), index, justify);
}
function getIndentLevelStyle(indentLevel) {
    return css(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    & > td:nth-child(1) {\n      padding-left: ", "px;\n    }\n  "], ["\n    & > td:nth-child(1) {\n      padding-left: ", "px;\n    }\n  "])), 8 + indentLevel * 16);
}
function generateIndexRef() {
    return Math.random().toString(36).substring(2);
}
var Row = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var _d = _a.expanded, expanded = _d === void 0 ? false : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.indentLevel, indentLevel = _f === void 0 ? 0 : _f, isAnyAncestorCollapsedProp = _a.isAnyAncestorCollapsed, children = _a.children, className = _a.className, rest = __rest(_a, ["expanded", "disabled", "indentLevel", "isAnyAncestorCollapsed", "children", "className"]);
    var _g = useTableContext(), _h = _g.state, data = _h.data, columnInfo = _h.columnInfo, hasNestedRows = _h.hasNestedRows, hasRowSpan = _h.hasRowSpan, tableDispatch = _g.dispatch;
    var indexRef = useRef(generateIndexRef());
    var _j = useState(expanded), isExpanded = _j[0], setIsExpanded = _j[1];
    var nodeRef = useRef(null);
    useEffect(function () {
        var shouldDispatchHasNestedRows = false;
        var shouldDispatchHasRowSpan = false;
        React.Children.forEach(children, function (child) {
            if (isComponentType(child, 'Row') &&
                !shouldDispatchHasNestedRows &&
                !hasNestedRows) {
                shouldDispatchHasNestedRows = true;
            }
            if (isComponentType(child, 'Cell') &&
                child.props.rowSpan > 1 &&
                !hasRowSpan &&
                !shouldDispatchHasRowSpan) {
                shouldDispatchHasRowSpan = true;
            }
        });
        if (shouldDispatchHasNestedRows) {
            tableDispatch({
                type: TableTypes.SetHasNestedRows,
                payload: true,
            });
        }
        if (shouldDispatchHasRowSpan) {
            tableDispatch({
                type: TableTypes.SetHasRowSpan,
                payload: true,
            });
        }
    }, [children, hasNestedRows, hasRowSpan, tableDispatch]);
    // Iterating over children twice because generated memoized values have different dependants
    var renderedChildren = React.useMemo(function () {
        var chevronButton = (React.createElement(IconButton, { onClick: function () { return setIsExpanded(function (curr) { return !curr; }); }, "aria-label": "chevron", className: iconButtonMargin },
            React.createElement(Icon, { "aria-label": "chevron", glyph: isExpanded ? 'ChevronDown' : 'ChevronRight', color: uiColors.gray.dark2 })));
        var renderedChildren = [];
        var hasSeenRow = false;
        React.Children.forEach(children, function (child, index) {
            if (isComponentType(child, 'Cell')) {
                if (!child.props.children) {
                    return null;
                }
                renderedChildren.push(React.cloneElement(child, {
                    children: (React.createElement("span", { className: truncation }, child.props.children)),
                    key: indexRef.current + "-" + index,
                    disabled: child.props.disabled || disabled,
                }));
            }
            else {
                if (isComponentType(child, 'Row')) {
                    hasSeenRow = true;
                }
            }
        });
        if (hasSeenRow) {
            renderedChildren[0] = React.cloneElement(renderedChildren[0], {
                children: (React.createElement(React.Fragment, null,
                    chevronButton,
                    React.createElement("span", { className: truncation }, renderedChildren[0].props.children))),
                className: cx(displayFlex, className),
                key: indexRef.current + "-" + renderedChildren[0].props.children,
            });
        }
        return renderedChildren;
    }, [children, disabled, className, isExpanded, setIsExpanded]);
    // Iterating over children twice because generated memoized values have different dependants
    var nestedRows = React.useMemo(function () {
        var hasSeenFirstCell = false;
        var nestedRows = [];
        React.Children.forEach(children, function (child, index) {
            if (isComponentType(child, 'Cell') && !hasSeenFirstCell) {
                hasSeenFirstCell = true;
            }
            if (child != null && isComponentType(child, 'Row')) {
                nestedRows.push(React.cloneElement(child, {
                    ref: nodeRef,
                    isAnyAncestorCollapsed: isAnyAncestorCollapsedProp || !isExpanded,
                    indentLevel: indentLevel + 1,
                    key: indexRef.current + "-" + indentLevel + "-" + index,
                }));
            }
        });
        return nestedRows;
    }, [isAnyAncestorCollapsedProp, isExpanded, indentLevel, children]);
    // Depending on network speed, will noticeably render columns with incorrect
    // alignment, would rather wait for proper information before rendering
    if (!columnInfo) {
        return null;
    }
    var shouldAltRowColor = data && data.length >= 10 && !hasNestedRows;
    var alignmentStyles = Object.entries(columnInfo).map(function (_a) {
        var key = _a[0], dataType = _a[1].dataType;
        return styleColumn(key, dataType);
    });
    var rowClassName = cx(rowStyle, getIndentLevelStyle(indentLevel), __spreadArrays(alignmentStyles), (_b = {},
        _b[altColor] = shouldAltRowColor,
        _b[disabledStyle] = disabled,
        _b), className);
    var ariaExpanded = nestedRows.length > 0
        ? (_c = {},
            _c['aria-expanded'] = isExpanded,
            _c) : undefined;
    return (React.createElement(React.Fragment, null,
        React.createElement("tr", __assign({ className: rowClassName, "aria-disabled": disabled, ref: ref, key: indexRef.current }, ariaExpanded, rest), renderedChildren),
        nestedRows && nestedRows.length > 0 && (React.createElement(Transition, { in: isExpanded && !isAnyAncestorCollapsedProp, timeout: 150, nodeRef: nodeRef }, function (state) {
            return (React.createElement(React.Fragment, null, nestedRows === null || nestedRows === void 0 ? void 0 : nestedRows.map(function (element) {
                var _a;
                return React.cloneElement(element, {
                    className: cx(transitionStyles.default, (_a = {},
                        _a[transitionStyles.entered] = [
                            'entering',
                            'entered',
                        ].includes(state),
                        _a)),
                });
            })));
        }))));
});
Row.displayName = 'Row';
export default Row;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=Row.js.map