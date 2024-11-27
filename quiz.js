// Perguntas do quiz com imagens associadas aos personagens
const quizData = [
    {
        question: "Qual sua casa de Hogwarts?",
        options: [
            { text: "Grifinória", character: "Harry Potter", image: "https://example.com/harry.jpg" },
            { text: "Sonserina", character: "Draco Malfoy", image: "https://example.com/draco.jpg" },
            { text: "Lufa-Lufa", character: "Cedrico Diggory", image: "https://example.com/cedrico.jpg" },
            { text: "Corvinal", character: "Luna Lovegood", image: "https://example.com/luna.jpg" },
        ]
    },
    {
        question: "Qual sua qualidade mais forte?",
        options: [
            { text: "Coragem", character: "Harry Potter", image: "https://example.com/harry.jpg" },
            { text: "Astúcia", character: "Draco Malfoy", image: "https://example.com/draco.jpg" },
            { text: "Lealdade", character: "Cedrico Diggory", image: "https://example.com/cedrico.jpg" },
            { text: "Criatividade", character: "Luna Lovegood", image: "https://example.com/luna.jpg" },
        ]
    },
    {
        question: "O que você prefere fazer no seu tempo livre?",
        options: [
            { text: "Aventuras", character: "Harry Potter", image: "https://example.com/harry.jpg" },
            { text: "Planejar estratégias", character: "Draco Malfoy", image: "https://example.com/draco.jpg" },
            { text: "Ajudar amigos", character: "Cedrico Diggory", image: "https://example.com/cedrico.jpg" },
            { text: "Explorar ideias novas", character: "Luna Lovegood", image: "https://example.com/luna.jpg" },
        ]
    }
];

// Variáveis para controle
let currentQuestionIndex = 0;
let answers = [];

// Referências do DOM
const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");

// Função para exibir uma pergunta
function showQuestion(index) {
    const questionData = quizData[index];
    quizContainer.innerHTML = `<h3>${questionData.question}</h3>`;
    questionData.options.forEach((option) => {
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
        <button id="retry">Tentar Novamente</button>
    `;

    // Adiciona o evento de "Tentar Novamente"
    document.getElementById("retry").addEventListener("click", restartQuiz);
}

// Função para reiniciar o quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    answers = [];
    resultContainer.innerHTML = "";
    quizContainer.style.display = "block";
    showQuestion(currentQuestionIndex);
}

// Eventos
nextButton.addEventListener("click", handleNext);
submitButton.addEventListener("click", calculateResult);

// Carrega a primeira pergunta
showQuestion(currentQuestionIndex);
