
//ALTERÇÃO BUSCA OS DADOS NO FIREBASE e ATT A UL NA SECTION "ESCALA-LISTA"

// Referência para a lista no HTML
var escalaLista = document.querySelector('.escala-lista');

// Referência para a escala no Firebase
var escalaRef = firebase.database().ref('escala');

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


