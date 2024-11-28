// Perguntas do quiz com imagens associadas aos personagens
const quizData = [
    {
        question: "Como você prefere passar seu tempo livre?",
        options: [
            { text: "Malhando", character: "Raya Torn", image: "./imagens/CARTA27.png" },
            { text: "Estudando", character: "Venotrix", image: "./imagens/CARTA24.png" },
            { text: "Explorarando novos lugares", character: "Finneas", image: "./imagens/CARTA20.png" },
            { text: "Lendo", character: "Mac coy", image: "./imagens/CARTA21.png" },
        ]
    },
    {
        question: "Se você tem um problema para resolver, como reage?",
        options: [
            { text: "Enfrento de imediato", character: "Arkos", image: "./imagens/CARTA25.png" },
            { text: "Penso um pouco antes", character: "Elden", image: "./imagens/CARTA22.png" },
            { text: "Peço ajuda", character: "Reika", image: "./imagens/CARTA23.png" },
            { text: "Inovo", character: "Ruka", image: "./imagens/CARTA26.png" },
        ]
    },
    {
        question: "Se algo não sai como o esperado, como você lida com isso?",
        options: [
            { text: "Sigo em frente", character: "Raya Torn", image: "./imagens/CARTA27.pngs" },
            { text: "Penso no que deu errado", character: "Venotrix", image: "./imagens/CARTA24.png" },
            { text: "Quebro tudo", character: "Arkos", image: "./imagens/CARTA25.png" },
            { text: "Deixo pra lá", character: "Ruka", image: "./imagens/CARTA26.png" },
        ]
    }
];

// Variáveis para controle
let currentQuestionIndex = 0;
const answers = [];

// Referências do DOM
const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");
const startButton = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");

// Função para exibir uma pergunta
function showQuestion(index) {
    const questionData = quizData[index];
    quizContainer.innerHTML = `<h3>${questionData.question}</h3>`;
    questionData.options.forEach((option, optIndex) => {
        const optionElement = document.createElement("div");
        optionElement.innerHTML = `
            <label>
                <input type="radio" name="question" value="${option.character}" data-image="${option.image}">
                ${option.text}
            </label>
        `;
        quizContainer.appendChild(optionElement);
    });

    // Controla a visibilidade dos botões
    nextButton.style.display = index < quizData.length - 1 ? "block" : "none";
    submitButton.style.display = index === quizData.length - 1 ? "block" : "none";
}

// Função para salvar a resposta e avançar
function handleNext() {
    const selectedOption = document.querySelector("input[name='question']:checked");
    if (!selectedOption) {
        alert("Por favor, escolha uma opção!");
        return;
    }
    answers[currentQuestionIndex] = selectedOption.value;
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion(currentQuestionIndex);
    }
}

// Função para calcular o resultado
function calculateResult() {
    const selectedOption = document.querySelector("input[name='question']:checked");
    if (!selectedOption) {
        alert("Por favor, escolha uma opção!");
        return;
    }
    answers[currentQuestionIndex] = selectedOption.value;

    const characterPoints = {};
    const characterImages = {};

    // Conta os pontos e associa imagens
    answers.forEach(answer => {
        const option = quizData
            .flatMap(q => q.options)
            .find(opt => opt.character === answer);
        if (option) {
            characterPoints[answer] = (characterPoints[answer] || 0) + 1;
            characterImages[answer] = option.image;
        }
    });

    // Determina o personagem com mais pontos
    let resultCharacter = null;
    let maxPoints = 0;
    for (const character in characterPoints) {
        if (characterPoints[character] > maxPoints) {
            maxPoints = characterPoints[character];
            resultCharacter = character;
        }
    }

    const resultImage = characterImages[resultCharacter];
    quizContainer.style.display = "none";
    nextButton.style.display = "none";
    submitButton.style.display = "none";
    resultContainer.innerHTML = `
        <h2>Você é ${resultCharacter}!</h2>
        <img src="${resultImage}" alt="${resultCharacter}" style="width:200px; border-radius:10px;">
        <button id="retry-btn">Tentar Novamente</button>
    `;
    document.getElementById("retry-btn").addEventListener("click", restartQuiz);
}

// Função para reiniciar o quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    answers.length = 0;
    resultContainer.innerHTML = "";
    quizContainer.style.display = "block";
    showQuestion(currentQuestionIndex);
    startScreen.style.display = "none";
}

// Evento de iniciar o quiz
startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion(currentQuestionIndex);
});

// Eventos
nextButton.addEventListener("click", handleNext);
submitButton.addEventListener("click", calculateResult);

// Inicializa a tela de início
startScreen.style.display = "block";
quizContainer.style.display = "none";
resultContainer.style.display = "none";



// Função para calcular o resultado
function calculateResult() {
    const selectedOption = document.querySelector("input[name='question']:checked");
    if (!selectedOption) {
        alert("Por favor, escolha uma opção!");
        return;
    }
    answers[currentQuestionIndex] = selectedOption.value;

    const characterPoints = {};
    const characterImages = {};

    // Conta os pontos e associa imagens
    answers.forEach(answer => {
        const option = quizData
            .flatMap(q => q.options)
            .find(opt => opt.character === answer);
        if (option) {
            characterPoints[answer] = (characterPoints[answer] || 0) + 1;
            characterImages[answer] = option.image;
        }
    });

    // Determina o personagem com mais pontos
    let resultCharacter = null;
    let maxPoints = 0;
    for (const character in characterPoints) {
        if (characterPoints[character] > maxPoints) {
            maxPoints = characterPoints[character];
            resultCharacter = character;
        }
    }

    const resultImage = characterImages[resultCharacter];
    
    // Exibe o resultado
    quizContainer.style.display = "none";
    nextButton.style.display = "none";
    submitButton.style.display = "none";
    resultContainer.style.display = "block"; // Exibe a área do resultado
    resultContainer.innerHTML = `
        <h2>Você é ${resultCharacter}!</h2>
        <img src="${resultImage}" alt="${resultCharacter}" style="width:200px; border-radius:10px;">
        <button id="retry-btn">Tentar Novamente</button>
    `;
    document.getElementById("retry-btn").addEventListener("click", restartQuiz);
}

// Função para reiniciar o quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    answers.length = 0;
    resultContainer.innerHTML = "";
    quizContainer.style.display = "block";
    resultContainer.style.display = "none"; // Esconde o resultado
    showQuestion(currentQuestionIndex);
}
