import { Animal } from "./Animal";

export class Gato extends Animal {
  private raca: string;
  private pelagem: string;

  constructor(
    nome: string,
    idade: number,
    peso: number,
    tutor: string,
    raca: string,
    pelagem: string
  ) {
    super(nome, idade, peso, tutor);
    this.raca = raca;
    this.pelagem = pelagem;
  }

  recomendarTosa() {
    return "Recomendar tosa para o gato.";
  }
}
   
    