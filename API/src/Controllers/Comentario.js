import { openDB } from "../configDB.js";   


export async function InsertComentario(){}

export async function CreateTableComentario() {
    openDB().then(db => {
        db.exec(`
            CREATE TABLE IF NOT EXISTS Comentario (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                postId INTEGER NOT NULL,
                conteudo TEXT NOT NULL,
                autor TEXT NOT NULL,
                FOREIGN KEY (postId) REFERENCES Post(id)
            )
        `).then(() => {
            console.log("Comentarios table created successfully.");
        }).catch(err => {
            console.error("Error creating comentarios table:", err);
        });
    });
}