window.onbeforeunload = function(){
    return "";
}

let painel = $(".painel")
let horaAtual = $(".hora-atual");
let cronometro = $(".cronometro");
let totalAhCobrar = $(".total");
let inicio = $(".inicio");
let fim = $(".fim");
let tempoPercorrido = $(".tempo-percorrido");
let valor = $(".valor");
let relatorio = $(".relatorio");


let valorPorMinuto = 0.90;
let pararCronometro = false;
let cronometroPausado = false;
let totalAhCombrar = 15.00;
let hora = 0;
let minutos = 0;
let segundos = 0;  
let cronometroIniciado = false;
let cronometrando = false;
let cronometroAtual;
let tempoInicial;

function finalizarAtendimento(){

    if(!cronometrando){
        return
    }

    pararCronometro = true;
    painel.addClass("esconder");
    relatorio.removeClass("esconder");
    

    inicio.text(tempoInicial);
    fim.text(`Fim: ${capturarHoraAtual()}`);
    tempoPercorrido.text(`${cronometroAtual}`);
    valor.text(`R$ ${totalAhCombrar.toFixed(2)}`);
}

$(".iniciar-cronometro").on("click", () => {
    if(!cronometroIniciado){
        $(".iniciar-cronometro").text("Pause");
        pararCronometro = false;
        cronometrar();
    } else {
        $(".iniciar-cronometro").text("Play");
        pararCronometro = true;
        cronometroIniciado = false;
    }
});

$(".restart").on("click", () => {
    document.location.reload();
});

$(".finalizar-atendimento").on("click", finalizarAtendimento);


function capturarHoraAtual(){
    const data = new Date();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();
    
    let horaString = `0${hora}`;
    let minutosString = `0${minutos}`;
    let segundosString = `0${segundos}`;
    
    if(hora > 9) horaString = hora;
    if(minutos > 9) minutosString = minutos;
    if(segundos > 9) segundosString = segundos; 
    
    let painelDoTempo = `${horaString}:${minutosString}:${segundosString}`;
    horaAtual.text(painelDoTempo);
    return painelDoTempo;
}

function cronometrar(){
    const data = new Date();
    const horasIniciais = data.getHours();
    const minutosIniciais = data.getMinutes();
    const segundosIniciais = data.getSeconds();
    console.log(segundosIniciais)
    let minutosCorridos = 0;
    let horasCorridas = 0;

    if(!cronometrando){
        tempoInicial = `Início: ${capturarHoraAtual()}`; 
        horaAtual.text(tempoInicial);
    }
    
    cronometroIniciado = true;
    cronometrando = true;
    
    const intervalo = setInterval(() => {
        if(pararCronometro === true){
            clearInterval(intervalo);
            return 
        }

        let dataAtual = new Date();
        let segundosAtual = dataAtual.getSeconds();
    
        
        
        if(segundosAtual < segundosIniciais){
            segundosAtual = (60 + segundosAtual) - segundosIniciais;
        }
        else {
            let minutoAtual = dataAtual.getMinutes();
            if(minutoAtual < minutosIniciais){
                minutosCorridos = (60 + minutoAtual) - minutosIniciais;
            } else {
                let horaAtual = dataAtual.getHours();
                horasCorridas = horaAtual - horasIniciais;  
                minutosCorridos = minutoAtual - minutosIniciais;
            }
            segundosAtual = segundosAtual - segundosIniciais;
        }

        let horaString = `0${horasCorridas}`;
        let minutosString = `0${minutosCorridos}`;
        let segundosString = `0${segundosAtual}`;
        
        if(horasCorridas > 9) horaString = horasCorridas;
        if(minutosCorridos > 9) minutosString = minutosCorridos;
        if(segundosAtual > 9) segundosString = segundosAtual; 
 
        cronometroAtual = `${horaString}:${minutosString}:${segundosString}`
        
        cronometro.text(cronometroAtual);
        let totalDaCobranca = cobrancaInicial + (minutosCorridos*valorPorMinuto)
        let valorEditado = String(totalDaCobranca.toFixed(2));
        valorEditado = valorEditado.replace('.', ',');
        totalAhCobrar.text(`R$ ${valorEditado}`);
    
        
    }, 1000)
}

function finalizarAtendimento(){

    if(!cronometrando){
        return
    }

    pararCronometro = true;
    painel.addClass("esconder");
    relatorio.removeClass("esconder");
    relatorio.removeClass("mostrar");

    inicio.text(tempoInicial);
    fim.text(`Fim: ${capturarHoraAtual()}`);
    tempoPercorrido.text(`Tempo percorrido: ${cronometroAtual}`);
    valor.text(`Preço: ${totalAhCombrar.toFixed(2)}`);
}






