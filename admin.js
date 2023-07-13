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



function addName() {
  var instrument = document.getElementById('instrumentSelect').value;
  var name = document.getElementById('nameInput').value;

  // Adicione o nome à lista de pessoas para o instrumento
  var ref = firebase.database().ref('escala/' + instrument);
  ref.once('value', function(snapshot) {
    var people = snapshot.val() || [];
    people.push(name);
    ref.set(people);
  });
}

function removeName() {
  var instrument = document.getElementById('instrumentSelect').value;
  var name = document.getElementById('nameInput').value;

  // Remova o nome da lista de pessoas para o instrumento
  var ref = firebase.database().ref('escala/' + instrument);
  ref.once('value', function(snapshot) {
    var people = snapshot.val() || [];
    var index = people.indexOf(name);
    if (index > -1) {
      people.splice(index, 1);
      ref.set(people);
    }
  });
}




var database = firebase.database();

database.ref('escala').on('value', (snapshot) => {
  var data = snapshot.val();

  // Mapeie os elementos li para os instrumentos
  var lis = document.querySelectorAll('.escala-lista li');
  var map = {
    violao: lis[0],
    baixo: lis[1],
    guitarra: lis[2],
    // Adicione mais mapeamentos conforme necessário
  };

  // Atualize os elementos p para cada instrumento
  for (var instrument in data) {
    var people = data[instrument];
    var li = map[instrument];
    var ps = li.querySelectorAll('p');

    // Limpe os elementos p atuais
    for (var i = 0; i < ps.length; i++) {
      li.removeChild(ps[i]);
    }

    // Adicione os novos elementos p
    for (var i = 0; i < people.length; i++) {
      var p = document.createElement('p');
      p.textContent = people[i];
      li.appendChild(p);
    }
  }
});
