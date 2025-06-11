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
                    <button class="botaoVoto upvote" id="btnUpvotePost${comentario.id}" aria-label="Upvote">▲</button>

                    <div class="contagemVoto" id="totalCountPost${comentario.id}">0</div>

                    <button class="botaoVoto downvote" id="btnDownVotePost${comentario.id}" aria-label="Downvote">▼</button>
                </div>
            </div>
            `
    });
}
