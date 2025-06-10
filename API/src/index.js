import { openDB } from "./configDB.js";
import {CreateTable} from "./Controllers/Post.js";
import {CreateTableComentario} from "./Controllers/Comentario.js";
import express from "express";

const app = express();
app.use(express.json());

CreateTable();
CreateTableComentario();

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
}
);

openDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    }
)