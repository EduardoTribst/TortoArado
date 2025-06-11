const urlBase = "https://tortoarado.onrender.com/"

window.onload = function () {
    carregarComentarios();
}

async function criarComentario() {
    var usuario = document.getElementById("user").value;
    var titulo = document.getElementById("titulo").value;
    var comentario = document.getElementById("textAreaComentario").value;

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

    if (comentarios.length == 0) {
        divComentarios.innerHTML = "<p>Nenhum comentário encontrado.</p>";
        return;
    }

    // ordena comentarios pela quantidade de votos
    var likesDeCadaPost = {};

    for (let comentario of comentarios) {
        const response = await fetch(urlBase + "Likes/Selecionar/" + comentario.id);
        if (!response.ok) {
            console.error("Erro ao buscar votos:", response.status);
            return;
        }

        const votos = await response.json();
        likesDeCadaPost[comentario.id] = votos.quantidade;
    }

    comentarios.sort((a, b) => {
        return likesDeCadaPost[b.id] - likesDeCadaPost[a.id];
    }
    );

    divComentarios.innerHTML = ""; // Limpa a lista antes de adicionar novos comentários

    comentarios.forEach(comentario => {

        // sorteia um numero aleatorio entre 0 e 4
        var numeroAleatorio = Math.floor(Math.random() * 5);

        var imagemAvatar = "Imagens/zazu.jpg"; // Imagem padrão

        switch (numeroAleatorio) {
            case 0:
                imagemAvatar = "Imagens/zazu.jpg";
                break;
            case 1:
                imagemAvatar = "Imagens/zazuBigode.jpg";
                break;
            case 2:
                imagemAvatar = "Imagens/zazuOlharDeMilJardas.png";
                break;
            case 3:
                imagemAvatar = "Imagens/zazuPlanta.jpg";
                break;
            case 4:
                imagemAvatar = "Imagens/zazuSol.png";
                break;
        }

        if (comentario.autor == "Rodrigo" || comentario.autor == "rodrigo" || comentario.autor == "Suess" || comentario.autor == "Rodrigo Suess") {
            imagemAvatar = "Imagens/rodrigo.jfif"; // Imagem do Rodrigo Suess
        }

        divComentarios.innerHTML += `
            <div class="comentario">
                <div class="avatarComentario">

                    <img src="${imagemAvatar}" alt="Avatar do usuário" class="avatarUsuario">

                    <h2>
                        <span class="nomeUsuario">${comentario.autor}</span>
                    </h2>
                </div>

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

            atualizarContagemVotos(comentario.id, document.getElementById("totalCountPost" + comentario.id));
    });
}

async function votar(idPost, voto) {
    var botaoUpvote = document.getElementById("btnUpvotePost" + idPost);
    var botaoDownvote = document.getElementById("btnDownvotePost" + idPost);

    // Verifica se o botão já está ativo
    if (botaoUpvote.classList.contains('ativoUpvote') && voto == true) {
        botaoUpvote.classList.toggle('ativoUpvote', false);
        // Cancela o upvote, subtrai um voto
        await votarComentario(idPost, false); // Remove o voto positivo
        await atualizarContagemVotos(idPost);
        return;
    } else if (botaoDownvote.classList.contains('ativoDownvote') && voto == false) {
        botaoDownvote.classList.toggle('ativoDownvote', false);
        // Cancela o downvote, soma um voto
        await votarComentario(idPost, true); // Remove o voto negativo
        await atualizarContagemVotos(idPost);
        return;
    }

    // Troca de voto
    if (voto == true) {
        if (botaoDownvote.classList.contains('ativoDownvote')) {
            botaoDownvote.classList.toggle('ativoDownvote', false);
            // Remove downvote antes de adicionar upvote
            await votarComentario(idPost, true);
        }
        botaoUpvote.classList.toggle('ativoUpvote', true);
    } else if (voto == false) {
        if (botaoUpvote.classList.contains('ativoUpvote')) {
            botaoUpvote.classList.toggle('ativoUpvote', false);
            // Remove upvote antes de adicionar downvote
            await votarComentario(idPost, false);
        }
        botaoDownvote.classList.toggle('ativoDownvote', true);
    }
    
    // Realiza a votação
    await votarComentario(idPost, voto);

    await atualizarContagemVotos(idPost);
}

async function votarComentario(idPost, voto) {
    if (voto == true) {
        await fetch(urlBase + "Likes/Adicionar/" + idPost, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    else if (voto == false) {
        var url = urlBase + "Likes/Diminuir/" + idPost
        await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

async function atualizarContagemVotos(idPost) {
    const response = await fetch(urlBase + "Likes/Selecionar/" + idPost);
    if (!response.ok) {
        console.error("Erro ao buscar votos:", response.status);
        return;
    }
    const votos = await response.json();
    var totalCount = document.getElementById("totalCountPost" + idPost);
    totalCount.innerHTML = votos.quantidade;
}
