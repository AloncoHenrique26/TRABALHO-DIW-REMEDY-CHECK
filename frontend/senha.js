// Função para validar e redirecionar o usuário
function validarCodigo(event) {
  event.preventDefault(); // Evita que o formulário seja enviado

  var codigo = document.getElementById("codigo").value;

  // Verifica se o código tem exatamente 6 dígitos e se são todos números
  if (/^\d{6}$/.test(codigo)) {
    // Redireciona o usuário para a nova página
    window.location.href = "index3.html";
  } else {
    // Exibe uma mensagem de erro se o código não estiver correto
    alert("Por favor, insira um código de verificação válido com 6 dígitos.");
  }
}

// Função para permitir apenas a inserção de números no campo de entrada
function permitirApenasNumeros(event) {
  var tecla = event.key;
  // Verifica se a tecla pressionada é um número ou teclas de controle como backspace e delete
  if (isNaN(tecla) && tecla !== "Backspace" && tecla !== "Delete") {
    event.preventDefault(); // Impede a inserção de caracteres não numéricos
  }
}

// Adiciona os event listeners para o campo de entrada e o formulário
document.getElementById("codigo").addEventListener("keypress", permitirApenasNumeros);
document.getElementById("codigoForm").addEventListener("submit", validarCodigo);
