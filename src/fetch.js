const axios = require(`axios`)
const fs = require('fs')
const stringify = require(`json-stringify-safe`)
const httpExceptionHandler = require(`./http-exception-handler`)

async function fetch({
  url,
  name,
  localSave,
  path,
  payloadKey,
  auth
}) {
  console.log(url);

  let allRoutes

  try {
    let options = {
      method: `get`,
      url: url,
    }
    if(auth) {
      options.auth = auth
    }
    allRoutes = await axios(options)
  } catch (e) {
    httpExceptionHandler(e)
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
