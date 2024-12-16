const fs = require('fs/promises')
const path = require('path')
const { buffer } = require('stream/consumers')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')


async function addNote (title) {
     // const notes = require('./db.json')
    // const notes = Buffer.from(buffer).toString('utf-8')
   
    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)
    
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added'))
}



async function getNotes() {
     const notes = await fs.readFile(notesPath, {encoding: 'utf-8'} )
     
     return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    
    const  notes = await getNotes()
    console.log(chalk.bgBlue('Notes list'))

    notes.forEach(note => {
        console.log(chalk.blue('title: '+note.title, ' id: '+note.id))
    });
}


async function noteRemove(id) {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    const arrnotes = JSON.parse(notes);
    const newnotes = arrnotes.filter((note) => note.id !== id);
    await fs.writeFile("./db.json", JSON.stringify(newnotes));
    // return Array.isArray(arrnotes) ? newArrayNotes : [];
  }

  async function updateNote(id, newtitle) {
    const notes = await getNotes();
  
    notes.forEach((note) => {
    if(note.id === id){
        note.title = newtitle
    }
    
  });
    await fs.writeFile("./db.json", JSON.stringify(notes));
    // return Array.isArray(arrnotes) ? newArrayNotes : [];
  }



module.exports = {
    addNote, printNotes, getNotes, noteRemove, updateNote
}