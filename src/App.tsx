import React, { useState } from "react";
import { Gato } from "./models/Gato";
import { Cachorro } from "./models/Cachorro";
import { Peixe } from "./models/Peixe";
import { Animal } from "./models/Animal";
import "./App.css";

type ClienteData = {
  nome: string;
  idade: string;
  cpf: string;
  endereco: string;
};

type AnimalFormData = {
  nome: string;
  idade: string;
  peso: string;
  raca?: string;
  pelagem?: string;
  porte?: string;
  tipoAgua?: string;
  tamanhoAquario?: string;
};

type Errors = {
  [key: string]: string;
};

const fallingEmojis = ["🐈", "🐶", "🐟"];

function FallingEmoji() {
  const emojis = Array.from({ length: 15 }).map((_, i) => {
    const emoji = fallingEmojis[i % fallingEmojis.length];
    const left = Math.random() * 100; // horizontal em %
    const delay = Math.random() * 15; // delay em segundos
    const duration = 10 + Math.random() * 7; // duração entre 10 e 17 segundos
    const size = 20 + Math.random() * 25; // tamanho em px

    return (
      <span
        key={i}
        className="falling-emoji"
        style={{
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          fontSize: `${size}px`,
        }}
      >
        {emoji}
      </span>
    );
  });

  return <>{emojis}</>;
}

export default function App() {
  // Estados principais
  const [mostrarFormCliente, setMostrarFormCliente] = useState<boolean>(false);
  const [cliente, setCliente] = useState<ClienteData | null>(null);
  const [animalEscolhido, setAnimalEscolhido] = useState<string | null>(null);
  const [animais, setAnimais] = useState<Animal[]>([
    new Gato("Mimi", 2, 4, "Lucas", "Persa", "Longa"),
    new Cachorro("Rex", 5, 15, "Carla", "Labrador", "Grande"),
    new Peixe("Nemo", 1, 0.2, "Marcos", "Água salgada", 50),
  ]);

  const [formCliente, setFormCliente] = useState<ClienteData>({
    nome: "",
    idade: "",
    cpf: "",
    endereco: "",
  });
  const [errorsCliente, setErrorsCliente] = useState<Errors>({});

  const [formAnimal, setFormAnimal] = useState<AnimalFormData>({
    nome: "",
    idade: "",
    peso: "",
    raca: "",
    pelagem: "",
    porte: "",
    tipoAgua: "",
    tamanhoAquario: "",
  });
  const [errorsAnimal, setErrorsAnimal] = useState<Errors>({});

  // Validações
  function validarCliente(data: ClienteData) {
    const errs: Errors = {};
    if (!data.nome.trim()) errs.nome = "Nome é obrigatório.";
    if (!data.idade || Number(data.idade) < 0)
      errs.idade = "Idade deve ser maior ou igual a zero.";
    if (!data.cpf.trim()) errs.cpf = "CPF é obrigatório.";
    if (!data.endereco.trim()) errs.endereco = "Endereço é obrigatório.";
    return errs;
  }

  function validarAnimal(data: AnimalFormData, tipo: string) {
    const errs: Errors = {};
    if (!data.nome?.trim()) errs.nome = "Nome é obrigatório.";
    if (!data.idade || Number(data.idade) < 0)
      errs.idade = "Idade deve ser maior ou igual a zero.";
    if (!data.peso || Number(data.peso) <= 0)
      errs.peso = "Peso deve ser maior que zero.";

    if (tipo === "Gato") {
      if (!data.raca?.trim()) errs.raca = "Raça é obrigatória.";
      if (!data.pelagem?.trim()) errs.pelagem = "Pelagem é obrigatória.";
    }
    if (tipo === "Cachorro") {
      if (!data.raca?.trim()) errs.raca = "Raça é obrigatória.";
      if (!data.porte?.trim()) errs.porte = "Porte é obrigatório.";
    }
    if (tipo === "Peixe") {
      if (!data.tipoAgua?.trim()) errs.tipoAgua = "Tipo de água é obrigatório.";
      if (!data.tamanhoAquario || Number(data.tamanhoAquario) <= 0)
        errs.tamanhoAquario = "Tamanho do aquário deve ser maior que zero.";
    }
    return errs;
  }

  // Handlers Cliente
  function handleChangeCliente(e: React.ChangeEvent<HTMLInputElement>) {
    setFormCliente({ ...formCliente, [e.target.name]: e.target.value });
  }

  function handleSubmitCliente(e: React.FormEvent) {
    e.preventDefault();
    const errs = validarCliente(formCliente);
    if (Object.keys(errs).length === 0) {
      setCliente(formCliente);
      setErrorsCliente({});
      setMostrarFormCliente(false);
    } else {
      setErrorsCliente(errs);
    }
  }

  // Handlers Animal
  function handleChangeAnimal(e: React.ChangeEvent<HTMLInputElement>) {
    setFormAnimal({ ...formAnimal, [e.target.name]: e.target.value });
  }

  function handleSubmitAnimal(e: React.FormEvent) {
    e.preventDefault();

    if (!animalEscolhido || !cliente) return;

    const errs = validarAnimal(formAnimal, animalEscolhido);
    if (Object.keys(errs).length === 0) {
      const idadeNum = Number(formAnimal.idade);
      const pesoNum = Number(formAnimal.peso);

      let novoAnimal: Animal | null = null;

      if (animalEscolhido === "Gato") {
        novoAnimal = new Gato(
          formAnimal.nome,
          idadeNum,
          pesoNum,
          cliente.nome,
          formAnimal.raca!,
          formAnimal.pelagem!
        );
      } else if (animalEscolhido === "Cachorro") {
        novoAnimal = new Cachorro(
          formAnimal.nome,
          idadeNum,
          pesoNum,
          cliente.nome,
          formAnimal.raca!,
          formAnimal.porte!
        );
      } else if (animalEscolhido === "Peixe") {
        novoAnimal = new Peixe(
          formAnimal.nome,
          idadeNum,
          pesoNum,
          cliente.nome,
          formAnimal.tipoAgua!,
          Number(formAnimal.tamanhoAquario)
        );
      }

      if (novoAnimal) {
        setAnimais([...animais, novoAnimal]);
        setFormAnimal({
          nome: "",
          idade: "",
          peso: "",
          raca: "",
          pelagem: "",
          porte: "",
          tipoAgua: "",
          tamanhoAquario: "",
        });
        setAnimalEscolhido(null);
        setCliente(null);
        setErrorsAnimal({});
      }
    } else {
      setErrorsAnimal(errs);
    }
  }

  // Toggle cliente form
  function toggleFormCliente() {
    setMostrarFormCliente((prev) => !prev);
  }

  return (
    <>
      {/* Emojis caindo no fundo */}
      <FallingEmoji />

      <header className="header">
        <div className="container header-container">
          <h1 className="logo">PetScript</h1>
          <nav>
            <button onClick={toggleFormCliente} className="btn-nav">
              {mostrarFormCliente ? "Fechar Cadastro" : "Cadastrar Cliente"}
            </button>
          </nav>
        </div>
      </header>

      <main className="container main-content">
        <section className="animal-list">
          <h2>Animais e Tutores</h2>
          <ul>
            {animais.map((animal, idx) => (
              <li key={idx} className="animal-card">
                <strong>Animal:</strong> {animal.getNome()} <br />
                <strong>Tutor:</strong> {animal.getTutor()}
              </li>
            ))}
          </ul>
        </section>

        {mostrarFormCliente && !cliente && (
          <section className="form-section">
            <form onSubmit={handleSubmitCliente}>
              <div>
                <label>
                  Nome:
                  <input
                    name="nome"
                    value={formCliente.nome}
                    onChange={handleChangeCliente}
                    required
                    aria-describedby="nomeError"
                  />
                </label>
                {errorsCliente.nome && (
                  <div id="nomeError" className="error-message">
                    {errorsCliente.nome}
                  </div>
                )}
              </div>

              <div>
                <label>
                  Idade:
                  <input
                    name="idade"
                    type="number"
                    value={formCliente.idade}
                    onChange={handleChangeCliente}
                    required
                    min={0}
                    aria-describedby="idadeError"
                  />
                </label>
                {errorsCliente.idade && (
                  <div id="idadeError" className="error-message">
                    {errorsCliente.idade}
                  </div>
                )}
              </div>

              <div>
                <label>
                  CPF:
                  <input
                    name="cpf"
                    value={formCliente.cpf}
                    onChange={handleChangeCliente}
                    required
                    aria-describedby="cpfError"
                  />
                </label>
                {errorsCliente.cpf && (
                  <div id="cpfError" className="error-message">
                    {errorsCliente.cpf}
                  </div>
                )}
              </div>

              <div>
                <label>
                  Endereço:
                  <input
                    name="endereco"
                    value={formCliente.endereco}
                    onChange={handleChangeCliente}
                    required
                    aria-describedby="enderecoError"
                  />
                </label>
                {errorsCliente.endereco && (
                  <div id="enderecoError" className="error-message">
                    {errorsCliente.endereco}
                  </div>
                )}
              </div>

              <button type="submit" style={{ marginTop: 10 }}>
                Confirmar Cliente
              </button>
            </form>
          </section>
        )}

        {cliente && !animalEscolhido && (
      <section style={{ marginTop: 20 }}>
    <p>Cliente: {cliente.nome} cadastrado com sucesso!</p>
    <p>Escolha o tipo de animal para cadastrar:</p>

    <div className="animal-type-buttons">
      <button onClick={() => setAnimalEscolhido("Gato")}>Gato</button>
      <button onClick={() => setAnimalEscolhido("Cachorro")}>Cachorro</button>
      <button onClick={() => setAnimalEscolhido("Peixe")}>Peixe</button>
    </div>
       </section>
        )}

        {animalEscolhido && (
          <section style={{ marginTop: 20 }}>
            <form onSubmit={handleSubmitAnimal}>
              <h2>Cadastrar {animalEscolhido}</h2>

              <div>
                <label>
                  Nome:
                  <input
                    name="nome"
                    value={formAnimal.nome}
                    onChange={handleChangeAnimal}
                    required
                    aria-describedby="nomeAnimalError"
                  />
                </label>
                {errorsAnimal.nome && (
                  <div id="nomeAnimalError" className="error-message">
                    {errorsAnimal.nome}
                  </div>
                )}
              </div>

              <div>
                <label>
                  Idade:
                  <input
                    name="idade"
                    type="number"
                    value={formAnimal.idade}
                    onChange={handleChangeAnimal}
                    required
                    min={0}
                    aria-describedby="idadeAnimalError"
                  />
                </label>
                {errorsAnimal.idade && (
                  <div id="idadeAnimalError" className="error-message">
                    {errorsAnimal.idade}
                  </div>
                )}
              </div>

              <div>
                <label>
                  Peso (kg):
                  <input
                    name="peso"
                    type="number"
                    step="0.1"
                    value={formAnimal.peso}
                    onChange={handleChangeAnimal}
                    required
                    min={0}
                    aria-describedby="pesoAnimalError"
                  />
                </label>
                {errorsAnimal.peso && (
                  <div id="pesoAnimalError" className="error-message">
                    {errorsAnimal.peso}
                  </div>
                )}
              </div>

              {animalEscolhido === "Gato" && (
                <>
                  <div>
                    <label>
                      Raça:
                      <input
                        name="raca"
                        value={formAnimal.raca}
                        onChange={handleChangeAnimal}
                        required
                        aria-describedby="racaError"
                      />
                    </label>
                    {errorsAnimal.raca && (
                      <div id="racaError" className="error-message">
                        {errorsAnimal.raca}
                      </div>
                    )}
                  </div>

                  <div>
                    <label>
                      Pelagem:
                      <input
                        name="pelagem"
                        value={formAnimal.pelagem}
                        onChange={handleChangeAnimal}
                        required
                        aria-describedby="pelagemError"
                      />
                    </label>
                    {errorsAnimal.pelagem && (
                      <div id="pelagemError" className="error-message">
                        {errorsAnimal.pelagem}
                      </div>
                    )}
                  </div>
                </>
              )}

              {animalEscolhido === "Cachorro" && (
                <>
                  <div>
                    <label>
                      Raça:
                      <input
                        name="raca"
                        value={formAnimal.raca}
                        onChange={handleChangeAnimal}
                        required
                        aria-describedby="racaError"
                      />
                    </label>
                    {errorsAnimal.raca && (
                      <div id="racaError" className="error-message">
                        {errorsAnimal.raca}
                      </div>
                    )}
                  </div>

                  <div>
                    <label>
                      Porte:
                      <input
                        name="porte"
                        value={formAnimal.porte}
                        onChange={handleChangeAnimal}
                        required
                        aria-describedby="porteError"
                      />
                    </label>
                    {errorsAnimal.porte && (
                      <div id="porteError" className="error-message">
                        {errorsAnimal.porte}
                      </div>
                    )}
                  </div>
                </>
              )}

              {animalEscolhido === "Peixe" && (
                <>
                  <div>
                    <label>
                      Tipo de Água:
                      <input
                        name="tipoAgua"
                        value={formAnimal.tipoAgua}
                        onChange={handleChangeAnimal}
                        required
                        aria-describedby="tipoAguaError"
                      />
                    </label>
                    {errorsAnimal.tipoAgua && (
                      <div id="tipoAguaError" className="error-message">
                        {errorsAnimal.tipoAgua}
                      </div>
                    )}
                  </div>

                  <div>
                    <label>
                      Tamanho do Aquário (L):
                      <input
                        name="tamanhoAquario"
                        type="number"
                        value={formAnimal.tamanhoAquario}
                        onChange={handleChangeAnimal}
                        required
                        min={0}
                        aria-describedby="tamanhoAquarioError"
                      />
                    </label>
                    {errorsAnimal.tamanhoAquario && (
                      <div id="tamanhoAquarioError" className="error-message">
                        {errorsAnimal.tamanhoAquario}
                      </div>
                    )}
                  </div>
                </>
              )}

              <button type="submit" style={{ marginTop: 10 }}>
                Cadastrar Animal
              </button>
            </form>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2025 PetShop Online - Todos os direitos reservados.</p>
          <p>Desenvolvido com 💙 por Você</p>
        </div>
      </footer>
    </>
  );
}
