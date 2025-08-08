export class Cliente {
  #nome: string;
  #idade: string;
  #endereco: string;
  #cpf: string;

  constructor(nome: string, idade: string, endereco: string, cpf: string) {
    this.#nome = nome;
    this.#idade = idade;
    this.#endereco = endereco;
    this.#cpf = cpf;
  }

  getNome(): string {
    return this.#nome;
  }

  getIdade(): string {
    return this.#idade;
  }

  getEndereco(): string {
    return this.#endereco;
  }

  getCpf(): string {
    return this.#cpf;
  }

  setNome(nome: string): void {
    this.#nome = nome;
  }

  setIdade(idade: string): void {
    this.#idade = idade;
  }

  setEndereco(endereco: string): void {
    this.#endereco = endereco;
  }

  setCpf(cpf: string): void {
    this.#cpf = cpf;
  }
}
