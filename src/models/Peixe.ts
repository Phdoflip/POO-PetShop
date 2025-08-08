// Peixe.ts
import { Animal } from "./Animal";

export class Peixe extends Animal {
  #tipoAgua: string;
  #tamanhoAquario: number;

  constructor(
    nome: string,
    idade: number,
    peso: number,
    tutor: string,
    tipoAgua: string,
    tamanhoAquario: number
  ) {
    super(nome, idade, peso, tutor);
    this.#tipoAgua = tipoAgua;
    this.#tamanhoAquario = tamanhoAquario;
  }

  getTipoAgua(): string {
    return this.#tipoAgua;
  }

  getTamanhoAquario(): number {
    return this.#tamanhoAquario;
  }

  setTamanhoAquario(tamanho: number): void {
    this.#tamanhoAquario = tamanho;
  }

  recomendarLimpezaAquario(): string {
    if (this.#tamanhoAquario < 40) {
      return "Recomenda-se limpar o aquário a cada semana.";
    }
    return "Recomenda-se limpar o aquário a cada duas semanas.";
  }
}
