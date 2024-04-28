
const { gsap } = window;

// Obtener el elemento del icono
const darkModeIcon = document.getElementById('dark-mode-icon');

// Agregar un event listener para el clic
darkModeIcon.addEventListener('click', () => {
  // Cambiar el icono y animar el cambio
  if (darkModeIcon.classList.contains('bx-moon')) {
    // Si actualmente es el icono de la luna, cambiar a icono del sol
    darkModeIcon.classList.remove('bx-moon');
    darkModeIcon.classList.add('bx-sun');
  } else {
    // Si actualmente es el icono del sol, cambiar a icono de la luna
    darkModeIcon.classList.remove('bx-sun');
    darkModeIcon.classList.add('bx-moon');
  }

  // Animar el cambio de icono
  gsap.fromTo(
    darkModeIcon,
    { rotation: 0, opacity: 0 },
    { rotation: 360, opacity: 1, duration: 0.5 }
  );
});

// Variable para almacenar el tamaño de letra original
let originalFontSize;

// Función para obtener el tamaño de letra original
function getOriginalFontSize() {
    const sampleElement = document.createElement('p');
    sampleElement.textContent = 'Lorem ipsum';
    sampleElement.style.opacity = '0'; // Ocultar el elemento
    document.body.appendChild(sampleElement);
    originalFontSize = parseFloat(window.getComputedStyle(sampleElement).getPropertyValue('font-size'));
    document.body.removeChild(sampleElement); // Eliminar el elemento después de obtener el tamaño de fuente
}

// Función para ajustar el tamaño del texto según el valor del deslizador
function adjustTextSize() {
    const sliderValue = parseFloat(document.getElementById('text-resize-slider').value);
    let newSize;
    if (sliderValue === 0) {
        newSize = originalFontSize;
    } else if (sliderValue > 0) {
        newSize = originalFontSize * (1 + sliderValue / 50);
    } else {
        newSize = originalFontSize * (1 + sliderValue / 100);
    }
    const elementsToResize = document.querySelectorAll('p, span, a, div:not(.icon):not(#drop-up-container)');
    elementsToResize.forEach(function(element) {
        element.style.fontSize = newSize + 'px';
    });
}

// Función para alternar la visibilidad del deslizador
function toggleSliderVisibility() {
    const slider = document.getElementById('text-resize-slider');
    const deslizador = document.querySelector('.deslizador');
    if (slider.style.display === 'none') {
        slider.style.display = 'block'; // Mostrar el deslizador
        deslizador.style.display = 'block'; // Mostrar el deslizador
        slider.value = '40'; // Establecer un valor inicial
        adjustTextSize(); // Ajustar el tamaño del texto al valor inicial
    } else {
        slider.style.display = 'none'; // Ocultar el deslizador
        deslizador.style.display = 'none'; // Ocultar el deslizador
    }
}

// Asignar un evento de clic al icono para alternar la visibilidad del deslizador
document.getElementById('text-resize-btn').addEventListener('click', toggleSliderVisibility);

// Asignar un evento de clic al icono para alternar la visibilidad del deslizador
document.getElementById('text-resize-btn').addEventListener('click', toggleSliderVisibility);

// Asignar un evento de cambio al deslizador para ajustar el tamaño del texto
document.getElementById('text-resize-slider').addEventListener('input', adjustTextSize);

// Obtener el tamaño de letra original al cargar la página
getOriginalFontSize();


// Función para alternar la visibilidad del control deslizante
function toggleSliderVisibility() {
    const slider = document.getElementById('text-resize-slider');
    const deslizador = document.querySelector('.deslizador');
    
    // Verificar si el control deslizante está visible o no
    if (slider.style.display === 'none') {
        // Si está oculto, activar animación de aparición
        gsap.fromTo("#text-resize-slider, .deslizador", { x: "45%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.3, ease: "power2.inOut" });
        slider.style.display = 'block'; // Mostrar el control deslizante
        deslizador.style.display = 'block'; // Mostrar el contenedor del control deslizante
        slider.value = '40'; // Establecer un valor inicial
        adjustTextSize(); // Ajustar el tamaño del texto al valor inicial
    } else {
        // Si está visible, activar animación de desaparición
        gsap.to("#text-resize-slider, .deslizador", { x: "200%", opacity: 0, duration: 0.8, ease: "power2.inOut", onComplete: function() {
            slider.style.display = 'none'; // Ocultar el control deslizante
            deslizador.style.display = 'none'; // Ocultar el contenedor del control deslizante
        }});
    }
}

// Asignar un evento de clic al icono para alternar la visibilidad del control deslizante
document.getElementById('text-resize-btn').addEventListener('click', toggleSliderVisibility);





// Función para ajustar el valor del contador en vivo
function updateRangeValue() {
    const slider = document.getElementById('text-resize-slider');
    const rangeValueOutput = document.getElementById('rangevalue');
    rangeValueOutput.textContent = slider.value;
}

// Asignar un evento de cambio al input type="range" para actualizar el contador en vivo
document.getElementById('text-resize-slider').addEventListener('input', updateRangeValue);





            // Elemento para la guía de lectura
            const readingGuide = document.createElement('div');
            readingGuide.id = 'reading-guide';

            // Establece el valor z-index para la guía de lectura
            readingGuide.style.zIndex = '999999';

            // Establece la posición como "fixed" para que no se mueva
            readingGuide.style.position = 'fixed';

            // Establece pointer-events en none para que no bloquee el cursor
            readingGuide.style.pointerEvents = 'none';

            // Agrega la guía de lectura al cuerpo del documento
            document.body.appendChild(readingGuide);

            // Función para mostrar/ocultar la guía de lectura y controlar su posición y tamaño
            function updateReadingGuidePosition(event) {
                const x = event.clientX;
                const y = event.clientY;

                readingGuide.style.left = '0';
                readingGuide.style.top = `${y}px`;
                readingGuide.style.width = '100%';
                readingGuide.style.height = '2px'; // Ajusta el grosor de la línea según tus preferencias
                readingGuide.style.backgroundColor = 'red'; // Color de la línea
            }

            // Inicialmente, oculta la guía de lectura
            readingGuide.style.display = 'none';

            // Agrega un evento de clic al ícono de subrayado para mostrar/ocultar la guía de lectura
            document.querySelector("#underline-icon").addEventListener('click', function () {
                if (readingGuide.style.display === 'none') {
                    readingGuide.style.display = 'block';
                } else {
                    readingGuide.style.display = 'none';
                }
            });

            // Agrega un evento de movimiento del mouse para actualizar la posición de la guía de lectura
            document.addEventListener('mousemove', updateReadingGuidePosition);



            // Variables para controlar el estado del contraste de grises y el modo oscuro
            let grayscaleEnabled = false;
            let darkModeEnabled = false;



            // Función para activar/desactivar el contraste de grises
function toggleGrayscale() {
    const mainElement = document.querySelector('main');
    const footerElement = document.querySelector('footer');
    const dropletIcon = document.getElementById('icon');

    if (grayscaleEnabled) {
        // Desactivar el contraste de grises (restaurar colores originales)
        mainElement.style.filter = 'none';
        footerElement.style.filter = 'none';
        grayscaleEnabled = false;
        // Cambiar el ícono del droplet a su estado normal
        dropletIcon.className = 'bx bx-droplet';
    } else {
        // Activar el contraste de grises (aplicar filtro de escala de grises)
        mainElement.style.filter = 'grayscale(100%)';
        footerElement.style.filter = 'grayscale(100%)';
        grayscaleEnabled = true;
        // Cambiar el ícono del droplet al ícono específico para escala de grises
        dropletIcon.className = 'bx bxs-droplet';
    }
}



            function toggleDarkMode() {
    const mainElement = document.querySelector('main');
    const footerElement = document.querySelector('footer');
    const darkicon = document.getElementById('dark-mode-icon');
    if (darkModeEnabled) {
        // Desactivar el modo oscuro (restaurar colores originales)
        mainElement.style.filter = 'none';
        mainElement.style.backgroundColor = '#e4e2f5'; // Restaurar el color de fondo original
        footerElement.style.filter = 'none';
        footerElement.style.backgroundColor = '#e4e2f5'; // Restaurar el color de fondo original

        darkModeEnabled = false;
        // Restaurar el color del texto en #inicio
        document.getElementById('inicio-content').style.color = 'black';
        document.getElementById('inicio').style.color = 'black';
        document.getElementById('derechos').style.color = 'black';

        // Agregar estilos al pseudo-elemento ::before
        mainElement.querySelectorAll('.section').forEach(section => {
            section.style.position = 'relative';
            section.style.zIndex = '0';
        });

        // Agregar estilos al pseudo-elemento ::after
        mainElement.querySelectorAll('.section').forEach(section => {
            section.style.position = 'relative';
            section.style.zIndex = '0';
        });
         // Cambiar el ícono del droplet a su estado normal
         darkicon.className = 'bx bx-moon';
    } else {
        // Activar el modo oscuro (aplicar filtro de reducción de intensidad de colores)
        mainElement.style.filter = 'brightness(80%)'; // Ajusta el valor para la intensidad deseada
        mainElement.style.backgroundColor = '#313144'; // Cambia el color de fondo a gris oscuro
        footerElement.style.filter = 'brightness(70%)'; // Ajusta el valor para la intensidad deseada
        footerElement.style.backgroundColor = '#313144'; // Cambia el color de fondo a gris oscuro

        darkModeEnabled = true;

        // Cambiar el color del texto en #inicio a blanco
        document.getElementById('inicio-content').style.color = 'white';
        document.getElementById('inicio').style.color = 'white';
        document.getElementById('derechos').style.color = 'white';
        // Cambiar el ícono del droplet al ícono específico para escala de grises
        darkicon.className = 'bx bx-sun';
    }
}


            // Evento de clic para el botón de "Contraste de grises"
            document.querySelector("#icon").addEventListener('click', toggleGrayscale);

            // Evento de clic para el botón de "Modo Oscuro"
            document.querySelector("#dark-mode-icon").addEventListener('click', toggleDarkMode);




            /////////



            document.querySelector('.drop-up-toggle').addEventListener('click', function () {
                const dropUpContainer = this.closest('.drop-up-container');
                dropUpContainer.classList.toggle('open');
            });

            document.querySelector('.close-drop-up').addEventListener('click', function () {
                const dropUpContainer = this.closest('.drop-up-container');
                dropUpContainer.classList.remove('open');
            });
            

          