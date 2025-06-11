const urlBase = "https://tortoarado.onrender.com/"

window.onload = function () {
    carregarComentarios();
}

async function criarComentario() {
    var usuario = document.getElementById("user").value;
    var titulo = document.getElementById("titulo").value;
    var comentario = document.getElementById("textAreaComentario").value;

    if (usuario == "Rodrigo" || usuario == "rodrigo" || usuario == "Suess" || usuario == "Rodrigo Suess") {
        // colocar imagem do rodrigo

    }

    if (usuario != "" && comentario != "" && titulo != "") {
        var comentarioObj = {
            autor: usuario,
            titulo: titulo,
            conteudo: comentario
        };  

        await fetch(urlBase + "Post/Criar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comentarioObj)
        })

        carregarComentarios();
    }
    else {
        alert("preencha todos os campos");
    }
}

async function carregarComentarios() {
    const response = await fetch(urlBase + "Post/Selecionar");
    const comentarios = await response.json();



    var divComentarios = document.getElementById("divComentarios");
    divComentarios.innerHTML = ""; // Limpa a lista antes de adicionar novos comentários

    comentarios.forEach(comentario => {

        atualizarContagemVotos(comentario.id, document.getElementById("totalCountPost" + comentario.id));

        divComentarios.innerHTML += `
            <div class="comentario">
                <h2>
                    <span class="nomeUsuario">${comentario.autor}</span>
                </h2>

                <div class="corpoComentario">
                    <h3>
                        <span class="tituloComentario">${comentario.titulo}</span>
                    </h3>

                    <p class="textoComentario">
                        ${comentario.conteudo}
                    </p>
                </div>
                
                <div class="likesPost">
                    <button class="botaoVoto upvote" id="btnUpvotePost${comentario.id}" aria-label="Upvote" onclick="votar(${comentario.id}, true)">▲</button>

                    <div class="contagemVoto" id="totalCountPost${comentario.id}">0</div>

                    <button class="botaoVoto downvote" id="btnDownvotePost${comentario.id}" aria-label="Downvote" onclick="votar(${comentario.id}, false)">▼</button>
                </div>
            </div>
            `
    });
}

async function votar(idPost, voto) {
    var botaoUpvote = document.getElementById("btnUpvotePost" + idPost);
    var botaoDownvote = document.getElementById("btnDownvotePost" + idPost);
    
    // apenas um voto por vez
    if (voto == true) {
        botaoUpvote.classList.toggle('ativoUpvote', true);
        botaoDownvote.classList.toggle('ativoDownvote', false);
    } else if (voto == false) {
        botaoUpvote.classList.toggle('ativoUpvote', false);
        botaoDownvote.classList.toggle('ativoDownvote', true);
    }
    

    if (voto == true) {
        await fetch(urlBase + "Likes/Adicionar/:" + idPost, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    else if (voto == false) {
        await fetch(urlBase + "Likes/Diminuir/:" + idPost, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    await atualizarContagemVotos(idPost);
}

async function atualizarContagemVotos(idPost) {
    const response = await fetch(urlBase + "Likes/Selecionar/:" + idPost);
    const votos = await response.json();
    var totalCount = document.getElementById("totalCountPost" + idPost);
    totalCount.innerHTML = votos.quantidade;
}
