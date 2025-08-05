export default class ContatosService {
  contatos = [];

  constructor() {
    this.pull();
  }

  get contatos() {
    return [...this.contatos];
  }

  adicionar({ nome }) {
    this.contatos.push({ nome, id: new Date().getTime() })
    this.push();
  }

  remover(id) {
    const index = this.contatos.findIndex((contato) => {
      console.log(contato.id)
      console.log(id)
      return contato.id === id
    });
    console.log(index)
    this.contatos.splice(index, 1);
    console.log(this.contatos)
    this.push();
  }

  pull() {
    this.contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  }

  push() {
    localStorage.setItem("contatos", JSON.stringify(this.contatos));
  }
}