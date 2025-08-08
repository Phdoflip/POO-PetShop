import { Animal } from "./Animal";

export class Gato extends Animal {
  #raca: string;
  #pelagem: string;

  constructor(
    nome: string,
    idade: number,
    peso: number,
    tutor: string,
    raca: string,
    pelagem: string
  ) {
    super(nome, idade, peso, tutor);
    this.#raca = raca;
    this.#pelagem = pelagem;
  }

  getRaca(): string {
    return this.#raca;
  }

  getPelagem(): string {
    return this.#pelagem;
  }

  recomendarTosa(): string {
    if (this.#pelagem.toLowerCase() === "longa") {
      return "Recomenda-se tosar a cada 2 meses.";
    }
    return "Tosa não é necessária com frequência.";
  }
}
