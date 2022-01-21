export class Cronometro {
    _segundos = 0;
    _minutos = 0;
    _hora = 0;
    _minutosCorridos = 0;

    hora() {
        return this._hora;
    }

    minutos() {
        return this._minutos;
    }

    segundos() {
        return this._segundos;
    }

    cronometrar() {
        this._segundos++;
        if (this._segundos === 60) {
            this._segundos = 0;
            this._minutos++;
            this._minutosCorridos++;
        }
        if (this._minutos === 60) {
            this._minutos = 0;
            this._hora++;
        }
    }

    minutosCorridos() {
        return this._minutosCorridos;
    }
}