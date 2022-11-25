function startClassification() {
    navigator.mediaDevices.getUserMedia({audio: true});
    console.log(ml5.version);
    classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/fL3WX_pZv/model.json", modelReady);
}
function modelReady() {
    classifier.classify(gotResults);
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        var randomNumberR = Math.floor(Math.random() * 255) + 1;
        var randomNumberG = Math.floor(Math.random() * 255) + 1;
        var randomNumberB = Math.floor(Math.random() * 255) + 1;
        document.getElementById("resultado_nome").innerHTML = "Posso ouvir:" + results[0].label;
        document.getElementById("resultado_precisão").innerHTML = "Precisão:" +(results[0].confidence * 100).toFixed(2) + "%";
        document.getElementById("resultado_nome").style.color = "rgb("+randomNumberB+", "+randomNumberG+", "+randomNumberR+")";
        document.getElementById("resultado_precisão").style.color = "rgb("+randomNumberB+", "+randomNumberG+", "+randomNumberR+")";
        imagem_1 = document.getElementById("ouvido");

        if (results[0].label == "Cachorro") {
            imagem_1.src = "https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png";
        }
        else if (results[0].label == "Gato") {
            imagem_1.src = "https://i.blogs.es/293d1f/gato-siames-2-/450_1000.jpeg";
        }
        else if (results[0].label == "Lobo") {
            imagem_1.src = "https://vozdoselementos.com.br/wp-content/uploads/2017/06/lobo.jpg";
        }
        else if (results[0].label == "Capivara") {
            imagem_1.src = "https://www.infoescola.com/wp-content/uploads/2008/05/capivara-104462285.jpg";
        }
        else if (results[0].label == "Background Noise"){
            imagem_1.src = "listen.gif";
        }
    }
}