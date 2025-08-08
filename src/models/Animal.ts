export abstract class Animal {
  protected nome: string;
  protected idade: number;
  protected peso: number;
  protected tutor: string;

  constructor(nome: string, idade: number, peso: number, tutor: string) {
    this.nome = nome;
    this.idade = idade;
    this.peso = peso;
    this.tutor = tutor;
  }

  getNome() {
    return this.nome;
  }

  getTutor() {
    return this.tutor;
  }
}
