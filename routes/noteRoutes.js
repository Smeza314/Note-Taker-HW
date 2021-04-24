const router = require('express').Router()
const { v4: uuidv4 } = require('uuid')
const { join } = require('path')
const fs = require('fs')

router.get('/notes', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, notes) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(notes))
  })
})

router.post('/notes', (req, res) => {
  let note = {
    id: uuidv4(),
    ...req.body
  }
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    let notes = JSON.parse(data)
    notes.push(note)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes),
      err => {
        if (err) { console.log(err) }
        res.json(note)
      })
  })
})

router.delete('/notes/:id', (req, res) => {
  let id = req.params.id
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    let notes = JSON.parse(data)
    notes = notes.filter(note => note.id !== id)
    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes),
      err => {
        if (err) { console.log(err) }
        res.sendStatus(200)
      })
  })
})
module.exports = router