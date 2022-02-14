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
const subtotal = document.querySelector("#subtotal");
const descontos = document.querySelector("#descontos");
const total = document.querySelector("#total");

const cancelarCompra = () => {
  data.splice(0, data.length);
  corpoTabela.innerHTML = data;
};

document.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  if (keyCode === 53) {
    if (event.altKey) cancelarCompra();
  }
});

botaoCancelarCompra.addEventListener("click", () => cancelarCompra());

function deleteProduct(id) {
  console.log(id.replace("produto", ""));
}

var olamundo = "";
const adicionarProdutoTabela = () => {
  data.forEach((value) => {
    olamundo =
      "<tr><th scope='row' class='numero-produto'>" +
      value.ID_PRODUTO +
      "</th><td class='nome-produto'>" +
      value.NOME_PRODUTO +
      "</td><td class='preco-produto'>" +
      value.PRECO_PRODUTO +
      "</td><td class='qtde-produto'>" +
      value.QTDE_PRODUTO +
      "</td><td class='desconto-protuto'>" +
      value.DESCONTO_PRODUTO +
      "</td><td class='subtotal-produto'>" +
      value.SUBTOTAL_PRODUTO +
      "</td><td class='delete-icon' onclick='deleteProduct(this.id)' id='produto" +
      data.length +
      "'><i class='fas fa-trash'></i></td></tr>";
  });
};

const produtoEspec = document.querySelector(".delete-icon");
for (let value = 0; value < data.length; value++) {
  produtoEspec.addEventListener("click", () => {
    alert("a");
    apagarProduto(value);
  });
}

const apagarProduto = (ID_PRODUTO) => {
  data.splice(ID_PRODUTO, 1);
  console.log(data);
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
      PRECO_PRODUTO: Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(Number(precoProdutoInput.value)),
      QTDE_PRODUTO: qtdeProdutoInput.value,
      DESCONTO_PRODUTO: Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(Number(descontoProdutoInput.value)),
      SUBTOTAL_PRODUTO: Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(
        Number(
          precoProdutoInput.value * qtdeProdutoInput.value -
            descontoProdutoInput.value * qtdeProdutoInput.value
        )
      ),
    };
    data.push(newData);
    var subtotalTotal = data.reduce(getSubtotal, 0);
    function getSubtotal(total, item) {
      return (
        total +
        item.PRECO_PRODUTO.replace("R$", "").replace(",", ".") *
          item.QTDE_PRODUTO.replace("R$", "").replace(",", ".")
      );
    }
    var descontosTotal = data.reduce(getDescontos, 0);
    function getDescontos(total, item) {
      return (
        total +
        item.DESCONTO_PRODUTO.replace("R$", "").replace(",", ".") *
          item.QTDE_PRODUTO.replace("R$", "").replace(",", ".")
      );
    }
    subtotal.innerHTML = Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(Number(subtotalTotal));
    descontos.innerHTML = Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(Number(descontosTotal));
    total.innerHTML = Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(Number(subtotalTotal - descontosTotal));
    adicionarProdutoTabela();
    corpoTabela.innerHTML += olamundo;

    codProdutoInput.value = "";
    nomeProdutoInput.value = "";
    precoProdutoInput.value = "";
    qtdeProdutoInput.value = "";
    descontoProdutoInput.value = "";
    codProdutoInput.focus();
  } else {
    alert("Por favor, coloque os dados abaixo");
  }
});

let headerDropdownVendedores = document.querySelector(
  "#header-dropdown-vendedores"
);
let inputVendedores = document.querySelector("#input-search-vendedores");

headerDropdownVendedores.addEventListener("click", () => {
  inputVendedores.focus();
});

function filtrarVendedores() {
  let inputVendedoresValue = inputVendedores.value.toUpperCase();
  let p = document.querySelectorAll(".vendedores");
  for (let i = 0; i < p.length; i++) {
    txtP = p[i].textContent;
    if (txtP.toUpperCase().indexOf(inputVendedoresValue) > -1) {
      p[i].style.display = "";
    } else {
      p[i].style.display = "none";
    }
  }
}

let vendedores = document.querySelectorAll("#dropdown-vendedores > p");

for (let i = 0; i < vendedores.length; i++) {
  vendedores[i].addEventListener("click", () => {
    headerDropdownVendedores.innerHTML = vendedores[i].textContent;
  });
}

let inputClientes = document.querySelector("#input-search-clientes");

let headerDropdownClientes = document.querySelector(
  "#header-dropdown-clientes"
);

headerDropdownClientes.addEventListener("click", () => {
  inputClientes.focus();
});

function filtrarClientes() {
  let inputClientesValue = inputClientes.value.toUpperCase();
  let p = document.querySelectorAll(".clientes");
  for (let i = 0; i < p.length; i++) {
    txtP = p[i].textContent;
    if (txtP.toUpperCase().indexOf(inputClientesValue) > -1) {
      p[i].style.display = "";
    } else {
      p[i].style.display = "none";
    }
  }
}

let clientes = document.querySelectorAll("#dropdown-clientes > p");

for (let i = 0; i < clientes.length; i++) {
  clientes[i].addEventListener("click", () => {
    headerDropdownClientes.innerHTML = clientes[i].textContent;
    // inputClientes.value = clientes[i].textContent;
    inputClientes.value = "";
  });
}

const btnEscolherCliente = document.querySelector("#btn-escolher-cliente");
const dropdownMenuClientes = document.querySelector("#dropdown-menu-clientes");

const escolherCliente = () => {
  headerDropdownClientes.classList.toggle("show");
  dropdownMenuClientes.classList.toggle("show");
  inputClientes.focus();
};

document.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  if (keyCode === 52) {
    if (event.altKey) escolherCliente();
  }
});

btnEscolherCliente.addEventListener("click", () => escolherCliente());
