export class Animal {
  #nome: string;
  #idade: number;
  #peso: number;
  #tutor: string;

  constructor(nome: string, idade: number, peso: number, tutor: string) {
    this.#nome = nome;
    this.#idade = idade;
    this.#peso = peso;
    this.#tutor = tutor;
  }

  getNome(): string {
    return this.#nome;
  }

  getIdade(): number {
    return this.#idade;
  }

  getPeso(): number {
    return this.#peso;
  }

  getTutor(): string {
    return this.#tutor;
  }

  setPeso(peso: number): void {
    if (peso > 0) {
      this.#peso = peso;
    } else {
      console.error("O peso deve ser maior que zero.");
    }
  }

  setIdade(idade: number): void {
    if (idade >= 0) {
      this.#idade = idade;
    } else {
      console.error("A idade não pode ser negativa.");
    }
  }
}
