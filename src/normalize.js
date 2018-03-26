const crypto = require(`crypto`);
const stringify = require(`json-stringify-safe`);

const digest = str =>
  crypto
    .createHash(`md5`)
    .update(str)
    .digest(`hex`)

exports.createNodesFromEntities = ({entities, createNode}) => {
  entities.forEach(e => {
    // console.log(`e: ${JSON.stringify(e)}`);
    let { __type, ...entity } = e
    // console.log(`entity: `, entity);
    let node = {
      ...entity,
      parent: null,
      children: [],
      mediaType: 'application/json',
      internal: {
        type: e.__type,
        contentDigest: digest(JSON.stringify(e))
      }
    };
    // console.log(`node: `, node);
    createNode(node);
  })
}


exports.createGatsbyIds = (createNodeId, idField, entities) =>
  entities.map(e => {
    // console.log(`Create Id's`);
    e.id = createNodeId(`${e.__type}-${e[idField].toString()}`)
    return e
})

exports.createEntityType = (entityType, entities) =>
  entities.map(e => {
    // console.log(`Create Types`);
    e.__type = entityType
    return e
})
