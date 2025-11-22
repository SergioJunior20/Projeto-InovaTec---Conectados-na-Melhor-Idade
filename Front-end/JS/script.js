// Dados do usuário
let currentUser = {
    name: '',
    confidence: 0,
    level: 'Iniciante Total',
    answers: []
};

// Perguntas do quiz
const quizQuestions = [
    {
        question: "O quanto você se sente à vontade em mexer em um celular?",
        options: [
            "Nunca usei - Sou iniciante total",
            "Uso pouco - Só atendo chamadas",
            "Uso bem - Consigo mandar mensagens",
            "Uso bastante - Fotos, redes sociais e mais"
        ],
        scores: [1, 2, 3, 4]  // Alterado para 1-4 em vez de 0-3
    },
    {
        question: "Você sabe usar o WhatsApp?",
        options: [
            "Não sei o que é",
            "Só atendo ligações",
            "Consigo mandar mensagens",
            "Mando fotos, áudios e faço videochamadas"
        ],
        scores: [1, 2, 3, 4]  // Alterado para 1-4
    },
    {
        question: "Como você lida com fotos no celular?",
        options: [
            "Não tiro fotos",
            "Consigo tirar, mas não sei enviar",
            "Tiro e envio para contatos",
            "Organizo álbuns e compartilho nas redes"
        ],
        scores: [1, 2, 3, 4]  // Alterado para 1-4
    },
    {
        question: "Você já fez alguma transação pelo celular?",
        options: [
            "Nunca - Tenho medo",
            "Já visualizei extrato",
            "Fiz transferência com ajuda",
            "Faço PIX e pagamentos sozinho(a)"
        ],
        scores: [1, 2, 3, 4]  // Alterado para 1-4
    },
    {
        question: "Como você se sente com tecnologia?",
        options: [
            "Fico nervoso(a) e evito",
            "Uso só o necessário",
            "Gosto de aprender coisas novas",
            "Adoro tecnologia e sempre quero mais"
        ],
        scores: [1, 2, 3, 4]  // Alterado para 1-4
    }
];

// Tutorial de PIX
const pixTutorial = {
    title: "Aprendendo a Fazer PIX",
    subtitle: "Transferências rápidas e seguras",
    steps: [
        {
            instruction: "Abra o aplicativo do seu banco",
            simulation: "mostrarAppBanco"
        },
        {
            instruction: "Toque em 'PIX' ou 'Transferência'",
            simulation: "mostrarMenuPix"
        },
        {
            instruction: "Escolha 'Fazer PIX'",
            simulation: "mostrarOpcaoFazerPix"
        },
        {
            instruction: "Digite a chave PIX do destinatário",
            simulation: "mostrarCampoChavePix"
        },
        {
            instruction: "Confirme os dados e valor",
            simulation: "mostrarConfirmacaoPix"
        },
        {
            instruction: "Digite sua senha para autorizar",
            simulation: "mostrarCampoSenha"
        }
    ]
};

// Variáveis globais
let currentQuestionIndex = 0;
let currentPixStep = 0;

// Funções de navegação
function showScreen(screenId) {
    // Esconder todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar a tela selecionada
    document.getElementById(screenId).classList.add('active');
}

function saveName() {
    const userName = document.getElementById('userName').value.trim();
    
    if (!userName) {
        alert('Por favor, digite seu nome!');
        return;
    }
    
    currentUser.name = userName;
    startQuiz();
}

// Sistema do Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    currentUser.answers = [];
    showScreen('quizScreen');
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    
    // Atualizar barra de progresso
    const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('progressFill').style.width = `${progressPercentage}%`;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(optionElement, index);
        optionsContainer.appendChild(optionElement);
    });
    
    // Controlar visibilidade dos botões
    document.getElementById('prevBtn').style.display = currentQuestionIndex > 0 ? 'block' : 'none';
    document.getElementById('nextBtn').textContent = 
        currentQuestionIndex === quizQuestions.length - 1 ? 'Finalizar' : 'Próxima Pergunta';
}

function selectOption(optionElement, optionIndex) {
    // Remover seleção anterior
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Selecionar nova opção
    optionElement.classList.add('selected');
    
    // Salvar resposta
    currentUser.answers[currentQuestionIndex] = optionIndex;
}

function nextQuestion() {
    if (currentUser.answers[currentQuestionIndex] === undefined) {
        alert('Por favor, selecione uma opção!');
        return;
    }
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showQuizResult();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function showQuizResult() {
    // Calcular pontuação
    let totalScore = 0;
    currentUser.answers.forEach((answer, index) => {
        totalScore += quizQuestions[index].scores[answer];
    });
    
    const maxScore = quizQuestions.length * 4; // 4 pontos por pergunta máxima
    const minScore = quizQuestions.length * 1; // 1 ponto por pergunta mínima
    
    // Determinar nível do usuário baseado na pontuação real
    let userLevel, message;
    
    // Pontuação máxima possível: 5 questões × 4 pontos = 20
    // Pontuação mínima possível: 5 questões × 1 ponto = 5
    
    if (totalScore <= 8) { // 5-8 pontos
        userLevel = "Iniciante Total";
        message = "Vamos começar do básico! Você vai aprender tudo passo a passo.";
    } else if (totalScore <= 12) { // 9-12 pontos
        userLevel = "Iniciante";
        message = "Você já tem alguma experiência! Vamos fortalecer seus conhecimentos.";
    } else if (totalScore <= 16) { // 13-16 pontos
        userLevel = "Intermediário";
        message = "Que bom! Você já sabe bastante. Vamos aprender coisas mais avançadas.";
    } else { // 17-20 pontos
        userLevel = "Avançado";
        message = "Parabéns! Você domina o celular. Vamos explorar funcionalidades extras!";
    }
    
    // Atualizar perfil do usuário
    currentUser.confidence = Math.round(((totalScore - minScore) / (maxScore - minScore)) * 100);
    currentUser.level = userLevel;
    
    // Atualizar tela de resultado
    document.getElementById('userNameDisplay').textContent = currentUser.name;
    document.getElementById('userScore').textContent = `${totalScore}/${maxScore}`;
    document.getElementById('resultMessage').textContent = message;
    
    showScreen('resultScreen');
}

function startApp() {
    // Usar apenas o primeiro nome do usuário na saudação
    const firstName = currentUser.name.split(' ')[0];
    document.getElementById('userGreeting').textContent = `Olá, ${firstName}! Seu nível: ${currentUser.level}`;
    showScreen('appScreen');
}

function showAppSection(sectionId) {
    // Esconder todas as seções
    document.querySelectorAll('.app-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remover active de todos os botões
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar seção selecionada
    document.getElementById(sectionId).classList.add('active');
    
    // Ativar botão correspondente
    event.target.classList.add('active');
}

// Tutorial de PIX
function nextPixStep() {
    if (currentPixStep < pixTutorial.steps.length - 1) {
        currentPixStep++;
        updatePixStep();
    } else {
        alert('Parabéns! Agora você sabe fazer PIX com segurança!');
    }
}

function previousPixStep() {
    if (currentPixStep > 0) {
        currentPixStep--;
        updatePixStep();
    }
}

function updatePixStep() {
    const step = pixTutorial.steps[currentPixStep];
    document.getElementById('pixStep').textContent = step.instruction;
    
    // Simular a tela do aplicativo
    const display = document.getElementById('pixDisplay');
    const emojis = {
        'mostrarAppBanco': '🏦',
        'mostrarMenuPix': '💰',
        'mostrarOpcaoFazerPix': '📤',
        'mostrarCampoChavePix': '🔑',
        'mostrarConfirmacaoPix': '✅',
        'mostrarCampoSenha': '🔒'
    };
    
    const descriptions = {
        'mostrarAppBanco': 'Aplicativo do seu banco',
        'mostrarMenuPix': 'Menu de opções do PIX',
        'mostrarOpcaoFazerPix': 'Toque em "Fazer PIX"',
        'mostrarCampoChavePix': 'Digite a chave PIX do destinatário',
        'mostrarConfirmacaoPix': 'Confirme os dados da transferência',
        'mostrarCampoSenha': 'Digite sua senha para autorizar'
    };
    
    display.innerHTML = `
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:20px;">
            <div style="font-size:48px;">${emojis[step.simulation] || '💰'}</div>
            <div style="text-align:center;padding:20px;font-size:18px;color:#666;">
                ${descriptions[step.simulation] || 'Siga as instruções na tela.'}
            </div>
        </div>
    `;
}

// Funções auxiliares
function showHelp() {
    alert("Ajuda: Toque em qualquer item para aprender sobre ele! Use o botão 🆘 se precisar de assistência urgente.");
}

function restartQuiz() {
    if(confirm("Deseja refazer o questionário para atualizar seu nível de conhecimento?")) {
        showScreen('quizScreen');
        startQuiz();
    }
}

function startTraining() {
    alert("Iniciando área de treino seguro! Aqui você pode praticar sem medo de errar.");
    // Aqui você implementaria a lógica do treino seguro
}

function startTutorial(tutorialType) {
    const tutorialNames = {
        'whatsapp': 'WhatsApp',
        'fotos': 'Tirar e Enviar Fotos',
        'videochamada': 'Videochamadas'
    };
    
    alert(`Iniciando tutorial: ${tutorialNames[tutorialType]}`);
    // Aqui você implementaria a lógica específica para cada tipo de tutorial
}

function startPractice(practiceType) {
    const practiceNames = {
        'icones': 'Encontre o Ícone',
        'arrastar': 'Arraste e Solte',
        'quiz': 'Perguntas e Respostas'
    };
    
    alert(`Iniciando prática: ${practiceNames[practiceType]}`);
    // Aqui você implementaria a lógica específica para cada tipo de prática
}

function submitSuggestion() {
    const suggestionText = document.getElementById('suggestionText').value.trim();
    
    if (!suggestionText) {
        alert('Por favor, escreva sua sugestão!');
        return;
    }
    
    alert('Obrigado pela sua sugestão! Vamos analisar com carinho. 💖');
    
    document.getElementById('suggestionText').value = '';
}

function activateHelp() {
    alert('Sua família foi avisada! Eles entrarão em contato em breve.');
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o tutorial de PIX
    if (document.getElementById('pixDisplay')) {
        updatePixStep();
    }
});