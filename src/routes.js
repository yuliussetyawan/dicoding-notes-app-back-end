const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByHandlerId,
  deleteNoteByIdHandler
} = require('./handler')

const routes = [
  // MEMBUAT POST
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler
  },
  // MENAMPILKAN SEMUA NOTES DI HOME
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler
  },
  // MENAMPILKAN NOTES SETELAH DIKLIK
  {
    method: 'GET',
    path: `/notes/{id}`,
    handler: getNoteByIdHandler
  },
  // EDIT DATA
  {
    method: 'PUT',
    path: `/notes/{id}`,
    handler: editNoteByHandlerId
  },
  // Menghapus data
  {
    method: 'DELETE',
    path: `/notes/{id}`,
    handler: deleteNoteByIdHandler
  }
]

module.exports = routes
