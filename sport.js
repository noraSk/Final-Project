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
        question: 'What sport is known as the King of Sports?',
        choice1: 'Football',
        choice2: 'Basketball',
        choice3: 'Tennis',
        choice4: 'Volleyball',
        answer: 1,
    },
    {
        question: 'The Olympics are held every how many years?',
        choice1: '7',
        choice2: '6',
        choice3: '5',
        choice4: '4',
        answer: 4,
    },
    {
        question: 'How many dimples does an average golf ball have?',
        choice1: '254',
        choice2: '336',
        choice3: '180',
        choice4: '423',
        answer: 2,
    },
    {
        question: 'How many medals did China win at the Beijing Olympics?',
        choice1: '12',
        choice2: '33',
        choice3: '54',
        choice4: '100',
        answer: 4,
    },
    {
        question: 'How many players are on a basketball team?',
        choice1: '9',
        choice2: '11',
        choice3: '8',
        choice4: '7',
        answer: 1,
    },
    {
        question: 'Which of these sports does NOT use a ball?',
        choice1: 'Polo',
        choice2: 'Golf',
        choice3: 'Hockey',
        choice4: 'Tennis',
        answer: 3,
    },
    {
        question: 'Which team is considered the oldest in NFL?',
        choice1: 'Chicago Bears',
        choice2: 'Minnesota Vikings',
        choice3: 'Green Bay Packers',
        choice4: 'New England Patriots',
        answer: 3,
    },
    {
        question: 'How old was the youngest professional football player?',
        choice1: '10',
        choice2: '15',
        choice3: '12',
        choice4: '13',
        answer: 3,
    },
    {
        question: 'How many rings are on the Olympic flag?',
        choice1: '6',
        choice2: '5',
        choice3: '8',
        choice4: '7',
        answer: 2,
    },
    {
        question: 'How many minutes was the longest recorded point in tennis?',
        choice1: '37 minutes',
        choice2: '43 minutes',
        choice3: '14 minutes',
        choice4: '29 minutes',
        answer: 4,
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