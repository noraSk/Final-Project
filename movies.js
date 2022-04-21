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
        question: 'What song plays over the opening credits of Guardians of the Galaxy?',
        choice1: 'Hooked on a Feeling - Blue Swede',
        choice2: 'Come and Get Your Love - Redbone',
        choice3: 'Cherry Bomb - The Runaway',
        choice4: 'Go all the Way - Raspberries',
        answer: 2,
    },
    {
        question: 'What is the highest grossing R-rated movie of all time?',
        choice1: 'Lucy',
        choice2: 'The Matrix',
        choice3: 'The Joker',
        choice4: 'Gladiator',
        answer: 3,
    },
    {
        question: 'Who played Detective Rick Deckard in Blade Runner?',
        choice1: 'Rutger Hauer',
        choice2: 'Harrison Ford',
        choice3: 'Edward James',
        choice4: 'Ryan Gosling',
        answer: 2,
    },
    {
        question: 'How many Oscars has Meryl Streep won?',
        choice1: '21',
        choice2: '9',
        choice3: '3',
        choice4: '1',
        answer: 3,
    },
    {
        question: 'What is the name of Rileys imaginary friend in Inside Out',
        choice1: 'Bing Bong',
        choice2: 'Woody',
        choice3: 'Sebastian',
        choice4: 'Harry',
        answer: 1,
    },
    {
        question: 'Who of these actors did NOT play Spider Man?',
        choice1: 'Tobey Maguire',
        choice2: 'Tom Holland',
        choice3: 'Chris Hemsworth',
        choice4: 'Andrew Garfield',
        answer: 3,
    },
    {
        question: 'Which US President gives Kevin directions in Home Alone 2?',
        choice1: 'Donald Trump',
        choice2: 'George W. Bush',
        choice3: 'Barack Obama',
        choice4: 'Bill Clinton',
        answer: 1,
    },
    {
        question: 'Where were The Lord of the Rings movies filmed?',
        choice1: 'Iceland',
        choice2: 'Ireland',
        choice3: 'Austalia',
        choice4: 'New Zealand',
        answer: 4,
    },
    {
        question: 'When was the first Mission: Impossible movie released?',
        choice1: '1993',
        choice2: '1996',
        choice3: '1997',
        choice4: '1999',
        answer: 2,
    },
    {
        question: 'What was the name of the first film in the Harry Potter series?',
        choice1: 'Harry Potter and the Philisophers Stone',
        choice2: 'Harry Potter and the Prisoner of Azkaban',
        choice3: 'Harry Potter and the Half-Blood Prince',
        choice4: 'Harry Potter and the Chamber of secrets',
        answer: 1,
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