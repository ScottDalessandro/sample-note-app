const fs = require('fs');

var fetchNotes = (cb) => {
  
    fs.readFile('notes-data.json', (err, notesString) => {
      if(err){
        console.log(err);        
        return cb([]);
      }        
      cb(JSON.parse(notesString));
    });  
}

var saveNotes = (notes, done) => {
  
  fs.writeFile('notes-data.json', JSON.stringify(notes), (err, val) => {
    if(err) throw err;    
    done(err);
  });

}


var addNote = (title, body, doneCB) => {
  
  var note = {
    title,
    body
  };

  fetchNotes((notes) => {      
    var duplicateNotes = notes.filter((note) => note.title === title);
    if(duplicateNotes.length === 0){
      notes.push(note);
      saveNotes(notes, function(err) {
        doneCB(err, note);
      });
    }
  });  

};

var getAll = (doneCB) => {  
  fetchNotes((notes) => {
    doneCB(notes);
  })
}

var getNote = (title, doneCB) => {
  fetchNotes((notes) => {
    var note = notes.filter((note) => note.title === title)[0];
    doneCB(note);
  });
}

var removeNote = (title, doneCB) => {
  fetchNotes((notes) => {
    var keepNotes = notes.filter((note) => note.title !== title);
    saveNotes(keepNotes, function(err) {
      doneCB(err, keepNotes.length !== notes.length ? `${title} removed`: `${title} not found!`);      
    })
  })
}
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
}