import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import { Loader2 } from 'lucide-react'
import './App.css'

const API_URL= `${import.meta.env.VITE_API_URL}/notes`

function App() {
  const [notes, setNotes] = useState([]) //add ko lagi notes leko from form to disply only, setnotes le chai sadhai changeable value save garxaa 
  const [editingNote, setEditingNote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      
      setNotes(data)

    } catch (error) {
      console.error('error fetching nots:', error || data.message)
    }
    finally {
      setLoading (false)
    }
  }

  //add note

    const addNote = async (note) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      })
      window.location.reload()
      const newNote = await response.json()
      setNotes([newNote, ...notes])
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  //map le read garxa, object ma fix data huni vayera map grn mildaina only araray ma milxa

     const updateNote = async (id, updatedNote) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNote),
      })
      const data = await response.json()
      setNotes(notes.map((note) => (note._id === id ? data : note)))
      setEditingNote(null)
    } catch (error) {
      console.error('Error updating note:', error)
    }
  }

  //filter le j hamlai chaiyo tei return garxa, conditions jaba sammaa true hunxa teyti bela samma return garxa
 /* const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  } */

      const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      setNotes(notes.filter((note) => note._id !== id)) //fetch gairakhni vanda ui batai filter gareko
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Notes App</h1>
      </header>

      <main className="main">
        <NoteForm
          key={editingNote?._id || 'new'}
          onSubmit={editingNote ? (note) => updateNote(editingNote._id, note) : addNote}
          editingNote={editingNote}
          onCancel={() => setEditingNote(null)}
        />
        {loading ? (
          <div className='loading'>
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : ( 

        <NoteList
          notes={notes}
          onEdit={setEditingNote}
          onDelete={deleteNote}
        />
      )}
      </main>
      <footer className="footer">
        <p>Notes App - No Backend Required</p>
      </footer>
    </div>
  )
}

export default App