//js de el carrusel
$(".custom-carousel").owlCarousel({
  autoWidth: true,
  loop: true
});
$(document).ready(function () {
  $(".custom-carousel .item").click(function () {
    $(".custom-carousel .item").not($(this)).removeClass("active");
    $(this).toggleClass("active");
  });
});

//js del icono
function changeIcon(onMouseOver) {
  var icon = document.querySelector("#icon-change i");

  if (onMouseOver) {
    icon.classList.remove("fa-arrow-left-long");
    icon.classList.add("fa-arrow-left");
  } else {
    icon.classList.remove("fa-arrow-left");
    icon.classList.add("fa-arrow-left-long");
  }
}

//js de burbuja
function showBubble() {
  var bubble = document.getElementById("bubble");
  bubble.style.display = "block";
}

function hideBubble() {
  var bubble = document.getElementById("bubble");
  bubble.style.display = "none";
}

//volver atras
function goBack() {
  document.body.classList.add('fade-out'); // Aplicar la clase que inicia la transición
  setTimeout(() => {
    window.history.back();
  }, 500); // Esperar el tiempo de la transición antes de ir hacia atrás
}

// Esto escucha el evento 'animationend' y elimina la clase 'fade-out' cuando la animación ha terminado.
document.addEventListener('animationend', () => {
  document.body.classList.remove('fade-out');
});

//ir adelante
function redirigir(destino) {
  // Añadir una clase al cuerpo para activar la animación de transición
  document.body.classList.add("fade-out");

  // Esperar un breve período antes de redirigir al usuario
  setTimeout(function() {
      // Redirigir al usuario al destino específico
      window.location.href = destino;
  }, 500); // Puedes ajustar el tiempo de espera según tus preferencias
}


