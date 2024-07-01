document.addEventListener("DOMContentLoaded", function () {
  var btnSignin = document.querySelector("#signin");
  var btnSignup = document.querySelector("#signup");
  var btnSignInSubmit = document.querySelector("#btn-login");
  var btnSignUpSubmit = document.querySelector("#btn-submit");
  var body = document.querySelector("body");

  btnSignin.addEventListener("click", function () {
      body.className = "sign-in-js";
  });

  btnSignup.addEventListener("click", function () {
      body.className = "sign-up-js";
  });

  btnSignUpSubmit.addEventListener("click", function (event) {
      event.preventDefault();
      addUser();
  });

  btnSignInSubmit.addEventListener("click", function (event) {
      event.preventDefault();
      signInUser();
  });

  function isEmailValid(email) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  function addUser() {
      var name = document.getElementById("name").value;
      var comorbidade = document.getElementById("comorbidade").value;
      var deficiencia = document.getElementById("deficiencia").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;

      if (!name || !comorbidade || !deficiencia || !email || !password) {
          alert("Por favor, preencha todos os campos.");
          return;
      }

      if (!isEmailValid(email)) {
          alert("Por favor, insira um email válido.");
          return;
      }

      var users = JSON.parse(localStorage.getItem("users")) || [];
      var user = {
          id: new Date().getTime(),
          name: name,
          comorbidade: comorbidade,
          deficiencia: deficiencia,
          email: email,
          password: password
      };

      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      displayUsers();
      clearForm();
      // Redirecionar para a tela inicial após cadastro
      window.location.href = "telainicial.html";
  }

  function signInUser() {
      var email = document.getElementById("login-email").value;
      var password = document.getElementById("login-password").value;

      if (!email || !password) {
          alert("Por favor, preencha todos os campos.");
          return;
      }

      if (!isEmailValid(email)) {
          alert("Por favor, insira um email válido.");
          return;
      }

      var users = JSON.parse(localStorage.getItem("users")) || [];
      var user = users.find(user => user.email === email && user.password === password);

      if (!user) {
          alert("Email ou senha incorretos.");
          return;
      }

      alert("Bem-vindo, " + user.name + "!");
      // Redirecionar para a tela inicial após login
      window.location.href = "telainicial.html";
  }

  function displayUsers() {
      var users = JSON.parse(localStorage.getItem("users")) || [];
      var tableBody = document.querySelector("#data-table tbody");
      tableBody.innerHTML = "";

      users.forEach(user => {
          var row = document.createElement("tr");

          row.innerHTML = `
              <td>${user.name}</td>
              <td>${user.comorbidade}</td>
              <td>${user.deficiencia}</td>
              <td>${user.email}</td>
              <td>
                  <button class="edit-btn" onclick="editUser(${user.id})">Editar</button>
                  <button class="delete-btn" onclick="deleteUser(${user.id})">Excluir</button>
              </td>
          `;

          tableBody.appendChild(row);
      });
  }

  function clearForm() {
      document.getElementById("name").value = "";
      document.getElementById("comorbidade").value = "";
      document.getElementById("deficiencia").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
  }

  window.editUser = function (id) {
      var users = JSON.parse(localStorage.getItem("users")) || [];
      var user = users.find(user => user.id === id);

      if (user) {
          document.getElementById("name").value = user.name;
          document.getElementById("comorbidade").value = user.comorbidade;
          document.getElementById("deficiencia").value = user.deficiencia;
          document.getElementById("email").value = user.email;
          document.getElementById("password").value = user.password;
      }
  }

  window.deleteUser = function (id) {
      var users = JSON.parse(localStorage.getItem("users")) || [];
      users = users.filter(user => user.id !== id);
      localStorage.setItem("users", JSON.stringify(users));
      displayUsers();
  }

  displayUsers();
});

document.addEventListener('DOMContentLoaded', function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});