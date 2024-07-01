// Função para validar as senhas e redirecionar
function validarSenhas(event) {
  event.preventDefault(); // Evita o envio do formulário

  var senha = document.getElementById("novaSenha").value;
  var confirmacao = document.getElementById("confirmarSenha").value;

  if (senha === confirmacao) {
    // Redireciona para a nova página após a redefinição bem-sucedida
    window.location.href = "index.html";
  } else {
    // Exibe uma mensagem de erro se as senhas não coincidirem
    alert("As senhas não coincidem. Tente novamente.");
  }
}

// Adiciona o event listener ao formulário
document.getElementById("redefinirSenhaForm").addEventListener("submit", validarSenhas);