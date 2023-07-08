 // Pegando referências para os elementos HTML
 var textInput = document.getElementById('textInput');
 var sendButton = document.getElementById('sendButton');
 var textList = document.getElementById('textList');

 // Pegando uma referência para a base de dados do Firebase
 var db = firebase.database().ref('texts');

 // Função para enviar um novo texto para a base de dados do Firebase
 sendButton.onclick = function() {
   var text = textInput.value;
   if (text) {
     db.push(text);
     textInput.value = '';
   }
 }

 // Função para adicionar um novo texto à lista sempre que um novo texto é adicionado à base de dados do Firebase
 db.on('child_added', function(data) {
   var li = document.createElement('li');
   li.textContent = data.val();
   li.classList = 'itemLista';
   textList.appendChild(li);

   var deleteButton = document.createElement('button');
   deleteButton.textContent = 'Excluir';
   deleteButton.classList = 'sugestaoDeletar'
   li.appendChild(deleteButton);

   deleteButton.onclick = function() {
     var confirmDelete = confirm('Você tem certeza que deseja excluir este item?');
     if (confirmDelete) {
       db.child(data.key).remove();
     }
   }
 });

 // Função para remover um texto da lista quando um texto é removido da base de dados do Firebase
 db.on('child_removed', function(data) {
   var liToRemove;
   for (var i = 0; i < textList.childNodes.length; i++) {
     var li = textList.childNodes[i];
     if (li.textContent.startsWith(data.val())) {
       liToRemove = li;
       break;
     }
   }
   textList.removeChild(liToRemove);
 });