const crypto = require(`crypto`)
const stringify = require(`json-stringify-safe`)
const fetch = require(`./fetch`)
const normalize = require(`./normalize`)

const typePrefix = `thirdParty__`

exports.sourceNodes = async ({
  boundActionCreators,
  createNodeId,
  reporter
}, {
  url,
  idField = `id`,
  localSave = false,
  skipCreateNode = false,
  path,
  auth = {},
  payloadKey,
  name,
  verboseOutput = false
}) => {
  const { createNode } = boundActionCreators;

  // If true, output some info as the plugin runs
  let verbose = verboseOutput

  // Create an entity type from prefix and name supplied by user
  let entityType = `${typePrefix}${name}`
  // console.log(`entityType: ${entityType}`);

  // Fetch the data
  let entities = await fetch({url, name, localSave, path, payloadKey, auth, verbose, reporter})

  // If entities is a single object, add to array to prevent issues with creating nodes
  if(entities && !Array.isArray(entities)) {
    entities = [entities]
  }

  // console.log(`save: `, localSave);
  // console.log(`entities: `, entities.data);

  // Skip node creation if the goal is to only download the data to json files
  if(skipCreateNode) {
    return
  }

  // Standardize and clean keys
  entities = normalize.standardizeKeys(entities)

  // Add entity type to each entity
  entities = normalize.createEntityType(entityType, entities)

  // Create a unique id for gatsby
  entities = normalize.createGatsbyIds(createNodeId, idField, entities, reporter)

  // Generate the nodes
  normalize.createNodesFromEntities({entities, createNode, reporter})

  // We're done, return.
  return
};
