const botui = new BotUI('help-bot');



let name; // Variable para almacenar el nombre del usuario

// Función para mostrar el menú principal
function showMainMenu() {
  return botui.action.button({
    delay: 300,
    action: [
      { text: 'Sobre nosotros', value: 'about_us' },
      { text: 'Aprender', value: 'learn' },
      { text: 'Recursos', value: 'resources' },
      { text: 'Referencias', value: 'references' },
    ],
  }).then((res) => {
    const selectedOption = res.value;

    // Determinar qué acción ejecutar según la opción seleccionada
    if (selectedOption === 'about_us') {
      return showAboutUs(); // Mostrar información sobre nosotros
    } else if (selectedOption === 'learn') {
      return showMessageBeforeLearnMenu(); // Mostrar el menú de aprendizaje
    } else if (selectedOption === 'resources') {
      return showMessageBeforeResourcesMenu(); // Mostrar el menú de recursos
    } else if (selectedOption === 'references') {
      return showReferences(); // Mostrar las referencias
    }
  });
}


// Función para mostrar información sobre nosotros
function showAboutUs() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'Nosotros somos EDUISSED',
  }).then(() => {
    return botui.message.bot({
      delay: 600,
      loading: true,
      content: 'En EDUISSED hemos desarrollado "SEXi Sexualidad Integral", una herramienta tecnopedagógica que cuenta con realidad aumentada, con el objetivo de mejorar la enseñanza de habilidades socioemocionales en sexualidad. Esta página web atractiva busca involucrar a los estudiantes de manera interactiva, superando las estrategias educativas aburridas y repetitivas. El contenido se basa en información proporcionada por la UNESCO, asegurando su calidad y pertinencia.',
    });
  }).then(() => {
    return botui.message.bot({
      delay: 800,
      loading: true,
      content: '¿Tienes alguna otra duda, ' + name + '?',
    });
  }).then(showMainMenu); // Mostrar nuevamente el menú principal después de mostrar el mensaje final
}




// Función para mostrar un mensaje antes de presentar el menú de recursos
function showMessageBeforeResourcesMenu() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'En cuál de los dos grandes recursos tienes dudas, ' + name + '?',
  }).then(showResourcesSubMenu);
}

// Función para mostrar el menú de recursos
function showResourcesSubMenu() {
  return botui.action.button({
    delay: 300,
    action: [
      { text: 'Realidad Aumentada (RA)', value: 'ra' },
      { text: 'Infografías', value: 'infographics' },
    ],
  }).then((res) => {
    const selectedOption = res.value;

    // Determinar qué acción ejecutar según la opción seleccionada
    if (selectedOption === 'ra') {
      return showRADescription(); // Mostrar descripción de Realidad Aumentada (RA)
    } else if (selectedOption === 'infographics') {
      return showInfographicsDescription(); // Mostrar descripción de Infografías
    }
  });
}

function showRADescription() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'La Realidad Aumentada (RA) es una tecnología que permite superponer elementos virtuales sobre el mundo real, brindando una experiencia interactiva e inmersiva. En nuestra página web, encontrarás contenido educativo y experiencias en RA que te ayudarán a aprender sobre diversos temas relacionados con la sexualidad y el bienestar.',
  }).then(() => {
    return botui.message.bot({
      delay: 800,
      loading: true,
      content: 'Espero que te haya quedado claro, ' + name + '. ¿En qué más te puedo ayudar hoy?',
    });
  }).then(showMainMenu); // Mostrar nuevamente el menú principal después del mensaje adicional
}

// Función para mostrar la descripción de Infografías
function showInfographicsDescription() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'Nuestras infografías son representaciones visuales y gráficas de información relevante sobre la sexualidad y temas relacionados. Estas infografías son una forma rápida y efectiva de adquirir conocimientos sobre diversos aspectos de la sexualidad y el bienestar emocional.',
  }).then(() => {
    return botui.message.bot({
      delay: 800,
      loading: true,
      content: 'Espero que te haya quedado claro, ' + name + '. ¿En qué más te puedo ayudar hoy?',
    });
  }).then(showMainMenu); // Mostrar nuevamente el menú principal después del mensaje adicional
}




function showReferences() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'Aquí puedes encontrar las referencias y fuentes utilizadas para crear este chatbot:',
  }).then(() => {
    return botui.message.bot({
      delay: 600,
      loading: true,
      content: '1. Organización Mundial de la Salud (OMS)',
    });
  }).then(() => {
    return botui.message.bot({
      delay: 600,
      loading: true,
      content: '2. UNESCO',
    });
  }).then(() => {
    return botui.message.bot({
      delay: 600,
      loading: true,
      content: '3. EDUISSED',
    });
  }).then(() => {
    return botui.message.bot({
      delay: 800,
      loading: true,
      content: '¿Tienes alguna otra duda, ' + name + '?',
    });
  }).then(showMainMenu); // Mostrar nuevamente el menú principal después de mostrar las referencias
}







function askMoreQuestions() {
  return botui.action.button({
    delay: 300,
    action: [
      { text: 'Sí', value: 'yes' },
      { text: 'No', value: 'no' },
    ],
    addMessage: false,
  });
}






function showValuesDescription() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'Aquí encontrarás información sobre los valores que sustentan las decisiones y comportamientos relacionados con la sexualidad y el bienestar emocional.',
  });
}

// Función para mostrar la descripción de Relaciones
function showRelationshipsDescription() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'Aquí encontrarás información sobre diferentes tipos de relaciones y cómo manejarlas de manera saludable.',
  });
}

function showGenderUnderstandingDescription() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'Información sobre cómo entender el género.',
  });
}

function showViolenceSafetyDescription() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'Información sobre violencia y seguridad personal.',
  });
}

function showHealthWellnessSkillsDescription() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'Información sobre habilidades para la salud y bienestar.',
  });
}

function showHumanBodyDevelopmentDescription() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'Información sobre el cuerpo humano y el desarrollo.',
  });
}

function showSexualitySexualBehaviorDescription() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'Información sobre sexualidad y conducta sexual.',
  });
}

function showSexualReproductiveHealthDescription() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'Información sobre salud sexual y reproductiva.',
  });
}

// Función para mostrar la descripción según la opción seleccionada en el menú "Relaciones, Valores..."
function showDescription(selectedOption) {
  if (selectedOption === 'values') {
    return showValuesDescription();
  } else if (selectedOption === 'relationships') {
    return showRelationshipsDescription();
  } else if (selectedOption === 'gender_understanding') {
    return showGenderUnderstandingDescription();
  } else if (selectedOption === 'violence_safety') {
    return showViolenceSafetyDescription();
  } else if (selectedOption === 'health_wellness_skills') {
    return showHealthWellnessSkillsDescription();
  } else if (selectedOption === 'human_body_development') {
    return showHumanBodyDevelopmentDescription();
  } else if (selectedOption === 'sexuality_sexual_behavior') {
    return showSexualitySexualBehaviorDescription();
  } else if (selectedOption === 'sexual_reproductive_health') {
    return showSexualReproductiveHealthDescription();
  } else {
    return botui.message.bot({
      delay: 400,
      loading: true,
      content: 'Opción inválida. Por favor, elige una opción válida.',
    });
  }
}

function showMessageBeforeLearnMenu() {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: 'Contamos con material interactivo que te permitirá conocer más sobre estos temas.',
  }).then(showLearnSubMenu); // Mostrar el menú de aprendizaje después del mensaje
}

// Función para mostrar el menú de opciones de aprendizaje
function showLearnSubMenu() {
  return botui.action.button({
    delay: 300,
    action: [
      { text: 'Relaciones', value: 'relationships' },
      { text: 'Valores', value: 'values' },
      { text: 'Cómo entender el género', value: 'gender_understanding' },
      { text: 'Violencia y Seguridad personal', value: 'violence_safety' },
      { text: 'Habilidades para la salud y bienestar', value: 'health_wellness_skills' },
      { text: 'El cuerpo humano y el desarrollo', value: 'human_body_development' },
      { text: 'Sexualidad y conducta sexual', value: 'sexuality_sexual_behavior' },
      { text: 'Salud sexual y reproductiva', value: 'sexual_reproductive_health' },
    ],
  }).then((res) => {
    const selectedOption = res.value;
    return showDescription(selectedOption); // Mostrar la descripción según la opción seleccionada
  }).then(() => {
    return botui.message.bot({
      delay: 800,
      loading: true,
      content: '¿Tienes alguna otra duda, ' + name + '?',
    });
  }).then(askMoreQuestions) // Preguntar si el usuario tiene más dudas
  .then((res) => {
    const moreQuestions = res.value.toLowerCase();
    if (moreQuestions === 'yes') {
      return showLearnSubMenu(); // Mostrar el menú de Aprender nuevamente si el usuario tiene más dudas
    } else if (moreQuestions === 'no') {
      showMainMenu(); // Mostrar el menú de Sobre nosotros, Aprender... si el usuario no tiene más dudas
    
    } else {
      return botui.message.bot({
        delay: 500,
        loading: true,
        content: 'No comprendo tu respuesta. Por favor, responde con "Si" o "No".',
      }).then(askMoreQuestions);
    }
  });
}






botui.message.bot({
  delay: 500,
  content: 'Hola, soy SexiBot. Contestaré toda tus dudas acerca de cómo navegar en nuestra página.',
  loading: true,
})
.then(() => {
  return botui.message.bot({
    delay: 500,
    loading: true,
    content: '¿Cómo te sientes el día de hoy?',
  });
})
.then(() => {
  return botui.action.button({
    delay: 300,
    action: [
      { text: 'Bien', value: 'good' },
      { text: 'Muy bien', value: 'really_good' },
      { text: 'Excelentemente bien', value: 'awfully_good' },
    ],
  });
})
.then((res) => {
  return botui.message.bot({
    delay: 400,
    loading: true,
    content: '¡Qué bien que te sientas ' + res.text.toLowerCase() + '!',
  });
})
.then(() => {
  return botui.message.bot({
    delay: 700,
    loading: true,
    content: 'Antes de comenzar, ¿cómo te llamas?',
  });
})
.then(() => {
  return botui.action.text({
    delay: 400,
    action: {
      size: 18,
      icon: 'user-circle-o',
      sub_type: 'text',
    },
  });
})
.then((res) => {
  name = res.value; // Guardar el nombre ingresado por el usuario
  return botui.message.bot({
    delay: 300,
    loading: true,
    content: 'Mucho gusto ' + name + '! ![hello image](https://media1.giphy.com/media/QTaNqfIczYL0iY4udO/giphy.gif)',
  });
})
.then(() => {
  return botui.message.bot({
    delay: 300,
    loading: true,
    content: '¿En qué te puedo ayudar el día de hoy, ' + name + ' ?',
  });
})
.then(showMainMenu) // Mostrar el menú principal



.catch((err) => {
  // Manejo de errores, si es necesario
  console.error(err);
});
