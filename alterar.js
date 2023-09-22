
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

// ----------------ALTERA A ESCALA--------------------

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
  document.querySelector('.musica-titulo .data').textContent = formattedDate;

});




var musicaLista = document.querySelector('.musica-lista');

var musicaRef = firebase.database().ref('musica');

function criarItemMusica(musica) {
  var li = document.createElement('li');
  
  var pTitulo = document.createElement('p');
  pTitulo.className = 'lista-titulo';
  pTitulo.textContent = musica.title;
  
  var spanArtista = document.createElement('span');
  spanArtista.textContent = musica.artist;
  pTitulo.appendChild(spanArtista);
  
  li.appendChild(pTitulo);
  
  var divLink = document.createElement('div');
  divLink.className = 'musica-link';
  
  var pCifra = document.createElement('p');
  pCifra.className = 'link-titulo';
  pCifra.innerHTML = '<strong>Cifra Club</strong><a href="' + musica.cifraLink + '" target="_blank">Acessar Cifra</a>';
  
  var pVideo = document.createElement('p');
  pVideo.className = 'link-titulo';
  pVideo.innerHTML = '<strong>Youtube</strong><a href="' + musica.videoLink + '" target="_blank">Acessar Vídeo</a>';
  
  divLink.appendChild(pCifra);
  divLink.appendChild(pVideo);
  
  li.appendChild(divLink);
  
  return li;
}

musicaRef.on('value', function(snapshot) {
  musicaLista.innerHTML = '';
  
  snapshot.forEach(function(childSnapshot) {
    var musica = childSnapshot.val();
    var li = criarItemMusica(musica);
    musicaLista.appendChild(li);
  });
});
