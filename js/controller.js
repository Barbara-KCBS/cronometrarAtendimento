const $ = require('jQuery');
const {remote} = require('electron');
import { Atendimento } from "./recursos/Atendimento.js";

const atendimento = new Atendimento();

$(".iniciar-cronometro").on("click", () => {
    if (!atendimento.iniciouAtendimento()) {
        atendimento.iniciar();
    } else {
        atendimento.reiniciar();
    }
})

$(".finalizar-atendimento").on("click", () => {
    if(atendimento.iniciouAtendimento()){
        atendimento.finalizar();
    }
});


$(".closeApp").on("click", ()=>{
    let confirmacao = confirm("Tem certeza de que deseja fechar?");
    if(confirmacao){
        close();
    } else {
        return
    }
});

$(".restart").on("click", ()=>{
    atendimento.reiniciar();
})











