const axios = require(`axios`)
const fs = require('fs')
const stringify = require(`json-stringify-safe`)

async function fetch({
  url,
  name,
  localSave,
  path,
  payloadKey
}) {
  console.log(url);

  let allRoutes

  try {
    let options = {
      method: `get`,
      url: url,
    }
    allRoutes = await axios(options)
  } catch (e) {
    console.log(`error: `, e)
  }

  if(allRoutes) {
    // console.log(`allRoutes: `, allRoutes.data);
    if(localSave) {
      fs.writeFileSync(`${path}${name}.json`, stringify(allRoutes.data, null, 2))
      // console.log(`saved`)
    }
    if(payloadKey) {
      return allRoutes.data[payloadKey]
    }
    return allRoutes.data
  }
}

module.exports = fetch
