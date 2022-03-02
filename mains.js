// ================================================================================== Dependencias da Lib Coreui ==================================================================================
const popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-coreui-toggle="popover"]')
);
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new coreui.Popover(popoverTriggerEl);
});
// Guardando elementos do HTML em constantes
const total = document.querySelector("#total");
const subtotal = document.querySelector("#subtotal");
const acrescimo = document.querySelector("#acrescimo");
const descontos = document.querySelector("#descontos");
const corpoTabela = document.querySelector("#corpo-tabela");
const inputClientes = document.querySelector("#input-search-clientes");
const inputTipoVenda = document.querySelector("#input-search-tipo-venda");
const codProdutoInput = document.querySelector("#cod-produto-input");
const nomeProdutoInput = document.querySelector("#nome-produto-input");
const qtdeProdutoInput = document.querySelector("#qtde-produto-input");
const DropdownClientes = document.querySelector("#dropdown-clientes");
const DropdownTipoVenda = document.querySelector("#dropdown-tipo-venda");
const precoProdutoInput = document.querySelector("#preco-produto-input");
const descontoProdutoInput = document.querySelector("#desconto-produto-input");
// Declaração da variável do objeto de dados
const produtos = JSON.parse(localStorage.getItem("produtos"));

let data = produtos || [];
let valorVenda;
// ================================================================================== Teclas de Atalho ==================================================================================
// =================== Alt + 5 ===================
const cancelarCompra = () => {
  data.splice(0, data.length);
  corpoTabela.innerHTML = data;
};
document.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  if (keyCode === 53 && event.altKey) cancelarCompra();
});
document
  .querySelector("#botao-cancelar-compra")
  .addEventListener("click", () => cancelarCompra());
// =================== Alt + 4 ===================
const escolherCliente = () => {
  const dropdownMenuClientes = document.querySelector(
    "#dropdown-menu-clientes"
  );
  DropdownClientes.classList.toggle("show");
  dropdownMenuClientes.classList.toggle("show");
  inputClientes.focus();
};
document.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  if (keyCode === 52 && event.altKey) escolherCliente();
});
document
  .querySelector("#btn-escolher-cliente")
  .addEventListener("click", () => escolherCliente());

const escolherTipoVenda = () => {
  const dropdownMenuTipoVenda = document.querySelector(
    "#dropdown-menu-tipo-venda"
  );
  DropdownTipoVenda.classList.toggle("show");
  dropdownMenuTipoVenda.classList.toggle("show");
  inputTipoVenda.focus();
};
document.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  if (keyCode === 55 && event.altKey) escolherTipoVenda();
});
document
  .querySelector("#btn-alterar-tipo-venda")
  .addEventListener("click", () => escolherTipoVenda());

// ================================================================================== Somar os valores dos produtos ==================================================================================
function getSubtotal(total, item) {
  const subtotalNumber =
    toNumber(item.PRECO_PRODUTO) * toNumber(item.QTDE_PRODUTO);
  return total + subtotalNumber;
}
function getDescontos(total, item) {
  const descontoNumber =
    toNumber(item.DESCONTO_PRODUTO) * toNumber(item.QTDE_PRODUTO);
  return total + descontoNumber;
}
// ================================================================================== Montar Tabela ==================================================================================
const montarTabela = () => {
  let tabela = "";
  data.forEach((value, index) => {
    tabela += `
    <tr onclick='selecionarLinha(this.id)' class="linhasTabela" id='linha${value.ID_PRODUTO}'>
      <th scope='row' class='numero-produto'>
        ${value.COD_PRODUTO}
      </th>
      <td class='nome-produto'> 
        ${value.NOME_PRODUTO}
      </td>
      <td class='preco-produto'> 
        ${value.PRECO_PRODUTO}
      </td>
      <td class='qtde-produto'> 
        ${value.QTDE_PRODUTO}
      </td>
      <td class='acrescimo-protuto'> 
        ${value.ACRESCIMO_PRODUTO}
      </td>
      <td class='desconto-protuto'> 
        ${value.DESCONTO_PRODUTO}
      </td>
      <td class='subtotal-produto'> 
        ${value.SUBTOTAL_PRODUTO} 
      </td>
      <td class='delete-icon'>
        <i class='fas fa-trash' onclick='apagarProduto(this.id)' id='produto${index}'/>
      </td>
    </tr>
    `;
  });
  return tabela;
};
// ================================================================================== Formatar Numeros em Moeda ==================================================================================
function formatar(value) {
  const formatoMoeda = { style: "currency", currency: "BRL" };
  return Intl.NumberFormat("pt-br", formatoMoeda).format(Number(value));
}
// ================================================================================== Formatar Moeda em Numero ==================================================================================
function toNumber(value) {
  return value.replace("R$", "").replace(".", "").replace(",", ".");
}
// ================================================================================== Adicionar Produto ==================================================================================
const adicionarProduto = () => {
  // Guardando os valores dos inputs em constantes
  const valueCod = toNumber(codProdutoInput.value);
  const valueNome = toNumber(nomeProdutoInput.value);
  const valuePreco = toNumber(precoProdutoInput.value);
  const valueQtde = toNumber(qtdeProdutoInput.value);
  const valueDesconto = 0;
  const valueAcrescimo = 0;
  // Formatando os valores em dinheiro(real)
  const PrecoFormatado = formatar(valuePreco);
  const AcrescimoFormatado = formatar(valueAcrescimo);
  const DescontoFormatado = formatar(valueDesconto);
  const SubtotalFormatado = formatar(valuePreco * valueQtde);
  // Criação de um novo objeto com os novos valores dos inputs adicionados
  const newData = {
    ID_PRODUTO: data.length,
    COD_PRODUTO: valueCod,
    NOME_PRODUTO: valueNome,
    QTDE_PRODUTO: valueQtde,
    PRECO_PRODUTO: PrecoFormatado,
    ACRESCIMO_PRODUTO: AcrescimoFormatado,
    DESCONTO_PRODUTO: DescontoFormatado,
    SUBTOTAL_PRODUTO: SubtotalFormatado,
  };
  // Adicionando o novo objeto com os valores dos inputs ao "Banco de dados"
  data.push(newData);
  localStorage.setItem("produtos", JSON.stringify(data));
  // Adicionando os valores somados na tela
  const subtotalTotal = data.reduce(getSubtotal, 0);
  subtotal.innerHTML = formatar(subtotalTotal);
  acrescimo.innerHTML = formatar(valueAcrescimo);
  descontos.innerHTML = formatar(valueDesconto);
  total.innerHTML = formatar(subtotalTotal);
  // Adicionando a linha(tr) na tabela
  corpoTabela.innerHTML = montarTabela();
  // Limpando os valores dos inputs e focando no primeiro input
  codProdutoInput.value = "";
  nomeProdutoInput.value = "";
  qtdeProdutoInput.value = "";
  precoProdutoInput.value = "";
  codProdutoInput.focus();
};
// Pegando o botão de "Adicionar produto" e passando a função de adicionarProduto
document
  .querySelector("#botao-adicionar-produto")
  .addEventListener("click", adicionarProduto);
// ================================================================================== Apagar Produto ==================================================================================
function apagarProduto(id) {
  const numProduct = id.replace("produto", "");
  data.splice(Number(numProduct), 1);
  corpoTabela.innerHTML = montarTabela();
  const subtotalTotal = data.reduce(getSubtotal, 0);
  const descontosTotal = data.reduce(getDescontos, 0);
  subtotal.innerHTML = formatar(subtotalTotal);
  descontos.innerHTML = formatar(descontosTotal);
  total.innerHTML = formatar(subtotalTotal - descontosTotal);
  localStorage.setItem("produtos", JSON.stringify(data));
}
// ================================================================================== Alterar Produto ==================================================================================
const btnAlterarItem = document.querySelector("#btn-alterar-item");
btnAlterarItem.addEventListener("click", () => alterarProduto());
function alterarProduto() {
  const itemSelecionado = document.querySelectorAll(".selecionado");
  if (itemSelecionado.length < 1) {
    alert("Por favor, selecione um produto para alterar");
  } else {
    // const idItem = itemSelecionado[0].id.replace("linha", "");
    var modalAlterarItem = new coreui.Modal(
      document.querySelector("#modalAlterarItem")
    );
    modalAlterarItem.toggle();
  }
}
// ================================================================================== Selecionar Linha ==================================================================================
const selecionarLinha = (id) => {
  const linhaEspec = document.querySelector(`#${id}`);
  linhaEspec.classList.toggle("selecionado");
};
// ================================================================================== Retirar Item(s) ==================================================================================
const retirarItem = () => {
  const linhaSelecionada = document.querySelectorAll(".selecionado");
  if (linhaSelecionada.length < 1) {
    alert("Por favor, selecione um produto para retirar");
  }
  let idLinhaSelecionada = [];
  linhaSelecionada.forEach((linha) => {
    const linhaEspec = linha.id.replace("linha", "");
    idLinhaSelecionada.push(Number(linhaEspec));
  });
  const idProduto = data.filter((value) => {
    if (!idLinhaSelecionada.includes(value.ID_PRODUTO)) {
      return value;
    }
  });
  data = idProduto;
  corpoTabela.innerHTML = montarTabela();
};

const btnRetirarItem = document
  .querySelector("#btn-retirar-item")
  .addEventListener("click", retirarItem);

document.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  if (keyCode === 56 && event.altKey) retirarItem();
});
// ================================================================================== Filtrar Vendedores ==================================================================================
const inputVendedores = document.querySelector("#input-search-vendedores");
const DropdownVendedores = document.querySelector("#dropdown-vendedores");
// Focar no input de pesquisar vendedores ao clicar no dropdown de vendedores
DropdownVendedores.addEventListener("click", () => inputVendedores.focus());
function filtrarVendedores() {
  const inputVendedoresValue = inputVendedores.value.toUpperCase();
  const p = document.querySelectorAll(".vendedores");
  for (let i = 0; i < p.length; i++) {
    txtP = p[i].textContent;
    if (txtP.toUpperCase().indexOf(inputVendedoresValue) > -1) {
      p[i].style.display = "";
    } else {
      p[i].style.display = "none";
    }
  }
}
// Adicionar o nome do p clicado ao nome do dropdown de vendedores
const vendedores = document.querySelectorAll("#dropdown-vendedores-area > p");
for (let i = 0; i < vendedores.length; i++) {
  vendedores[i].addEventListener("click", () => {
    DropdownVendedores.innerHTML = vendedores[i].textContent;
    inputVendedores.value = "";
  });
}
// ================================================================================== Filtrar Clientes ==================================================================================
// Focar no input de pesquisar clientes ao clicar no dropdown de clientes
DropdownClientes.addEventListener("click", () => inputClientes.focus());
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
// Adicionar o nome do p clicado ao nome do dropdown de clientes
const clientes = document.querySelectorAll("#dropdown-clientes-area > p");
for (let i = 0; i < clientes.length; i++) {
  clientes[i].addEventListener("click", () => {
    DropdownClientes.innerHTML = clientes[i].textContent;
    inputClientes.value = "";
  });
}

// ================================================================================== Filtrar tipo de venda ==================================================================================
// Focar no input de pesquisar clientes ao clicar no dropdown de clientes

DropdownTipoVenda.addEventListener("click", () => inputTipoVenda.focus());
function filtrarTipoVenda() {
  let inputTipoVendaValue = inputTipoVenda.value.toUpperCase();
  let p = document.querySelectorAll(".clientes");
  for (let i = 0; i < p.length; i++) {
    txtP = p[i].textContent;
    if (txtP.toUpperCase().indexOf(inputTipoVendaValue) > -1) {
      p[i].style.display = "";
    } else {
      p[i].style.display = "none";
    }
  }
}
// Adicionar o nome do p clicado ao nome do dropdown de clientes
const tiposVendas = document.querySelectorAll(
  "#dropdown-alterar-tipo-venda-area > p"
);
for (let i = 0; i < tiposVendas.length; i++) {
  tiposVendas[i].addEventListener("click", () => {
    DropdownTipoVenda.innerHTML = tiposVendas[i].textContent;
    inputTipoVenda.value = "";
  });
}

// ================================================================================== Modal de Descontos ==================================================================================
const inputDescontoDinheiroTotal = document.querySelector(
  "#input-desconto-dinheiro-total"
);
const inputDescontoPorcentagemTotal = document.querySelector(
  "#input-desconto-porcentagem-total"
);
const inputAcrescimoDinheiroTotal = document.querySelector(
  "#input-acrescimo-dinheiro-total"
);
const inputAcrescimoPorcentagemTotal = document.querySelector(
  "#input-acrescimo-porcentagem-total"
);
const inputValorTotal = document.querySelector("#input-valor-total");
const inputValorAlteradoTotal = document.querySelector(
  "#input-valor-alterado-total"
);
const salvarDescontosAcrescimos = document.querySelector(
  "#salvar-descontos-acrescimos"
);

let descontoTotal = 0;
let descontoPorcentagemTotal = 0;
let acrescimoTotal = 0;
let acrescimoPorcentagemTotal = 0;
// ====================================== Descontos ======================================
inputDescontoDinheiroTotal.addEventListener("blur", () => {
  valorVenda = data.reduce(getSubtotal, 0);
  descontoTotal = Number(inputDescontoDinheiroTotal.value);
  valorVenda -= descontoTotal;
  inputValorAlteradoTotal.innerHTML = formatar(valorVenda);
});
inputDescontoPorcentagemTotal.addEventListener("blur", () => {
  if (descontoTotal === 0 || undefined) {
    valorVenda = data.reduce(getSubtotal, 0);
    descontoPorcentagemTotal = Number(inputDescontoPorcentagemTotal.value);
    const valorDinheiro = (valorVenda / 100) * descontoPorcentagemTotal;
    valorVenda -= valorDinheiro;
    descontoPorcentagemTotal = valorDinheiro;
    inputValorAlteradoTotal.innerHTML = formatar(valorVenda);
  }
});
// ====================================== Acréscimos ======================================
inputAcrescimoDinheiroTotal.addEventListener("blur", () => {
  if (descontoTotal === 0 && descontoPorcentagemTotal === 0) {
    valorVenda = data.reduce(getSubtotal, 0);
  }
  acrescimoTotal = Number(inputAcrescimoDinheiroTotal.value);
  if (acrescimoTotal !== 0) {
    valorVenda += acrescimoTotal;
  }
  inputValorAlteradoTotal.innerHTML = formatar(valorVenda);
});
inputAcrescimoPorcentagemTotal.addEventListener("blur", () => {
  if (
    descontoTotal === 0 &&
    descontoPorcentagemTotal === 0 &&
    acrescimoTotal === 0
  ) {
    valorVenda = data.reduce(getSubtotal, 0);
  }
  if (acrescimoTotal === 0 || undefined) {
    acrescimoPorcentagemTotal = Number(inputAcrescimoPorcentagemTotal.value);
    const valorDinheiro = (valorVenda / 100) * acrescimoPorcentagemTotal;
    valorVenda += valorDinheiro;
    acrescimoPorcentagemTotal = valorDinheiro;
    inputValorAlteradoTotal.innerHTML = formatar(valorVenda);
  }
});
// ====================================== Salvar Alterações ======================================
salvarDescontosAcrescimos.addEventListener("click", () => {
  if (descontoTotal === 0) {
    descontos.innerHTML = formatar(descontoPorcentagemTotal);
  } else {
    descontos.innerHTML = formatar(descontoTotal);
  }
  if (acrescimoTotal === 0) {
    acrescimo.innerHTML = formatar(acrescimoPorcentagemTotal);
  } else {
    acrescimo.innerHTML = formatar(acrescimoTotal);
  }
  if (valorVenda !== undefined) {
    total.innerHTML = formatar(valorVenda);
  }
});

const subtotalTotal = data.reduce(getSubtotal, 0);
const descontosTotal = 0;
corpoTabela.innerHTML = montarTabela();
subtotal.innerHTML = formatar(subtotalTotal);
acrescimo.innerHTML = formatar(acrescimoTotal);
descontos.innerHTML = formatar(descontosTotal);
total.innerHTML = formatar(subtotalTotal);
inputValorTotal.innerHTML = formatar(subtotalTotal);
inputValorAlteradoTotal.innerHTML = formatar(subtotalTotal);
