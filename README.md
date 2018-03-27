# gatsby-source-thirdparty

A gatsby source plugin for pulling in third party api data.

## Features

* Pulls data from configured api url
* Uses custom name to allow for multiple instances of plugin
* Option to download the json data to a configurable path
* Option to only download the json data, and skip inserting it into GraphQL
* Supports simple authentication through axios

## Install

`npm install --save gatsby-plugin-thirdparty`

## How to use

```javascript
// Place configuration options in your gatsby-config.js

plugins: [
  {
    resolve: 'gatsby-source-thirdparty',
    options: {
      // The url, this should be the endpoint you are attempting to pull data from
      url: `http://yourapi.com/api/v1/posts`,

      // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
      // using this name. i.e. posts.json
      name: `posts`,

      // Optional simple authentication
      auth: {
        username: 'myusername',
        password: 'supersecretpassword1234'
      },

      // Optional payload key name if your api returns your payload in a different key
      // Default will use the full response from the http request of the url
      payloadKey: `body`,

      // Optionally save the JSON data to a file locally
      // Default is false
      localSave: true,

      //  Required folder path where the data should be saved if using localSave option
      //  This folder must already exist
      path: `${__dirname}/src/data/auth/`

      // Optionally include some output when building
      // Default is false
      verboseOutput: true, // For debugging purposes

      // Optionally skip creating nodes in graphQL.  Use this if you only want
      // The data to be saved locally
      // Default is false
      skipCreateNode: true, // skip import to graphQL, only use if localSave is all you want
    }
  }
];

```

## How to query

Data will be available at the following points in GraphQL.

`allThirdPartyName` or `thirdPartyName` where `Name` is replaced by the name entered in the
configuration options.

### Conflicting keys

Some of the returned keys may be transformed if they conflict with restricted keys used for
GraphQL such as the following `['id', 'children', 'parent', 'fields', 'internal']`

These conflicting keys will now show up as `thirdParty_id`
