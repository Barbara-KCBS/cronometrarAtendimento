export class Cronometro {
    _segundos = 0;
    _minutos = 0;
    _hora = 0;
    _minutosCorridos = 0;

    get hora() {
        return this._hora;
    }

    get minutos() {
        return this._minutos;
    }

    get segundos() {
        return this._segundos;
    }

    get minutosCorridos() {
        return this._minutosCorridos;
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
}