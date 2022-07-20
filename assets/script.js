const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

//Perguntas
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
];

//Iniciar o jogo
function init(){
    //criar a priemira pergunta
    createQuestion(0)

}

//cria uma pergunta
function createQuestion(i){
    //limpar questão anterior
    const oldButton = answersBox.querySelectorAll("button");
    oldButton.forEach(function (btn) {
        btn.remove();
    })
    //Alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");
    questionText.textContent = questions[i].question;
    questionNumber.textContent = i+1;

    //Insere as alternativas
    questions[i].answers.forEach(function(answer, i){
        //Cria o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];

        answerText.textContent = answer['answer'];
        
        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        //Remove hide e template class]
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");  
        
        //Inserir a alternativa
        answersBox.appendChild(answerTemplate);

        //Insere um evento de click no botão
        answerTemplate.addEventListener("click", function(){
            checkAnswer(this)
        });
    });

    //Incrementar o numero da questao
    actualQuestion++;
}

//verificando resposta do usuário
function checkAnswer(btn){
    const buttons = answersBox.querySelectorAll("button");
    buttons.forEach(function (button) {
        if(button.getAttribute("correct-answer") === "true"){
            button.classList.add("correct-answer");
            //checa se o user acertou a pergunta
            if(btn ===  button){
                //incremento os pontos
                points++;
            }
        }else{
            button.classList.add("wrong-answer");
        }       
    })

    //Exibir proxima pergunta

    nextQuestion()
}

function nextQuestion(){
    //timer para o usuarios ver as repostas
    setTimeout(function () {
        //verifica se ainda há perguntas
        if(actualQuestion >= questions.length){
            //Apresenta msg de sucesso
            showSucccessMessage();
            return;
        }
        createQuestion(actualQuestion);

    }, 1000)
}

function showSucccessMessage(){
    quizzContainer.classList.toggle("hide");
    //toggle = Se tem, remove, se não tem, adiciona.
    scoreContainer.classList.toggle("hide");

    //calcular o score

    const score = ((points/questions.length)* 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");
    displayScore.textContent = score.toString();

    //Alterar o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    //Alterar o total de perguntas

    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length.toString();

}

//Reiniciar quizz

const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function(){
    //zerar o jogo
    actualQuestion = 0;
    points = 0;
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
    init();
});
//inicializa o jogo
init();