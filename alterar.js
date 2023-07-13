
var database = firebase.database();

// Referência para a lista no HTML
var escalaLista = document.querySelector('.escala-lista');

// Referência para a escala no Firebase
var escalaRef = firebase.database().ref('escala');

// Referência para a data no Firebase
var dateRef = firebase.database().ref('time');

// Função para criar um novo item da lista
function criarItemEscala(funcao, pessoas) {
  var li = document.createElement('li');
  li.textContent = funcao + ' ';
  
  pessoas.forEach(function(nome) {
    var p = document.createElement('p');
    p.textContent = nome;
    li.appendChild(p);
  });

  return li;
}

// Escuta as alterações na escala
escalaRef.on('value', function(snapshot) {
  // Limpa a lista
  escalaLista.innerHTML = '';

  // Atualiza a lista com os novos dados
  var escala = snapshot.val();
  for (var funcao in escala) {
    var pessoas = escala[funcao];
    var li = criarItemEscala(funcao, pessoas);
    escalaLista.appendChild(li);
  }
});

// ---------------------ATUALIZA A DATA -----------------------



// Referência para a data no Firebase
var timeRef = firebase.database().ref('time');

// Escuta as alterações na data
timeRef.on('value', function(snapshot) {
  // Atualiza a data com os novos dados
  var time = snapshot.val();
  var date = new Date(time);

  // Adicione um dia à data
  date.setDate(date.getDate() + 1);

  // Formate a data no formato brasileiro
  var formattedDate = date.toLocaleDateString('pt-BR');

  // Atualize o elemento span com a nova data
  document.querySelector('.escala-titulo .data').textContent = formattedDate;
});
