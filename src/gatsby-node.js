const crypto = require(`crypto`)
const stringify = require(`json-stringify-safe`)
const fetch = require(`./fetch`)
const normalize = require(`./normalize`)

const typePrefix = `thirdParty__`

exports.sourceNodes = async ({
  boundActionCreators,
  createNodeId
}, {
  url,
  idField = `id`,
  localSave = false,
  path,
  payloadKey,
  name
}) => {
  const { createNode } = boundActionCreators;

  let entityType = `${typePrefix}${name}`
  // console.log(`entityType: ${entityType}`);
  
  let entities = await fetch({url, name, localSave, path, payloadKey})

  if(entities && !Array.isArray(entities)) {
    entities = [entities]
  }

  // console.log(`save: `, localSave);
  // console.log(`entities: `, entities.data);

  entities = normalize.createEntityType(entityType, entities)
  entities = normalize.createGatsbyIds(createNodeId, idField, entities)

  normalize.createNodesFromEntities({entities, createNode})

  // We're done, return.
  return;
};
