"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["field", "owner", "path", "onChange", "Component"],
    _excluded2 = ["field", "owner", "path", "onChange", "Component", "ChildComponent"],
    _excluded3 = ["object", "ContainerComponent", "FormFieldComponent", "onChange"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function BasicReactJsonFormNode(_ref) {
  var field = _ref.field,
      owner = _ref.owner,
      path = _ref.path,
      onChange = _ref.onChange,
      Component = _ref.Component,
      others = _objectWithoutProperties(_ref, _excluded);

  var _useState = (0, _react.useState)(owner[field]),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _onChange = function _onChange(event) {
    owner[field] = event.target.value;
    onChange(owner);
    setValue(owner[field]);
  };

  return /*#__PURE__*/_react.default.createElement(Component, _extends({
    path: path.join("."),
    key: field,
    field: field,
    owner: owner,
    value: value,
    onChange: _onChange
  }, others));
}

function BasicReactJsonFormParent(_ref2) {
  var field = _ref2.field,
      owner = _ref2.owner,
      path = _ref2.path,
      onChange = _ref2.onChange,
      Component = _ref2.Component,
      ChildComponent = _ref2.ChildComponent,
      others = _objectWithoutProperties(_ref2, _excluded2);

  var _useState3 = (0, _react.useState)(field ? owner[field] : owner),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _onChange = function _onChange(newValue) {
    if (field) {
      owner[field] = newValue;
    }

    onChange(owner);
    setValue(newValue);
  };

  return /*#__PURE__*/_react.default.createElement(Component, _extends({
    key: field,
    field: field,
    owner: owner
  }, others), Object.keys(value).map(function (key) {
    return _typeof(value[key]) === "object" ? /*#__PURE__*/_react.default.createElement(BasicReactJsonFormParent, _extends({
      key: key,
      field: key,
      owner: value,
      path: [].concat(_toConsumableArray(path), [key]),
      onChange: _onChange,
      Component: Component,
      ChildComponent: ChildComponent
    }, others)) : /*#__PURE__*/_react.default.createElement(BasicReactJsonFormNode, {
      key: key,
      path: [].concat(_toConsumableArray(path), [key]),
      onChange: _onChange,
      field: key,
      owner: value,
      Component: ChildComponent
    });
  }));
}

function BasicReactJsonForm(_ref3) {
  var object = _ref3.object,
      ContainerComponent = _ref3.ContainerComponent,
      FormFieldComponent = _ref3.FormFieldComponent,
      onChange = _ref3.onChange,
      others = _objectWithoutProperties(_ref3, _excluded3);

  var _useState5 = (0, _react.useState)(object),
      _useState6 = _slicedToArray(_useState5, 2),
      model = _useState6[0],
      setModel = _useState6[1];

  var _onChange = function _onChange(newModel) {
    setModel(newModel);

    if (typeof onChange === "function") {
      onChange(model);
    }
  };

  return /*#__PURE__*/_react.default.createElement("form", others, /*#__PURE__*/_react.default.createElement(BasicReactJsonFormParent, {
    Component: ContainerComponent,
    ChildComponent: FormFieldComponent,
    field: "",
    owner: model,
    path: [],
    onChange: _onChange
  }));
}

BasicReactJsonForm.propTypes = Object.assign({}, _react.default.Component.defaultProps, {
  object: _propTypes.default.object,
  ContainerComponent: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  FormFieldComponent: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  onChange: _propTypes.default.func
});
BasicReactJsonForm.defaultProps = {
  onChange: function onChange() {}
};
var _default = BasicReactJsonForm;
exports.default = _default;
