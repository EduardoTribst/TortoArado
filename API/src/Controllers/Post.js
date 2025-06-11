import { openDB } from "../configDB.js";
import { InserirLike } from "./Likes.js";

export async function SelectPost() {
    return openDB().then(db=>{
        return db.all("SELECT * FROM Post")
        .then(res=>res)
    })
}

export async function InsertPost(titulo,conteudo,autor) {
    openDB().then(db => {
        db.run("INSERT INTO Post (titulo, conteudo, autor) VALUES (?, ?, ?)", titulo, conteudo,autor);
        db.run("INSERT INTO LikesPost (postId, quantidade) VALUES ((SELECT last_insert_rowid()), 0)")
    })
}

export  async function CreateTablePost(){
    openDB().then(db =>{
            db.exec(`
                CREATE TABLE IF NOT EXISTS Post (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    titulo TEXT NOT NULL,
                    conteudo TEXT NOT NULL,
                    autor TEXT NOT NULL
            )
            `).then(() => {
                console.log("Posts table created successfully.");
            }).catch(err => {
                console.error("Error creating posts table:", err);
            });
        });
}