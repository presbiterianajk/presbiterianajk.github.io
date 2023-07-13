var auth = firebase.auth();

function login() {
  var email = document.getElementById('emailInput').value;
  var password = document.getElementById('passwordInput').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login bem-sucedido, mostre o formulário de atualização
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('updateForm').style.display = 'block';
    })
    .catch((error) => {
      // Erro no login, mostre uma mensagem de erro
      alert('Erro no login: ' + error.message);
    });
}
