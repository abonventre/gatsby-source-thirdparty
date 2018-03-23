const crypto = require(`crypto`);
const stringify = require(`json-stringify-safe`);

exports.sourceNodes = async ({ boundActionCreators, createNodeId  }) => {
  const { createNode } = boundActionCreators;
  // Create nodes here, generally by downloading data
  // from a remote API.
  const data = [
    {
      test: 'test1'
    },
    {
      test: 'test2'
    }
  ];

  // Process data into nodes.
  data.forEach(datum => {
    let node = {
      id: createNodeId('datum.test'),
      parent: null,
      children: [],
      mediaType: 'application/json',
      test: datum.test,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(datum))
        .digest(`hex`)
      }
    }
    createNode(node);
  });

  // We're done, return.
  return;
};
