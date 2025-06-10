import { openDB } from "./configDB.js";
import { SelectPost } from "./Controllers/Post.js";
import { InsertPost } from "./Controllers/Post.js";
import { InserirComentario } from "./Controllers/Comentario.js";
import { SelecionarComentarioPost } from "./Controllers/Comentario.js";
import { CreateTableComentario } from "./Controllers/Comentario.js";
import { CreateTableLike, SelecionarQuantidadeLikes } from "./Controllers/Likes.js";
import { InserirLike } from "./Controllers/Likes.js";
import { DiminuirLike } from "./Controllers/Likes.js";
import express from "express";

const app = express();
app.use(express.json());


app.patch("/Likes/Diminuir/:idPost", async (req, res) => {
    try{
        const idPost = req.params.idPost;
        await DiminuirLike(idPost);
        return res.status(200).send("Like removido com sucesso!");
    }catch (error) {
        return res.status(500).send("Erro ao remover like: " + error.message);
    }
})
app.post("/Likes/Adicionar/:idPost", async (req, res) => {
    try{
        const idPost = req.params.idPost;
        await InserirLike(idPost);
        return res.status(201).send("Like adicionado com sucesso!");
    }catch (error) {
        return res.status(500).send("Erro ao adicionar like: " + error.message);
    }
})

app.get("/Likes/Selecionar/:idPost", async (req, res) => {
    try{
        const idPost = req.params.idPost;
        const quantidadeLikes = await SelecionarQuantidadeLikes(idPost);
        return res.status(200).json({ quantidade: quantidadeLikes });
    }catch (error) {
        return res.status(500).send("Erro no servidor ao buscar quantidade de likes: " + error.message);
    }
})
//Comentario
app.get("/Comentario/Selecionar/:idPost", async (req, res) => {
    try {
        const idPost = req.params.idPost;
        const comentarios = await SelecionarComentarioPost(idPost);
        return res.status(200).json(comentarios);
    } catch (error) {
        return res.status(500).send("Erro no servidor ao buscar comentários: " + error.message);
    }
})

app.post("/Comentario/Criar", (req, res) => {
    try{
        var idPost = req.body.idPost;
        var conteudo = req.body.conteudo;
        var autor = req.body.autor;
        InserirComentario(idPost, conteudo, autor);
        return res.status(201).send("Comentário criado com sucesso!");
    }catch(error){
        return res.status(500).send("Erro na criação do comentário: " + error.message);
    }
})

app.get("/Comentario/Selecionar/:idPost", async (req, res) => {
    try {
        const idPost = req.params.idPost;
        const comentarios = await SelectComentarioPost(idPost);
        return res.status(200).json(comentarios);
    } catch (error) {
        return res.status(500).send("Erro no servidor ao buscar comentários: " + error.message);
    }
})

//Post
app.post("/Post/Criar",(req,res)=>{
    try{
        var titulo = req.body.titulo
        var conteudo = req.body.conteudo
        var autor = req.body.autor
        InsertPost(titulo, conteudo, autor)
        return res.status(201).send("Post criado com sucesso!");
    }catch(error){
        return res.status(500).send("erro na criação do post: " + error.message);
    }
})

app.get("/Post/Selecionar", async (req, res) => {
    try{
        var posts = await SelectPost()
        return res.status(200).json(posts)
    }catch(error){
        return res.status(500).send("Erro no servidor ao buscar posts: " + error.message);
    }
})

app.get("/", (req, res) => {
    res.send("Api aberta com sucesso!");
}
);

openDB();

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
    }
)