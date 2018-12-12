"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = function _default(_ref) {
  var dir = _ref.dir;

  var flatter = function flatter() {
    return function (acc, a) {
      return _toConsumableArray(acc).concat(_toConsumableArray(Array.isArray(a) ? a : [a]));
    };
  };

  var paths = [dir].reduce(flatter(), []).map(function (d) {
    return _path["default"].resolve(__dirname, d);
  });
  return {
    options: function () {
      function options(_options) {
        var inputOri = _options.input,
            _external = _options.external;
        var input = [inputOri].reduce(flatter(), []).map(function (f) {
          return _path["default"].resolve(__dirname, f);
        });
        return _objectSpread({}, _options, {
          external: function () {
            function external(id) {
              var inFiles = paths.some(function (p) {
                return id.startsWith(p);
              }) && !input.includes(id);
              if (inFiles) return inFiles;

              if (typeof _external === 'function') {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }

                return inFiles || _external.apply(void 0, [id].concat(args));
              }

              if (Array.isArray(_external)) {
                return _external.includes(id);
              }

              return null;
            }

            return external;
          }()
        });
      }

      return options;
    }()
  };
};

exports["default"] = _default;
