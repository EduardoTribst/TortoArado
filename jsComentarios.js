window.onload(carregarComentarios())

function criarComentario() {
    var usuario = document.getElementById("user").value;
    var comentario = document.getElementById("textAreaComentario").value;

    if (usuario == "Rodrigo" || usuario == "rodrigo" || usuario == "Suess" || usuario == "Rodrigo Suess") {
        // colocar imagem do rodrigo

    }

    if (usuario != "" && comentario != "") {
        // post da imagem

        carregarComentarios();
    }
    else {
        alert("preencha todos os campos");
    }
}

function carregarComentarios() {

}
