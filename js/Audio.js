 
 /* js de activacion/desactivacion de audio*/
 const boton = document.getElementById("ajuste1");
 const textoDiv = boton.querySelector("div");
 let activo = false;




 /* js desactivador de audio*/
 $(document).ready(function () {
    var audioEnabled = true;
    var audio;
    var paragraphAudio;


    $(".tema").hover(
        function () {
            if (audioEnabled) {
                var audioSrc = $(this).data("audio");
                if (!audio || audio.src !== audioSrc) {
                    audio = new Audio(audioSrc);
                }
                audio.play();
            }
        },
        function () {
            if (audioEnabled && audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        }
    );

    $("#ajuste1").click(function () {
        audioEnabled = !audioEnabled;
        if (!audioEnabled && audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        
        // También desactivar el audio del párrafo
        if (!audioEnabled && paragraphAudio) {
            paragraphAudio.pause();
            paragraphAudio.currentTime = 0;
        }
    });

    // Captura el audio del párrafo al cargar la página
    $(".audio-trigger").each(function () {
        var audioSrc = $(this).data("audio");
        paragraphAudio = new Audio(audioSrc);
    });

    
});


 /* js de hover de audio para los Parrafos*/
 $(document).ready(function () {
    var audio;
    var audioEnabled = true;

    $(".audio-trigger").hover(
        function () {
            if (audioEnabled) {
                var audioSrc = $(this).data("audio");
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
                audio = new Audio(audioSrc);
                audio.play();
            }
        },
        function () {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        }
    );

    // Agregar comportamiento al hacer clic en el botón con la clase .tema
    $(".tema").click(function () {
        audioEnabled = false;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
});






 /* js de audio del menu de navegacion*/
 $(document).ready(function () {
    var audioEnabled = true;
    var audio;

    $("li.tooltip-element").hover(
        function () {
            if (audioEnabled) {
                var audioSrc = $(this).data("audio");
                audio = new Audio(audioSrc);
                audio.play();
            }
        },
        function () {
            if (audioEnabled && audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        }
    );

    $("#ajuste1").click(function () {
        audioEnabled = !audioEnabled;
        if (!audioEnabled && audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
});


 /* js de audio inicial*/

    // Obtén una referencia al elemento de audio
    var miAudio = document.getElementById("miAudio");

    // Función para reproducir el audio
    function reproducirAudio() {
      miAudio.play();
    }

    setTimeout(reproducirAudio, 1000);

// Función para detener el audio cuando termine
miAudio.addEventListener("ended", function() {
  miAudio.pause();
  miAudio.currentTime = 0;
})









//ACCESIBILIDAD



 // Elemento sobre el cual se activará el panel de opciones
 // Selección del icono de accesibilidad y el panel de opciones
const accessibilityIcon = document.querySelector('.fa-universal-access');
const optionsPanel = document.getElementById('options-panel');

// Variable para controlar la visibilidad del panel
let panelVisible = false;

// Función para mostrar/ocultar el panel
function toggleOptionsPanel() {
    const optionsPanel = document.getElementById('options-panel');
    optionsPanel.classList.toggle('show');
}

// Evento para mostrar/ocultar el panel al hacer clic en cualquier parte de la pantalla
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('show-panel')) {
        toggleOptionsPanel();
    } else if (!event.target.closest('#options-panel')) {
        const optionsPanel = document.getElementById('options-panel');
        optionsPanel.classList.remove('show');
    }
});




// Función para alternar la visibilidad del panel con animación
function toggleOptionsPanel() {
    if (panelVisible) {
        // Animación para ocultar el panel
        gsap.to(optionsPanel, {
            y: 10,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                optionsPanel.style.display = 'none';
                panelVisible = false;
            },
        });
    } else {
        // Animación para mostrar el panel
        optionsPanel.style.display = 'block';
        gsap.fromTo(
            optionsPanel,
            { y: -10, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
                onStart: () => {
                    optionsPanel.style.display = 'block';
                    panelVisible = true;
                },
            }
        );
    }
}

// Agregar evento de clic al icono de accesibilidad para mostrar/ocultar el panel
accessibilityIcon.addEventListener('click', toggleOptionsPanel);

// Evento para ocultar inmediatamente el panel al hacer clic fuera de él
document.addEventListener('click', (event) => {
    if (!accessibilityIcon.contains(event.target) && event.target !== optionsPanel) {
        gsap.to(optionsPanel, {
            y: 10,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                optionsPanel.style.display = 'none';
                panelVisible = false;
            },
        });
    }
});

// Evento para evitar que el panel se cierre al hacer clic en los íconos dentro del panel
optionsPanel.addEventListener('click', (event) => {
    event.stopPropagation();
});

// Selección del botón del lector de pantalla
const lectorButton = document.getElementById('ajuste1');

// Variable para controlar el estado del lector de pantalla
let lectorEnabled = true;

// Función para activar/desactivar el lector de pantalla
function toggleLector() {
    const lectorIcon = lectorButton.querySelector('.icon i');
    const lectorTooltip = lectorButton.querySelector('.link');
    const tooltipText = document.querySelector('.tooltip .show');

    if (lectorIcon.classList.contains('bx-volume-full')) {
        // Desactivar el lector de pantalla
        lectorIcon.classList.remove('bx-volume-full');
        lectorIcon.classList.add('bxs-volume-mute');
        lectorTooltip.textContent = 'Lector desactivado';
        tooltipText.textContent = 'Lector desactivado';
        lectorEnabled = false;
    } else {
        // Activar el lector de pantalla
        lectorIcon.classList.remove('bxs-volume-mute');
        lectorIcon.classList.add('bx-volume-full');
        lectorTooltip.textContent = 'Lector activado';
        tooltipText.textContent = 'Lector activado';
        lectorEnabled = true;
    }
}

// Agregar evento de clic al botón del lector de pantalla para activar/desactivar el lector
lectorButton.addEventListener('click', toggleLector);

 
 
 
 
 // Elemento para el botón de "Contraste de grises"
 const contrastButton = document.querySelector('[data-active="1"]');
 
 // Variable para controlar el estado del contraste de grises
 let grayscaleEnabled = false;
 
 // Función para activar/desactivar el contraste de grises
 function toggleGrayscale() {
     const body = document.body;
     if (grayscaleEnabled) {
         // Desactivar el contraste de grises (restaurar colores originales)
         body.style.filter = 'none';
         grayscaleEnabled = false;
     } else {
         // Activar el contraste de grises (aplicar filtro de escala de grises)
         body.style.filter = 'grayscale(100%)';
         grayscaleEnabled = true;
     }
 }
 
 // Agregar evento de clic al botón de "Contraste de grises"
 contrastButton.addEventListener('click', toggleGrayscale);
 
 
 
 
 $(document).ready(function () {
     var readingGuide = $("<div id='reading-guide'></div>"); // Agregar el ID 'reading-guide'
     
     $("body").append(readingGuide);
     readingGuide.hide(); // Ocultar la regleta de lectura por defecto
     
     $("[data-active='9']").click(function () {
         readingGuide.toggle();
         $("body").toggleClass("reading-mode"); // Cambiar la clase para aplicar estilos de lectura
     });
     
     $(document).mousemove(function (e) {
         if (readingGuide.is(":visible")) {
             readingGuide.css("top", e.clientY); // Seguir la posición vertical del cursor
         }
     });
 });
 
 
 
 
 // Elemento para el botón de "Modo Oscuro"
 const darkModeButton = document.querySelector('[data-active="3"]');
 
 // Variable para controlar el estado del modo oscuro
 let darkModeEnabled = false;
 
 // Función para activar/desactivar el modo oscuro
 function toggleDarkMode() {
     const body = document.body;
     const icon = darkModeButton.querySelector('i.bx');
 
     // Cambiar la clase del icono antes de aplicar la rotación
     if (darkModeEnabled) {
         icon.className = 'bx bx-moon'; // Cambiar a bx-sun (día)
     } else {
         icon.className = 'bx bx-sun'; // Cambiar a bx-moon (noche)
     }
 
     // Aplicar la rotación después de que el navegador actualice el estilo
     requestAnimationFrame(() => {
         if (darkModeEnabled) {
             // Desactivar el modo oscuro (restaurar colores originales)
             body.style.filter = 'none';
             body.style.backgroundColor = '#e4e2f5'; // Cambiar el color de fondo de nuevo al valor original
             icon.style.transform = 'rotate(0deg)'; // Rotar el icono a 0 grados
             darkModeEnabled = false;
 
             // Restaurar el color del texto en #inicio
             document.getElementById('inicio').style.color = 'black';
         } else {
             // Activar el modo oscuro (aplicar filtro de reducción de intensidad de colores)
             body.style.filter = 'brightness(70%)'; // Ajusta el valor para la intensidad deseada
             body.style.backgroundColor = '#313144'; // Cambiar el color de fondo a gris claro
             icon.style.transform = 'rotate(180deg)'; // Rotar el icono a 180 grados
             darkModeEnabled = true;
 
             // Cambiar el color del texto en #inicio a blanco
             document.getElementById('inicio').style.color = 'white';
         }
     });
 }
 
 // Agregar evento de clic al botón de "Modo Oscuro"
 darkModeButton.addEventListener('click', toggleDarkMode);
 

 //codigo para mobiles
 
 

