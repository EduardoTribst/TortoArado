quantos = 0
function Clicou() {
    if (quantos > 30){
        valor = Math.floor(Math.random() * 101);
        if (valor == 100){
            document.getElementById("foto").src = "Imagens/rodrigoLendaria.jpg"; //Foto épica
            
        }
        else if (valor > 97){
            document.getElementById("foto").src = "Imagens/rodrigoCromatico.jfif";
            
        }
        else if (valor > 90){
            document.getElementById("foto").src = "Imagens/rodrigoMitico.jfif";
            
        }
        else if (valor > 80){
            document.getElementById("foto").src = "Imagens/rodrigoEpico.jfif";
            
        }
        else if (valor > 65){
            document.getElementById("foto").src = "Imagens/rodrigo.jfif";
            
        }
        else if (valor > 40){
            document.getElementById("foto").src = "Imagens/rodrigo.jfif";
            
        }
        else if (valor > 5){
            document.getElementById("foto").src = "Imagens/rodrigo.jfif";
            
        }
        else if (valor > 0){
            document.getElementById("foto").src = "Imagens/noobPerdeuGamble.jfif";
            
        }
    }
    if (quantos % 2 == 1){
        document.getElementById("foto").src = "Imagens/ItamarVieiraJunior.jpg";
    }

    
    quantos ++
}
