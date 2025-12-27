import NoteCard from './NoteCard'
import './NoteList.css'

function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>No notes yet. Create your first note!</p>
      </div>
    )
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
       //components
       <NoteCard
       //props pass gaareko, key unique vayeko vayera id pathakoa key ma natra mathia index pathayeni hunxa , key helps to find where we click 
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default NoteList