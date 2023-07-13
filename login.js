var auth = firebase.auth();

function login() {
  var email = document.getElementById('emailInput').value;
  var password = document.getElementById('passwordInput').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login bem-sucedido, redirecione para a página de administração
      window.location.href = 'admin.html';
    })
    .catch((error) => {
      // Erro no login, mostre uma mensagem de erro
      alert('Erro no login: ' + error.message);
    });
}
