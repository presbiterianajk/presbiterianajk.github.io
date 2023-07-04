  function showPopup() {
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    overlay.classList.add("show-popup");
    popup.classList.add("show-popup");
  }

  function closePopup() {
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    overlay.classList.remove("show-popup");
    popup.classList.remove("show-popup");
  }

  function isNewDay() {
    var lastVisitDate = localStorage.getItem("lastVisitDate");
    var currentDate = new Date().toLocaleDateString();

    if (lastVisitDate === currentDate) {
      return false;
    } else {
      localStorage.setItem("lastVisitDate", currentDate);
      return true;
    }
  }

  // Verifica se é um novo dia e exibe o pop-up se for a primeira visita do dia
  if (isNewDay()) {
    showPopup();
  }

  // Fecha o pop-up quando o botão 'Fechar' é clicado
  var closeBtn = document.getElementById("close-btn");
  closeBtn.addEventListener("click", closePopup);

  // function showPopup() {
  //   var overlay = document.getElementById("overlay");
  //   var popup = document.getElementById("popup");
  //   overlay.classList.add("show-popup");
  //   popup.classList.add("show-popup");
  // }

  // function closePopup() {
  //   var overlay = document.getElementById("overlay");
  //   var popup = document.getElementById("popup");
  //   overlay.classList.remove("show-popup");
  //   popup.classList.remove("show-popup");
  // }

  // showPopup();

  // // Fecha o pop-up quando o botão 'Fechar' é clicado
  // var closeBtn = document.getElementById("close-btn");
  // closeBtn.addEventListener("click", closePopup);