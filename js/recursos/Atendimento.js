import { Visualizacao } from "./Visualizacao.js";


export class Atendimento {
    _visualizacao = new Visualizacao();
    _atendimentoIniciado = false;

    get iniciou() {
        return this._atendimentoIniciado;
    }

    iniciar() {
        $(".imgPlay").addClass("esconder");
        $(".imgStop").removeClass("esconder");
        this._visualizacao.mostrarCronometro();
        this._atendimentoIniciado = true;
    }

    finalizar() {
        let confirmacao = confirm("Tem certeza de que deseja finalizar o atendimento?");
        if (confirmacao) {
            this._visualizacao.mostrarRelatorio();
        } else {
            return;
        }
    }

    reiniciar() {
        let confirmacao = confirm("Tem certeza de que deseja reiniciar?");

        if (confirmacao) {
            $(".imgPlay").removeClass("esconder");
            $(".imgStop").addClass("esconder");
            document.location.reload();
            this._atendimentoIniciado = false;
        } else {
            return;
        }
    }
}