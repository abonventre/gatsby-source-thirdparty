'use strict';

var fetch = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var url = _ref2.url,
        name = _ref2.name,
        localSave = _ref2.localSave,
        path = _ref2.path,
        payloadKey = _ref2.payloadKey,
        auth = _ref2.auth,
        verbose = _ref2.verbose,
        reporter = _ref2.reporter;
    var allRoutes, options;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            allRoutes = void 0;

            // Attempt to download the data from api

            _context.prev = 1;
            options = {
              method: 'get',
              url: url
            };

            if (auth) {
              options.auth = auth;
            }
            _context.next = 6;
            return axios(options);

          case 6:
            allRoutes = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](1);

            httpExceptionHandler(_context.t0, reporter);

          case 12:
            if (!allRoutes) {
              _context.next = 17;
              break;
            }

            // console.log(`allRoutes: `, allRoutes.data);

            // Create a local save of the json data in the user selected path
            if (localSave) {
              try {
                fs.writeFileSync('' + path + name + '.json', stringify(allRoutes.data, null, 2));
              } catch (err) {
                reporter.panic('Plugin ThirdParty could not save the file.  Please make sure the folder structure is already in place.', err);
              }

              if (verbose) {
                log(chalk(_templateObject, name, path));
              }
            }

            // Return just the intended data

            if (!payloadKey) {
              _context.next = 16;
              break;
            }

            return _context.abrupt('return', get(allRoutes.data, '' + payloadKey));

          case 16:
            return _context.abrupt('return', allRoutes.data);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 9]]);
  }));

  return function fetch(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _templateObject = _taggedTemplateLiteral(['{bgCyan ThirdParty} ', '.json was saved locally to ', ''], ['{bgCyan ThirdParty} ', '.json was saved locally to ', '']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axios = require('axios');
var fs = require('fs');
var get = require('lodash/get');
var stringify = require('json-stringify-safe');
var httpExceptionHandler = require('./http-exception-handler');
var chalk = require('chalk');
var log = console.log;

module.exports = fetch;