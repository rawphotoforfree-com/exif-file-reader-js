(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.exifFileReader = {}));
}(this, function (exports) { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

	function _typeof(obj) {
	  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return _typeof2(obj);
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var getPrototypeOf = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	var setPrototypeOf = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf(subClass, superClass);
	}

	var inherits = _inherits;

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	var isNativeFunction = _isNativeFunction;

	var construct = createCommonjsModule(function (module) {
	function isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct()) {
	    module.exports = _construct = Reflect.construct;
	  } else {
	    module.exports = _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) setPrototypeOf(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	module.exports = _construct;
	});

	var wrapNativeSuper = createCommonjsModule(function (module) {
	function _wrapNativeSuper(Class) {
	  var _cache = typeof Map === "function" ? new Map() : undefined;

	  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !isNativeFunction(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return construct(Class, arguments, getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return setPrototypeOf(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	module.exports = _wrapNativeSuper;
	});

	var UnSupportedFileError =
	/*#__PURE__*/
	function (_Error) {
	  inherits(UnSupportedFileError, _Error);

	  function UnSupportedFileError() {
	    var _getPrototypeOf2;

	    classCallCheck(this, UnSupportedFileError);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(UnSupportedFileError)).call.apply(_getPrototypeOf2, [this].concat(args)));
	  }

	  return UnSupportedFileError;
	}(wrapNativeSuper(Error));

	var supportedMimeTypes = ['image/jpg', 'image/jpeg'];
	/**
	 * @param {{EXIF}} exifReader
	 * @param {{FileReader}} FileReader
	 * @returns {{getExifData: (function(): Promise<any>)}}
	 */

	function ExifFileReader(exifReader) {
	  var FileReader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.FileReader;

	  /**
	   * @param {{File}} file
	   * @returns {Promise<any>}
	   */
	  function getExifData(file) {
	    return new Promise(function (resolve, reject) {
	      if (file instanceof File === false) {
	        reject(new TypeError('The file must be instance of File object!'));
	      }

	      if (supportedMimeTypes.indexOf(file.type) === -1) {
	        reject(new UnSupportedFileError("The file type \"".concat(file.type, "\" is not supported.")));
	      }

	      var fileReader = new FileReader();

	      fileReader.onload = function () {
	        try {
	          var exifData = readExif(fileReader.result);
	          resolve(exifData);
	        } catch (e) {
	          reject(new Error('Cannot read EXIF data properly for this file.'));
	        }
	      };

	      fileReader.readAsArrayBuffer(file);
	    });
	  }
	  /**
	   * @param {{ArrayBuffer}} arrayBuffer
	   * @returns {null|Object}
	   */


	  function readExif(arrayBuffer) {
	    var exifData = exifReader.readFromBinaryFile(arrayBuffer);

	    if (exifData === false) {
	      throw new Error('Read EXIF data failed');
	    }

	    if (isExifEmpty(exifData)) {
	      return null;
	    }

	    return exifData;
	  }
	  /**
	   * @param exifData
	   * @returns {boolean}
	   */


	  function isExifEmpty(exifData) {
	    return exifData === null || _typeof_1(exifData) === 'object' && Object.keys(exifData).length === 0;
	  }

	  return {
	    getExifData: getExifData
	  };
	}

	exports.ExifFileReader = ExifFileReader;
	exports.supportedMimeTypes = supportedMimeTypes;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
