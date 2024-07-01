document.getElementById("emailForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que o formulário seja enviado

  // Gera um código aleatório de seis dígitos
  var codigo = Math.floor(100000 + Math.random() * 900000);

  // Obtém o endereço de e-mail fornecido pelo usuário
  var email = document.getElementById("email").value;

  // Simula o envio do código por e-mail (substitua por sua lógica de envio real)
  alert("Um código de verificação foi enviado para " + email + ". Código: " + codigo);

  setTimeout(function() {
    window.location.href = "index2.html";
  }, 2000); // 2000 milissegundos = 2 segundos
});