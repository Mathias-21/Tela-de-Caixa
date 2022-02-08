var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-coreui-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new coreui.Popover(popoverTriggerEl);
});

const buttonSearch = document.querySelector("#button-search");
buttonSearch.addEventListener("click", () => alert("Pesquisando Item..."));

let data = [];

const botaoCancelarCompra = document.querySelector("#botao-cancelar-compra");
const corpoTabela = document.querySelector("#corpo-tabela");
const numeroProduto = document.querySelector(".numero-produto");
const nomeProduto = document.querySelector(".nome-produto");
const precoProduto = document.querySelector(".preco-produto");
const qtdeProduto = document.querySelector(".qtde-produto");
const descontoProduto = document.querySelector(".desconto-produto");
const subtotalProduto = document.querySelector(".subtotal-produto");
const codProdutoInput = document.querySelector("#cod-produto-input");
const nomeProdutoInput = document.querySelector("#nome-produto-input");
const precoProdutoInput = document.querySelector("#preco-produto-input");
const qtdeProdutoInput = document.querySelector("#qtde-produto-input");
const descontoProdutoInput = document.querySelector("#desconto-produto-input");
const botaoAdicionarProduto = document.querySelector(
  "#botao-adicionar-produto"
);

var subtotalTotal = data.reduce((acumulador, valorAtual, index, array) => {
  return acumulador + valorAtual.PRECO_PRODUTO;
}, 0);

const cancelarCompra = () => {
  console.log(data);
  data.splice(0, data.length);
  console.log(olamundo);
  corpoTabela.innerHTML = data;
};

document.addEventListener("keydown", (event) => {
  const keyName = event.key;
  if (keyName === "F7") {
    cancelarCompra();
  }
});

botaoCancelarCompra.addEventListener("click", () => cancelarCompra());

var olamundo = "";
const adicionarProdutoTabela = () => {
  data.forEach((value) => {
    olamundo =
      "<tr><th scope='row' class='numero-produto'>" +
      value.ID_PRODUTO +
      "</th><td class='nome-produto'>" +
      value.NOME_PRODUTO +
      "</td><td class='preco-produto'>R$" +
      value.PRECO_PRODUTO +
      ",00</td><td class='qtde-produto'>" +
      value.QTDE_PRODUTO +
      "</td><td class='desconto-protuto'>R$" +
      value.DESCONTO_PRODUTO +
      ",00</td><td class='subtotal-produto'>R$" +
      value.SUBTOTAL_PRODUTO +
      ",00</td><td class='delete-icon'><i class='fas fa-trash'></i></td></tr>";
  });
};

botaoAdicionarProduto.addEventListener("click", () => {
  if (
    codProdutoInput.value !== "" ||
    nomeProdutoInput.value !== "" ||
    precoProdutoInput.value !== "" ||
    qtdeProdutoInput.value !== "" ||
    descontoProdutoInput.value !== ""
  ) {
    let newData = {
      ID_PRODUTO: codProdutoInput.value,
      NOME_PRODUTO: nomeProdutoInput.value,
      PRECO_PRODUTO: precoProdutoInput.value,
      QTDE_PRODUTO: qtdeProdutoInput.value,
      DESCONTO_PRODUTO: descontoProdutoInput.value,
      SUBTOTAL_PRODUTO:
        precoProdutoInput.value * qtdeProdutoInput.value -
        descontoProdutoInput.value * qtdeProdutoInput.value,
    };
    data.push(newData);
    adicionarProdutoTabela();
    corpoTabela.innerHTML += olamundo;

    codProdutoInput.value = "";
    nomeProdutoInput.value = "";
    precoProdutoInput.value = "";
    qtdeProdutoInput.value = "";
    descontoProdutoInput.value = "";
    codProdutoInput.focus();
    console.log(subtotalTotal);
  } else {
    alert("Por favor, coloque os dados abaixo");
  }
});
