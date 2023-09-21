var auth = firebase.auth();

function login(event) {
  event.preventDefault(); // Evita o comportamento padrão do botão (recarregar a página)
  
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert('Login bem-sucedido!');
      // Login bem-sucedido, redirecione para a página de administração
      window.location.href = 'admin.html';
    })
    .catch((error) => {
      // Erro no login, mostre uma mensagem de erro
      alert('Erro no login: ' + error.message);
    });
}

// Adicione um ouvinte de evento para o formulário no arquivo login.js
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', login);
});
