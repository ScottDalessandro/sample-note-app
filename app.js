const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
// const os = require('os');
const notes = require('./notes');
const titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: 't'
  }

const bodyOptions = {
    describe: "Body of the Note",
    demand: true,
    alias: 'b'
  }

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', "List all notes")
  .command("read", "Read a note", {
    title: titleOptions
  })
  .command("remove", "Remove a Note", {
    title: titleOptions
  })
  .help()
  .argv;

var command = argv._[0];

switch(command) {
  case "add":
    if(argv.title && argv.body){      
      notes.addNote(argv.title, argv.body, (err, note) => {
        if(err) throw err;
        console.log(note.title + " saved");
      });    
     break;
    }            
  case "list":    
    notes.getAll((notes) => {      
      notes.forEach((note) => {
        console.log(note);
      });
    });
    break;
  case "read":    
    notes.getNote(argv.title, (note) => {
      if(note) console.log(note);
      else console.log(`${argv.title} not found`);
    });
    break;
  case "remove":
    notes.removeNote(argv.title, (err,msg) => {
      if(err) throw err;
      console.log(msg);
    });
    break;
  case undefined:    
    console.log('No argument');
    break;
  default: 
    console.log("Not recognized");
}









