import { useState } from 'react'
import Note from './components/Note'




function App({notes}) {
  

  const list = notes.map(note => note.id)
  console.log(list)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <Note key={note.id} note = {note}></Note>)}
      </ul>
    </div>

    
  )
}

export default App
