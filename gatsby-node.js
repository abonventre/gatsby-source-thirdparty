"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var crypto = require("crypto");
var stringify = require("json-stringify-safe");
var fetch = require("./fetch");
var normalize = require("./normalize");

var typePrefix = "thirdParty__";

exports.sourceNodes = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
    var boundActionCreators = _ref2.boundActionCreators,
        createNodeId = _ref2.createNodeId;
    var url = _ref3.url,
        _ref3$idField = _ref3.idField,
        idField = _ref3$idField === undefined ? "id" : _ref3$idField,
        _ref3$localSave = _ref3.localSave,
        localSave = _ref3$localSave === undefined ? false : _ref3$localSave,
        path = _ref3.path,
        payloadKey = _ref3.payloadKey,
        name = _ref3.name;
    var createNode, entityType, entities;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createNode = boundActionCreators.createNode;
            entityType = "" + typePrefix + name;
            // console.log(`entityType: ${entityType}`);

            _context.next = 4;
            return fetch({ url: url, name: name, localSave: localSave, path: path, payloadKey: payloadKey });

          case 4:
            entities = _context.sent;


            if (!Array.isArray(entities)) {
              entities = [entities];
            }

            // console.log(`save: `, localSave);
            // console.log(`entities: `, entities.data);

            entities = normalize.createEntityType(entityType, entities);
            entities = normalize.createGatsbyIds(createNodeId, idField, entities);

            normalize.createNodesFromEntities({ entities: entities, createNode: createNode });

            // We're done, return.
            return _context.abrupt("return");

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();