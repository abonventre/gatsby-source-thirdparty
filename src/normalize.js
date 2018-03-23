const crypto = require(`crypto`);
const stringify = require(`json-stringify-safe`);

const digest = str =>
  crypto
    .createHash(`md5`)
    .update(str)
    .digest(`hex`)

const typePrefix = `thirdParty`
