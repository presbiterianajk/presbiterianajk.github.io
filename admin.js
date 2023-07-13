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

function updateName() {
  var instrument = document.getElementById('instrumentSelect').value;
  var oldName = document.getElementById('oldNameInput').value;
  var newName = document.getElementById('newNameInput').value;

  // Atualize o nome na lista de pessoas para o instrumento
  var ref = firebase.database().ref('escala/' + instrument);
  ref.once('value', function(snapshot) {
    var people = snapshot.val() || [];
    var index = people.indexOf(oldName);
    if (index > -1) {
      people[index] = newName; // substitui o nome antigo pelo novo
      ref.set(people);
    }
  });
}



function updateDate() {
  var dateInput = document.getElementById('dateInput');
  var date = new Date(dateInput.value);

  // Defina a hora para o meio-dia no horário local
  date.setHours(12);

  // Salve a data no Firebase
  var ref = firebase.database().ref('time');
  ref.set(date.toISOString());
}
