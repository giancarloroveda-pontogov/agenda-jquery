import $ from "jquery";
import ContatosService from "./css/services/ContatosService";

const contatosService = new ContatosService();

$(".form").on("submit", function (event) {
  event.preventDefault();

  contatosService.adicionar(getFormData());

  clearForm();

  renderContatos();
});

$(document).on("click", ".list-item", function (event) {
  $(this).toggleClass("destaque")
});

$(document).on("click", ".list-item .remover-contato-button", function (event) {
  event.stopPropagation();

  const dataId = this.dataset;
  console.log(dataId)
  contatosService.remover(dataId);

  renderContatos();
});

function getFormData() {
  return {
    nome: $("#nome").val()
  }
}

function clearForm() {
  $("#nome").val("")
}

function renderContatos() {
  $(".contatos-list").children().remove();

  for (const contato of contatosService.contatos) {
    $(".contatos-list").append(`
        <li class="list-item" data-id="${contato.id}">
          ${contato.nome}
          <button class="remover-contato-button"></button>
        </li>
      `);
  }
}

renderContatos();