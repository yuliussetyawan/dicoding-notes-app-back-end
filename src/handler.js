// npm install nanoid@3.x.x
const { nanoid } = require('nanoid')
const notes = require('./notes')

const addNoteHandler = (request, h) => {
  // mendapatkan body request di Hapi
  const { title, tags, body } = request.payload
  // Properti ID
  const id = nanoid(16)
  // createdAt & UpdatedAt ID
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt
  }

  notes.push(newNote)

  // menentukan apakah newNote sudah masuk ke dalam array notes?
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'catatan gagal ditambahkan'
  });
  response.code(500);
  return response;
}

// Objek literals bertujuan untuk memudahkan ekspor lebih dari satu nilai pada satu berkas JavaScript.
module.exports = { addNoteHandler }
