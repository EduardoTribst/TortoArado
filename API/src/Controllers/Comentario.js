import { openDB } from "../configDB.js";   

export async function SelecionarComentarioPost(idPost) {
    return openDB().then(db=>{
        return db.all("SELECT * FROM Comentario where postid = ?",idPost)
        .then(res=>res)
    })
}

export async function InserirComentario(idPost,conteudo,autor) {
    openDB().then(db => {
        db.run("INSERT INTO Comentario (postid, conteudo, autor) VALUES (?, ?, ?)", idPost, conteudo,autor);
    })
}

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