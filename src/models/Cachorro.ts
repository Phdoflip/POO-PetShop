import { Animal } from "./Animal";

export class Cachorro extends Animal {
  #raca: string;
  #porte: string;

  constructor(
    nome: string,
    idade: number,
    peso: number,
    tutor: string,
    raca: string,
    porte: string
  ) {
    super(nome, idade, peso, tutor);
    this.#raca = raca;
    this.#porte = porte;
  }

  getRaca(): string {
    return this.#raca;
  }

  getPorte(): string {
    return this.#porte;
  }

  recomendarBanho(): string {
    if (this.#porte.toLowerCase() === "grande") {
      return "Recomenda-se banho a cada 15 dias.";
    }
    return "Recomenda-se banho semanal.";
  }
}
