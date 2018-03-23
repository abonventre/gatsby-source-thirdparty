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
      id = createNodeId('datum.test'),
      parent: null,
      children: [],
      test: datum.test
    }
    createNode(node);
  });

  // We're done, return.
  return;
};
