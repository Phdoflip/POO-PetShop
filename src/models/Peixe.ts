import { Animal } from "./Animal";

export class Peixe extends Animal {
  private tipoAgua: string;
  private tamanhoAquario: number;

  constructor(
    nome: string,
    idade: number,
    peso: number,
    tutor: string,
    tipoAgua: string,
    tamanhoAquario: number
  ) {
    super(nome, idade, peso, tutor);
    this.tipoAgua = tipoAgua;
    this.tamanhoAquario = tamanhoAquario;
  }

  recomendarLimpezaAquario() {
  return "Recomendação: limpar o aquário";
}
}
