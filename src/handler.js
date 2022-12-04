// npm install nanoid@3.x.x
const { nanoid } = require('nanoid');
const notes = require('./notes');

// MENAMBAHKAN NOTE
const addNoteHandler = (request, h) => {
  // mendapatkan body request di Hapi
  const { title, tags, body } = request.payload;
  // Properti ID
  const id = nanoid(16);
  // createdAt & UpdatedAt ID
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

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
    message: 'catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// MENAMPILKAN NOTES DI HALAMAN NOTE. parameter h, req tidak digunakan
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// MENAMPILKAN HASIL NOTE SETELAH DIKLIK
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params
  // dapatkan objek note dengan id tersebut dari objek array notes
  const note = notes.filter(n => n.id === id)[0]

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
  response.code(404)
  return response
}

// UPDATE NOTE
const editNoteByHandlerId = (request, h) => {
  const { id } = request.params
  // dapatkan data notes terbaru
  const { title, tags, body } = request.payload
  const updatedAt = new Date().toISOString()
  // const index = notes.findIndex((note)=> note.id === id);
  const index = notes.findIndex(note => {
    return note.id === id
  })

  // Bila note dengan id yang dicari ditemukan,
  // maka index akan bernilai array index dari objek catatan yang dicari
  if (index !== -1) {
    notes[index] = {
      // Spread operator digunakan untuk mempertahankan nilai notes[index] yang tidak perlu diubah
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal diperbarui, ID tidak ditemukan'
  })
  response.code(404)
  return response
}

// MENGHAPUS NOTE
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params
  // dapatkan index dari objek catatan sesuai dengan id yang didapat
  const index = notes.findIndex(note => note.id === id)

  if (index !== -1) {
    notes.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

// Objek literals bertujuan untuk memudahkan ekspor lebih dari satu nilai pada satu berkas JavaScript.
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByHandlerId,
  deleteNoteByIdHandler
}
