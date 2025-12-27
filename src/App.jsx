import { useState } from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import './App.css'

function App() {
  const [notes, setNotes] = useState([]) //add ko lagi notes leko from form to disply only, setnotes le chai sadhai changeable value save garxaa 
  const [editingNote, setEditingNote] = useState(null)

  const addNote = (note) => {
    const newNote = {
      id: Date.now(),
      ...note,
      createdAt: new Date().toISOString()
    }
    setNotes([newNote, ...notes]) //... le cahai paialakao vaalue pania store garirakh paialoa jsato format ma testai vaneko, if new note chai apaaaxadi chaahinxa vaaney surue ma a.a..notes ani newnote
  }

  //map le read garxa, object ma fix data hunai vayera amap grn mildaina aonly araray mamilxa
  const updateNote = (id, updatedNote) => {
    setNotes(notes.map(note =>  
      note.id === id ? { ...note, ...updatedNote } : note
    ))
    setEditingNote(null)
  }

  //filter le j hamlai chaiyo tei return garxa, conditions jaba sammaa true hunxa teyti bela samma return garxa
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Notes App</h1>
      </header>

      <main className="main">
        <NoteForm
          key={editingNote?.id || 'new'}
          onSubmit={editingNote ? (note) => updateNote(editingNote.id, note) : addNote}
          editingNote={editingNote}
          onCancel={() => setEditingNote(null)}
        />
        
        <NoteList
          notes={notes}
          onEdit={setEditingNote}
          onDelete={deleteNote}
        />
      </main>
      <footer className="footer">
        <p>Notes App - No Backend Required</p>
      </footer>
    </div>
  )
}

export default App