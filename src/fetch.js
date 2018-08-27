const axios = require(`axios`)
const fs = require('fs')
const get = require('lodash/get');
const stringify = require(`json-stringify-safe`)
const httpExceptionHandler = require(`./http-exception-handler`)
const chalk = require('chalk')
const log = console.log

async function fetch({
  url,
  name,
  localSave,
  path,
  payloadKey,
  auth,
  verbose,
  reporter
}) {

  let allRoutes

  // Attempt to download the data from api
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
    httpExceptionHandler(e, reporter)
  }

  if(allRoutes) {
    // console.log(`allRoutes: `, allRoutes.data);

    // Create a local save of the json data in the user selected path
    if(localSave) {
      try {
        fs.writeFileSync(`${path}${name}.json`, stringify(allRoutes.data, null, 2))
      } catch(err) {
        reporter.panic(`Plugin ThirdParty could not save the file.  Please make sure the folder structure is already in place.`, err)
      }

      if(verbose) {
        log(chalk`{bgCyan ThirdParty} ${name}.json was saved locally to ${path}`)
      }
    }

    // Return just the intended data
    if(payloadKey) {
      return get(allRoutes.data, `${payloadKey}`)
    }
    return allRoutes.data
  }
}

module.exports = fetch
