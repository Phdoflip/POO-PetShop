import React, { useState,} from "react";
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

export default function App() {
  const [mostrarModalCliente, setMostrarModalCliente] = useState(false);
  const [mostrarModalAnimal, setMostrarModalAnimal] = useState(false);
  const [cliente, setCliente] = useState<ClienteData | null>(null);
  const [animalEscolhido, setAnimalEscolhido] = useState<string | null>(null);
  const [animais, setAnimais] = useState<Animal[]>([]);

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

  // Validação Cliente
  function validarCliente(data: ClienteData) {
    const errs: Errors = {};
    if (!data.nome.trim()) errs.nome = "Nome é obrigatório.";
    if (!data.idade || Number(data.idade) < 0)
      errs.idade = "Idade deve ser maior ou igual a zero.";
    if (!data.cpf.trim()) errs.cpf = "CPF é obrigatório.";
    if (!data.endereco.trim()) errs.endereco = "Endereço é obrigatório.";
    return errs;
  }

  // Validação Animal
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
      setMostrarModalCliente(false);
      setMostrarModalAnimal(true);
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
        setAnimais((prev) => [...prev, novoAnimal]);
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
        setMostrarModalAnimal(false);

        // Exibe recomendação após cadastro:
        if (animalEscolhido === "Gato") {
          alert(`Recomendação para gato: ${novoAnimal.recomendarTosa()}`);
        } else if (animalEscolhido === "Cachorro") {
          alert(`Recomendação para cachorro: ${novoAnimal.recomendarBanho()}`);
        } else if (animalEscolhido === "Peixe") {
          alert(`Recomendação para peixe: ${novoAnimal.recomendarLimpezaAquario()}`);
        }
      }
    } else {
      setErrorsAnimal(errs);
    }
  }

  // Escolher animal
  function escolherAnimal(tipo: string) {
    setAnimalEscolhido(tipo);
  }

  // Fechar modais
  function fecharModalCliente() {
    setMostrarModalCliente(false);
  }
  function fecharModalAnimal() {
    setMostrarModalAnimal(false);
    setAnimalEscolhido(null);
    setCliente(null);
  }

  return (
    <>
      <div className="background-emotes">
  {[...Array(20)].map((_, i) => {
    const emotes = ["🐈", "🐶", "🐟"];
    const emote = emotes[i % emotes.length];
    const style = {
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
      fontSize: `${12 + Math.random() * 24}px`,
      animationDuration: `${5 + Math.random() * 10}s`
    };
    return (
      <div key={i} className="emote" style={style}>
        {emote}
      </div>
    );
  })}
</div>

      <header className="header">
        <div className="container header-container">
          <h1 className="logo">PetScript</h1>
          <nav>
            <button
              className="btn-nav"
              onClick={() => setMostrarModalCliente(true)}
            >
              Cadastrar Cliente
            </button>
          </nav>
        </div>
      </header>

      <main className="container main-content">
        <section className="animal-list">
          <h2>Animais e Tutores</h2>
          {animais.length === 0 ? (
            <p>Nenhum animal cadastrado.</p>
          ) : (
            <ul>
              {animais.map((animal, idx) => (
                <li key={idx} className="animal-card">
                  <strong>Animal:</strong> {animal.getNome()} <br />
                  <strong>Tutor:</strong> {animal.getTutor()}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {/* Modal Cliente */}
      {mostrarModalCliente && (
        <div className="modal-backdrop" onClick={fecharModalCliente}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h2>Cadastro de Cliente</h2>
            <form onSubmit={handleSubmitCliente}>
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

              <label>
                Idade:
                <input
                  name="idade"
                  type="number"
                  min={0}
                  value={formCliente.idade}
                  onChange={handleChangeCliente}
                  required
                  aria-describedby="idadeError"
                />
              </label>
              {errorsCliente.idade && (
                <div id="idadeError" className="error-message">
                  {errorsCliente.idade}
                </div>
              )}

              <label>
                CPF:
                <input
                  name="cpf"
                  value={formCliente.cpf}
                  onChange={handleChangeCliente}
                  placeholder="xxx.xxx.xxx-xx"
                  required
                  aria-describedby="cpfError"
                />
              </label>
              {errorsCliente.cpf && (
                <div id="cpfError" className="error-message">
                  {errorsCliente.cpf}
                </div>
              )}

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

              <div className="modal-buttons">
                <button type="submit">Confirmar Cliente</button>
                <button type="button" onClick={fecharModalCliente}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Animal */}
      {mostrarModalAnimal && cliente && (
        <div className="modal-backdrop" onClick={fecharModalAnimal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {!animalEscolhido && (
              <>
                <h2>Cadastro de Animal - Cliente: {cliente.nome}</h2>
                <p>Escolha o tipo de animal para cadastrar:</p>
                <div className="btn-group">
                  <button onClick={() => escolherAnimal("Gato")}>Gato</button>
                  <button onClick={() => escolherAnimal("Cachorro")}>
                    Cachorro
                  </button>
                  <button onClick={() => escolherAnimal("Peixe")}>Peixe</button>
                </div>
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setMostrarModalAnimal(false);
                    setCliente(null);
                  }}
                >
                  Cancelar
                </button>
              </>
            )}

            {animalEscolhido && (
              <>
                <h2>Cadastrar {animalEscolhido}</h2>
                <form onSubmit={handleSubmitAnimal}>
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

                  <label>
                    Idade:
                    <input
                      name="idade"
                      type="number"
                      min={0}
                      value={formAnimal.idade}
                      onChange={handleChangeAnimal}
                      required
                      aria-describedby="idadeAnimalError"
                    />
                  </label>
                  {errorsAnimal.idade && (
                    <div id="idadeAnimalError" className="error-message">
                      {errorsAnimal.idade}
                    </div>
                  )}

                  <label>
                    Peso (kg):
                    <input
                      name="peso"
                      type="number"
                      step="0.1"
                      min={0}
                      value={formAnimal.peso}
                      onChange={handleChangeAnimal}
                      required
                      aria-describedby="pesoAnimalError"
                    />
                  </label>
                  {errorsAnimal.peso && (
                    <div id="pesoAnimalError" className="error-message">
                      {errorsAnimal.peso}
                    </div>
                  )}

                  {animalEscolhido === "Gato" && (
                    <>
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
                    </>
                  )}

                  {animalEscolhido === "Cachorro" && (
                    <>
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
                    </>
                  )}

                  {animalEscolhido === "Peixe" && (
                    <>
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

                      <label>
                        Tamanho do Aquário (L):
                        <input
                          name="tamanhoAquario"
                          type="number"
                          min={0}
                          value={formAnimal.tamanhoAquario}
                          onChange={handleChangeAnimal}
                          required
                          aria-describedby="tamanhoAquarioError"
                        />
                      </label>
                      {errorsAnimal.tamanhoAquario && (
                        <div id="tamanhoAquarioError" className="error-message">
                          {errorsAnimal.tamanhoAquario}
                        </div>
                      )}
                    </>
                  )}

                  <div className="modal-buttons">
                    <button type="submit">Cadastrar Animal</button>
                    <button type="button" onClick={fecharModalAnimal}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container">
          <p>© 2025 PetScript - Todos os direitos reservados.</p>
          <p>Desenvolvido com 💙 por Você</p>
        </div>
      </footer>
    </>
  );
}
