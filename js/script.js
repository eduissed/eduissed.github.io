const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Donde El Mensaje Se Almacena
let API_KEY = ""; // Variable para almacenar la API key ingresada por el usuario
const inputInitHeight = chatInput.scrollHeight;

// Función para solicitar la API key al usuario
const requestAPIKey = () => {
    API_KEY = prompt("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");
};

// Verificar si se proporciona una API key
if (!API_KEY) {
    requestAPIKey(); // Solicitar la API key si no está proporcionada
}

const createChatLi = (message, className) => {
    // Crea El Elemento <li>
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // Devuelve <li> 
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant, and responses should be in Spanish." },
                { role: "user", content: userMessage, language: "es" } // Set language to Spanish
            ],
            temperature: 0.7,
            max_tokens: 100
        })
    };

    // Envía el mensaje para obtener una respuesta
    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            // Accede a la respuesta de manera correcta
            messageElement.textContent = data.choices[data.choices.length - 1].message.content.trim();
        })
        .catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "Lo siento:( Algo salió mal, verifica tu conexión e intenta de nuevo.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Mensaje Ingresado Por El Usuario
    if (!userMessage) return;

    // Elimina El Texto Enviado
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Mostrar "Respondiendo..." mensaje mientras espera la respuesta
        const incomingChatLi = createChatLi("Respondiendo...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 15);
}

chatInput.addEventListener("input", () => {
    // Ajustar la altura del área de texto de entrada en función de su contenido
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // Si se pulsa la tecla Intro sin la tecla Mayús y la ventana
    // El ancho es superior a 800 px, maneja el chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

console.log("API_KEY:", API_KEY);
