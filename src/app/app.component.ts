import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corregido: styleUrls en plural
})
export class AppComponent implements OnInit {
  numerosBingo: number[] = [];
  numeroActual: number = 0;
  numerosSacados: number[] = []; // Números que han salido
  lineaHecha: boolean = false;

  boleto: number[] = []; // Boleto generado
  seleccionadas: number[] = []; // Índices de las celdas seleccionadas

  constructor() { }

  ngOnInit(): void {
    // Inicializar el arreglo de números del bingo (1 a 75)
    this.numerosBingo = Array.from({ length: 75 }, (_, i) => i + 1);
  }

  generarNumero(): void {

    do {
      this.numeroActual = Math.floor(Math.random() * 75) + 1;
    } while (this.numerosSacados.includes(this.numeroActual)); // Asegurarse de que no se repita


    const indice = this.numerosBingo.indexOf(this.numeroActual);
    if (indice !== -1) {
      this.numerosBingo.splice(indice, 1);
    }
    this.numerosSacados.push(this.numeroActual);
  }

  generarBoleto(): void {
    // Reiniciar selecciones y generar un nuevo boleto con 25 números únicos
    this.boleto = [];
    this.seleccionadas = [];
    this.lineaHecha = false;

    while (this.boleto.length < 25) {
      const numero = Math.floor(Math.random() * 75) + 1;
      if (!this.boleto.includes(numero)) {
        this.boleto.push(numero);
      }
    }
  }

  oscurecer(numero: number): void {
    //Comprobar el click
    if (!this.numerosSacados.includes(numero)) {
      alert('Este número no ha sido sacado todavía.');
      return;
    }
    // Marcar el número como seleccionado
    if (!this.seleccionadas.includes(numero)) {
      this.seleccionadas.push(numero);
    }

    // Verificar el bingo
    if (this.seleccionadas.length === 25) {
      alert('¡BINGO!');
    }

    // Verificar línea 
    if (this.linea() && !this.lineaHecha) {
      alert('¡Línea horizontal completada!');
      this.lineaHecha = true;
    }
  }

  linea(): boolean {
    // Comprobar cada fila del boleto
    for (let i = 0; i < 5; i++) {
      const inicioFila = i * 5; // Índice de inicio de la fila

      const fila: number[] = [];
      for (let j = 0; j < 5; j++) {
        fila.push(inicioFila*5 + j);
      }

      if (fila.every(num => this.seleccionadas.includes(this.boleto[num]))) {
        return true;
      }
    }
    return false;
  }
}
