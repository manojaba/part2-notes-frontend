import { useState } from 'react'
import Note from './components/Note'




function App(props) {
  

const[notes,setNotes] = useState(props.notes)
const[newNote,setNewNote] = useState('a new note...')
const[showAll,setShowAll] = useState(true)
const handleNoteInput = (event) => {
  console.log('newNote',newNote)
  console.log('targer value',event.target.value)
  setNewNote(event.target.value)
  
}



const addNote =(event) => {
  event.preventDefault()
  const noteObject = {
    content:newNote,
    id:String(notes.length + 1),
    important:Math.random() < 0.5
  }
  setNotes(notes.concat(noteObject))
  setNewNote('')
}

const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

const toggleShow = () => {
  showAll ? setShowAll(false) : setShowAll(true)
   
}

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note = {note}></Note>)}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteInput}/>
        <button type='submit'>save</button>
      </form>

      <button onClick={toggleShow}>{showAll ? 'show important' : 'show all'} </button>
    </div>

    
  )
}

export default App
