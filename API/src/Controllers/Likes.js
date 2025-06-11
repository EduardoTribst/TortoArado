import { openDB } from "../configDB.js";

export async function DiminuirLike(idPost) {
    return openDB().then(db => {
        db.run("UPDATE LikesPost SET quantidade = quantidade - 1 WHERE postId = ?", idPost);
    });
}

export async function InserirLike(idPost) {
    return openDB().then(db => {
        db.run(`
  INSERT INTO LikesPost (postId, quantidade)
  VALUES (?, 1)
  ON CONFLICT(postId)
  DO UPDATE SET quantidade = quantidade + 1;
`, idPost)
    })
}

export async function SelecionarQuantidadeLikes(idPost) {
    return openDB().then(db => {
        return db.get("SELECT quantidade FROM LikesPost WHERE postId = ?", idPost)
            .then(res => res ? res.quantidade : 0);
    });
}

export async function CreateTableLike() {
    openDB().then(db => {
        db.exec(`
        CREATE TABLE IF NOT EXISTS LikesPost (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER NOT NULL UNIQUE,
        quantidade INTEGER NOT NULL,
        FOREIGN KEY (postId) REFERENCES Post(id)
      )
    `);
    });
}