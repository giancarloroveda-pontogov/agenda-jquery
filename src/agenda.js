import $ from "jquery";
import ContatosService from "./css/services/ContatosService";

const contatosService = new ContatosService();

$(".form").on("submit", function (event) {
  event.preventDefault();

  const formData = getFormData();

  if (!formData.nome) {
    return alert("Nome obrigatório para cadastrar novo contato!");
  }

  contatosService.adicionar(formData);

  clearForm();

  renderContatos();
});

$(document).on("click", ".list-item", function (event) {
  $(this).toggleClass("destaque")
});

$(document).on("click", ".list-item .remover-contato-button", async function (event) {
  event.stopPropagation();

  const parentElement = this.parentElement;
  $(parentElement).fadeOut(() => {
    const dataId = parentElement.dataset.id;
    contatosService.remover(dataId);
    renderContatos();
  });
});

$(".toggle-list-button").on("click", function () {
  $(".contatos-list-container").slideToggle(100);
});

$(".searchbar-input").on("input", function () {
  const value = $(this).val();

  // -- Using .filter(), .show() and .hide() --

  const contatosFiltrados = contatosService.contatos.filter(contato => contato.nome.toLowerCase().includes(value.toLowerCase()))

  const idsFiltrados = new Set(contatosFiltrados.map(c => c.id));

  $(".list-item").filter(function (index) {
    return !idsFiltrados.has($(this).data("id"));
  }).hide();

  $(".list-item").filter(function (index) {
    return idsFiltrados.has($(this).data("id"));
  }).show();

  // -- Using the contatosService's own filter function and re-rendering the contatos --

  // contatosService.filter(value);
  // renderContatos();
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

  for (const contato of contatosService.contatosVisiveis) {
    $(".contatos-list").append(`
        <li class="list-item" data-id="${contato.id}">
          ${contato.nome}
          <button class="remover-contato-button"></button>
        </li>
      `);
  }
}

renderContatos();