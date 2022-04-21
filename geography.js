const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the capital of Australia?',
        choice1: 'Melbourne',
        choice2: 'Canberra',
        choice3: 'Sydney',
        choice4: 'Perth',
        answer: 2,
    },
    {
        question: 'Which country is NOT in the Balkans?',
        choice1: 'Slovakia',
        choice2: 'Greece',
        choice3: 'Albania',
        choice4: 'Romania',
        answer: 1,
    },
    {
        question: 'What is the tallest mountain in North America?',
        choice1: 'McArthur Peak',
        choice2: 'Mount Rushmore',
        choice3: 'Denali',
        choice4: 'King Peak',
        answer: 3,
    },
    {
        question: 'What is the capital of Sudan?',
        choice1: 'Nyala',
        choice2: 'Khartoum',
        choice3: 'Omdurman',
        choice4: 'Kosti',
        answer: 2,
    },
    {
        question: 'What is the oldest city in Texas?',
        choice1: 'Arlington',
        choice2: 'Nacogdoches',
        choice3: 'San Antonio',
        choice4: 'Houston',
        answer: 2,
    },
    {
        question: 'What is the capital of Albania?',
        choice1: 'Gjirokastra',
        choice2: 'Saranda',
        choice3: 'Tirana',
        choice4: 'Durresi',
        answer: 3,
    },
    {
        question: 'What is the longest river in Canada?',
        choice1: 'Yukon River',
        choice2: 'Churchill River',
        choice3: 'Fraser River',
        choice4: 'Mackenzie River',
        answer: 4,
    },
    {
        question: 'What is the name of the smallest country in the world?',
        choice1: 'Vatican City',
        choice2: 'Monaco',
        choice3: 'Malta',
        choice4: 'Barbados',
        answer: 1,
    },
    {
        question: 'Where is Machu Pichu located in?',
        choice1: 'Columbia',
        choice2: 'Peru',
        choice3: 'Bolivia',
        choice4: 'Chile',
        answer: 2,
    },
    {
        question: 'What type of leaf is in the Canadian flag?',
        choice1: 'Oak',
        choice2: 'Palm',
        choice3: 'Mapple',
        choice4: 'Aspen',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()