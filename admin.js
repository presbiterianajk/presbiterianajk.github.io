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


// var database = firebase.database();

// // Referência para a lista no HTML
// var escalaLista = document.querySelector('.escala-lista');

// // Referência para a escala no Firebase
// var escalaRef = firebase.database().ref('escala');

// // Função para criar um novo item da lista
// function criarItemEscala(funcao, pessoas) {
//   var li = document.createElement('li');
//   li.textContent = funcao + ' ';
  
//   pessoas.forEach(function(nome) {
//     var p = document.createElement('p');
//     p.textContent = nome;
//     li.appendChild(p);
//   });

//   return li;
// }

// // Escuta as alterações na escala
// escalaRef.on('value', function(snapshot) {
//   // Limpa a lista
//   escalaLista.innerHTML = '';

//   // Atualiza a lista com os novos dados
//   var escala = snapshot.val();
//   for (var funcao in escala) {
//     var pessoas = escala[funcao];
//     var li = criarItemEscala(funcao, pessoas);
//     escalaLista.appendChild(li);
//   }
// });
