import { Cronometro } from "./Cronometro.js";

export class Visualizacao {
    _cronometro = new Cronometro();
    _totalDeMinutosCorridos;
    _horaInicial;
    _tempoCorrido;
    _pararCronometro = false;
    _cobrancaInicial = 0.90;
    _cobrancaIncremento = 0.90;
    _totalDaCobranca;

    mostrarCronometro() {
        this._horaInicial = this._mostrarHoraAtual();

        const intervalo = setInterval(() => {
            if (this._pararCronometro) {
                clearInterval(intervalo);
            }

            this._cronometro.cronometrar();

            this._tempoCorrido = this._mostrarTempoCorrido(this._cronometro.hora(), this._cronometro.minutos(), this._cronometro.segundos(), ".cronometro");

            this._totalDaCobranca = this._mostrarCobranca(this._cronometro.minutosCorridos());


        }, 1000)
    }

    _mostrarCobranca(minutosCorridos) {
        let calculoDaCobranca = this._cobrancaInicial + (this._cobrancaIncremento * minutosCorridos);
        let valorEditado = String(calculoDaCobranca.toFixed(2));
        valorEditado = valorEditado.replace('.', ',');
        $(".total").text(`R$ ${valorEditado}`);
        return valorEditado;
    }

    _mostrarTempoCorrido(hora, minuto, segundo, seletor) {
        let horaString = `0${hora}`;
        let minutosString = `0${minuto}`;
        let segundosString = `0${segundo}`;

        if (hora > 9) horaString = hora;
        if (minuto > 9) minutosString = minuto;
        if (segundo > 9) segundosString = segundo;

        let cronometroAtual = `${horaString}:${minutosString}:${segundosString}`

        $(seletor).text(cronometroAtual);

        return cronometroAtual;
    }

    _mostrarHoraAtual() {
        const data = new Date();
        const hora = data.getHours();
        const minuto = data.getMinutes();
        const segundo = data.getSeconds();

        return this._mostrarTempoCorrido(hora, minuto, segundo, ".hora-atual");
    }

    mostrarRelatorio() {
        this._pararCronometro = true;
        $(".painel").addClass("esconder");
        $(".relatorio").removeClass("esconder");

        $(".inicio").text(`Início: ${this._horaInicial}`);
        $(".fim").text(`Fim: ${this._mostrarHoraAtual()}`);
        $(".tempo-percorrido").text(`${this._tempoCorrido}`);
        $(".valor").text(`R$ ${this._totalDaCobranca}`);
    }
}