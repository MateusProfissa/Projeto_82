var canvas = document.getElementById("meu_canvas");
var ctx = canvas.getContext("2d");
var cor = "black";
var largura_linha = 2;
var mouse_event = "Vazio";
var ultima_posicao_x, ultima_posicao_y;

canvas.addEventListener("mousedown", mouse_pressionado);
function mouse_pressionado(e) {
    cor = document.getElementById("cor").value;
    largura_linha = document.getElementById("largura").value;

    mouse_event = "mouse_down";
}

canvas.addEventListener("mousemove", mouse_mexendo);
function mouse_mexendo(e) {
    var mouse_x = e.clientX - canvas.offsetLeft;
    var mouse_y = e.clientY - canvas.offsetTop;

    if (mouse_event=="mouse_down") {
        ctx.beginPath();
        ctx.strokeStyle = cor;
        ctx.lineWidth = largura_linha; 
        console.log("x =" + ultima_posicao_x + ", y =" + ultima_posicao_y);
        ctx.moveTo(ultima_posicao_x, ultima_posicao_y);
        console.log("x =" + mouse_x + ", y =" + mouse_y);
        ctx.lineTo(mouse_x, mouse_y);
        ctx.stroke();
        
    }

    ultima_posicao_x = mouse_x;
    ultima_posicao_y = mouse_y;

}

canvas.addEventListener("mouseup", mouse_despressionado);
function mouse_despressionado(e) {
    mouse_event = "mouse_up";
}

canvas.addEventListener("mouseleave", mouse_saindo);
function mouse_saindo(e) {
    mouse_event = "mouse_leave";
}

function limpar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
