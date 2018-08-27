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
        createNodeId = _ref2.createNodeId,
        reporter = _ref2.reporter;
    var url = _ref3.url,
        _ref3$idField = _ref3.idField,
        idField = _ref3$idField === undefined ? "id" : _ref3$idField,
        _ref3$localSave = _ref3.localSave,
        localSave = _ref3$localSave === undefined ? false : _ref3$localSave,
        _ref3$skipCreateNode = _ref3.skipCreateNode,
        skipCreateNode = _ref3$skipCreateNode === undefined ? false : _ref3$skipCreateNode,
        path = _ref3.path,
        _ref3$auth = _ref3.auth,
        auth = _ref3$auth === undefined ? {} : _ref3$auth,
        payloadKey = _ref3.payloadKey,
        name = _ref3.name,
        _ref3$verboseOutput = _ref3.verboseOutput,
        verboseOutput = _ref3$verboseOutput === undefined ? false : _ref3$verboseOutput;
    var createNode, verbose, entityType, entities;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createNode = boundActionCreators.createNode;

            // If true, output some info as the plugin runs

            verbose = verboseOutput;

            // Create an entity type from prefix and name supplied by user

            entityType = "" + typePrefix + name;
            // console.log(`entityType: ${entityType}`);

            // Fetch the data

            _context.next = 5;
            return fetch({ url: url, name: name, localSave: localSave, path: path, payloadKey: payloadKey, auth: auth, verbose: verbose, reporter: reporter });

          case 5:
            entities = _context.sent;


            // If entities is a single object, add to array to prevent issues with creating nodes
            if (entities && !Array.isArray(entities)) {
              entities = [entities];
            }

            // console.log(`save: `, localSave);
            // console.log(`entities: `, entities.data);

            // Skip node creation if the goal is to only download the data to json files

            if (!skipCreateNode) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return");

          case 9:

            // Standardize and clean keys
            entities = normalize.standardizeKeys(entities);

            // Add entity type to each entity
            entities = normalize.createEntityType(entityType, entities);

            // Create a unique id for gatsby
            entities = normalize.createGatsbyIds(createNodeId, idField, entities, reporter);

            // Generate the nodes
            normalize.createNodesFromEntities({ entities: entities, createNode: createNode, reporter: reporter });

            // We're done, return.
            return _context.abrupt("return");

          case 14:
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