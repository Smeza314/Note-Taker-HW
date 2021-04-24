const router = require('express').Router()
const fs = require('fs')
const path = require('path')

router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, db) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(db))
  })
})

router.post('/notes', (req, res) => {
  let noteId = Date.now() * Math.floor(Math.random() * 10)
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, db) => {
    if (err) { console.log(err) }

    let newNote = {
      id: noteId,
      title: req.body.title,
      text: req.body.text
    }
    let noteDB = JSON.parse(db)
    noteDB.push(newNote)

    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(noteDB), err => {
      if(err) { console.log(err) }

      res.json(req.body)
    })
  })    
})

router.delete('notes/:id', (req, res) => {
  let id = req.params.id 
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, db) => {
    if (err) { console.log(err) }

    let noteDB = JSON.parse(db)
    let newNoteDb = []
    noteDB.forEach(elem => {
      if(parseInt(elem.id) !== parseInt(id)) {
        newNoteDb.push(elem)
      }
    })

    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(newNoteDb), err => {
      if (err) { console.log(err) }

      res.sendStatus(200)
    })
  })
})

module.exports = router