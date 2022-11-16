const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler } = require("./handler");

const routes = [
    {
        method: "POST",
        path: "/notes",
        handler: addNoteHandler,
    },
    // menampilkan notes di home
    {
        method: "GET",
        path: "/notes",
        handler: getAllNotesHandler,

    },
    // menampilkan notes setelah diklik
    {
        method: "GET",
        path: `/notes/{id}`,
        handler: getNoteByIdHandler,
    }
];

module.exports = routes;