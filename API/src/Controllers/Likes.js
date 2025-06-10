import { openDB } from "../configDB.js";

export async function DiminuirLike(idPost){
    return openDB().then(db => {
        db.run("UPDATE Post SET quantidade = quantidade - 1 WHERE id = ?", idPost);
    });
}

export async function InserirLike(idPost) {
    return openDB().then(db => {
        db.run(`
  INSERT INTO Likes (postId, quantidade)
  VALUES (?, 1)
  ON CONFLICT(postId)
  DO UPDATE SET quantidade = quantidade + 1;
`)
    })
}

export async function SelecionarQuantidadeLikes(idPost) {
    return openDB().then(db => {
        return db.get("SELECT quantidade FROM Likes WHERE postId = ?", idPost)
            .then(res => res ? res.quantidade : 0);
    });
}

export async function CreateTableLike() {
    openDB().then(db => {
        db.exec("CREATE TABLE IF NOT EXISTS Likes (\
            id INTEGER PRIMARY KEY AUTOINCREMENT,\
            postId INTEGER NOT NULL,\
            quantidade INTEGER NOT NULL,\
            FOREIGN KEY (postId) REFERENCES Post(id)\
        )").then(() => {
            console.log("Likes table created successfully.");
        }).catch(err => {
            console.error("Error creating likes table:", err);
        });
    })
}