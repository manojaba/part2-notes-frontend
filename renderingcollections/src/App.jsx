import { use, useEffect, useState } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'
import Notification from './components/Notifications'
import Notifications from './components/Notifications'
import Footer from './components/Footer'




function App(props) {
  

const[notes,setNotes] = useState([])
const[newNote,setNewNote] = useState(' ')
const[showAll,setShowAll] = useState(true)
const[errorMessage,setErrorMessage] = useState('some error happened')


useEffect(() => {
  console.log('effect')
  noteService.getAll()
  .then(data => {
    console.log('promise fullfiled')
    setNotes(data)
  })
},[])

console.log('render',notes.length,'notes')


const handleNoteInput = (event) => {
 
  setNewNote(event.target.value)
  
}


const toggleImportanceOf = (id) => {
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find( n => n.id === id)
  const changedNote = {...note,important: !note.important}
  noteService.update(id,changedNote)
  .then(data => setNotes(notes.map(note => note.id === id ? data : note)))
  .catch(error => {
    setErrorMessage(`the note ${note.content} doesnt exist in the server`)
    setTimeout(() => {
      setErrorMessage(null)
    },5000)
    setNotes(notes.filter(n => n.id !== id))
  })

}

 
const addNote =(event) => {
  event.preventDefault()
  const noteObject = {
    content:newNote,
    id:String(notes.length + 1),
    important:Math.random() < 0.5
  }
  noteService.create(noteObject)
      .then(data => {
        setNotes(notes.concat(data))
        setNewNote('')
      })
}

const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

const toggleShow = () => {
  showAll ? setShowAll(false) : setShowAll(true)
   
}

  return (
    <div>
      <h1>Notes</h1>
      <Notifications  message={errorMessage}/>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note = {note} toggleImportance={() => toggleImportanceOf(note.id)}></Note>)}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteInput}/>
        <button type='submit'>save</button>
      </form>

      <Footer/>
    </div>

    
  )
}

export default App
