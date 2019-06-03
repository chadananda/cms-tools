#!/usr/bin/env node
// @notepad/cms-tools
// should have commonjs interface with both update and read-only objects

const shell = require("shelljs")
const program = require('commander')
const path = require("path");
const fs = require('fs-sync')
const json = require('jsonfile')
const hash = require('hash.js')
const trim = require('trim-character')
const  { transliterate, slugify } = require('transliteration')
const stringSimilarity = require('string-similarity')
const JSON5 = require('json5')

var notepad_updater = {
  sync: notepad_sync,
  status: notepad_status,
  init: notepad_init
}


// *************************************
// *************************************
// CLI Interface -- sync (default), status, init
program
  .version('0.0.1')
  .action((cmd) => {
    if (cmd==='init') {
      console.log('notepad cms-tools init', '0.0.1')
      notepad_updater.init()
    }
    else if (cmd==='status') {
      console.log('notepad cms-tools status', '0.0.1')
      notepad_updater.status()
    }
    else { // sync
      console.log('notepad cms-tools sync', '0.0.1')
      notepad_updater.sync()
    }
  })
  .parse(process.argv)



// *************************************
// *************************************
function notepad_init() {
  // return 'notepad_sync'
  // we need prefix, apicode (public, read only), apikey (secret, server only)
  var email = require('git-user-email')
  console.log(email())
}

function notepad_sync() {
  // read config file
  let configFile = require('app-root-path').path + '/notepad.config.json5'
  if (fs.exists(configFile)) {
    // console.log(configFile)
    // console.log(fs.read(configFile))

    let config = JSON5.parse(fs.read(configFile))
    console.log(config)



  }



  // load document content for each collection
     // pull up db and compare each document, update whichever one is newer





  return 'notepad_sync'
}
function notepad_status() {
  return 'notepad_sync'
}
function notepad_reader() {
  return {
    get: () => {},
    set: () => {},
  }
}
















// *************************************
// *************************************
// export these two parts seperately so that we can use only the reader code in the browser
module.exports = {
  updater: notepad_updater,
  reader: notepad_reader
}