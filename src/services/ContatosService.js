export default class ContatosService {
  contatos = [];
  contatosVisiveis = [];

  constructor() {
    this.pull();
  }

  get contatos() {
    return [...this.contatos];
  }

  get contatosVisiveis() {
    return [...this.contatosVisiveis];
  }

  adicionar({ nome }) {
    this.contatos.push({ nome, id: new Date().getTime() })
    this.push();
  }

  remover(id) {
    const index = this.contatos.findIndex((contato) => parseInt(id) === contato.id);
    this.contatos.splice(index, 1);
    this.push();
  }

  filter(valor) {
    this.contatosVisiveis = this.contatos.filter(contato => contato.nome.toLowerCase().includes(valor.toLowerCase()));
  }

  pull() {
    this.contatos = JSON.parse(localStorage.getItem("contatos")) || [];
    this.contatosVisiveis = this.contatos;
  }

  push() {
    localStorage.setItem("contatos", JSON.stringify(this.contatos));
  }
}