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
const descontos = document.querySelector("#descontos");
const corpoTabela = document.querySelector("#corpo-tabela");
const inputClientes = document.querySelector("#input-search-clientes");
const codProdutoInput = document.querySelector("#cod-produto-input");
const nomeProdutoInput = document.querySelector("#nome-produto-input");
const qtdeProdutoInput = document.querySelector("#qtde-produto-input");
const DropdownClientes = document.querySelector("#dropdown-clientes");
const precoProdutoInput = document.querySelector("#preco-produto-input");
const descontoProdutoInput = document.querySelector("#desconto-produto-input");
// Declaração da variável do objeto de dados
let data = [];
// ================================================================================== Teclas de Atalho ==================================================================================
// =================== Alt + 5 ===================
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
  if (keyCode === 52) {
    if (event.altKey) escolherCliente();
  }
});
document
  .querySelector("#btn-escolher-cliente")
  .addEventListener("click", () => escolherCliente());
// ================================================================================== Somar os valores dos produtos ==================================================================================
function getSubtotal(total, item) {
  // Transformar string em number. Ex: "R$ 1,00 => 1.00"
  const subtotalNumber =
    toNumber(item.PRECO_PRODUTO) * toNumber(item.QTDE_PRODUTO);
  return total + subtotalNumber;
}
function getDescontos(total, item) {
  // Transformar string em number. Ex: "R$ 1,00 => 1.00"
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
  if (codProdutoInput.value !== "") {
    // Guardando os valores dos inputs em constantes
    const valueCod = codProdutoInput.value;
    const valueNome = nomeProdutoInput.value;
    const valueQtde = qtdeProdutoInput.value;
    const valuePreco = precoProdutoInput.value;
    const valueDesconto = descontoProdutoInput.value;
    // Formatando os valores em dinheiro(real)
    const PrecoFormatado = formatar(valuePreco);
    const DescontoFormatado = formatar(valueDesconto);
    const SubtotalFormatado = formatar(
      valuePreco * valueQtde - valueDesconto * valueQtde
    );
    // Criação de um novo objeto com os novos valores dos inputs adicionados
    const newData = {
      ID_PRODUTO: data.length,
      COD_PRODUTO: valueCod,
      NOME_PRODUTO: valueNome,
      QTDE_PRODUTO: valueQtde,
      PRECO_PRODUTO: PrecoFormatado,
      DESCONTO_PRODUTO: DescontoFormatado,
      SUBTOTAL_PRODUTO: SubtotalFormatado,
    };
    // Adicionando o novo objeto com os valores dos inputs ao "Banco de dados"
    data.push(newData);
    // console.log(data);
    // Adicionando os valores somados na tela
    const subtotalTotal = data.reduce(getSubtotal, 0);
    const descontosTotal = data.reduce(getDescontos, 0);
    subtotal.innerHTML = formatar(subtotalTotal);
    descontos.innerHTML = formatar(descontosTotal);
    total.innerHTML = formatar(subtotalTotal - descontosTotal);
    // Adicionando a linha(tr) na tabela
    corpoTabela.innerHTML = montarTabela();
    // Limpando os valores dos inputs e focando no primeiro input
    codProdutoInput.value = "";
    nomeProdutoInput.value = "";
    qtdeProdutoInput.value = "";
    precoProdutoInput.value = "";
    descontoProdutoInput.value = "";
    codProdutoInput.focus();
  } else {
    alert("Por favor, coloque os dados abaixo");
    codProdutoInput.focus();
  }
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
}
// ================================================================================== Selecionar Linha ==================================================================================
const selecionarLinha = (id) => {
  // const numLinha = id.replace("linha", "");
  const linhaEspec = document.querySelector(`#${id}`);
  linhaEspec.classList.toggle("selecionado");
};
// ================================================================================== Retirar Item(s) ==================================================================================
const retirarItem = () => {
  const linhaSelecionada = document.querySelectorAll(".selecionado");
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
  if (keyCode === 56) {
    if (event.altKey) retirarItem();
  }
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
  vendedores[i].addEventListener(
    "click",
    () => (DropdownVendedores.innerHTML = vendedores[i].textContent)
  );
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
    // inputClientes.value = clientes[i].textContent;
    inputClientes.value = "";
  });
}
