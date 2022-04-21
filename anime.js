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
        question: 'In which year was Sailor Moon first adapted into an anime?',
        choice1: '1992',
        choice2: '1989',
        choice3: '1995',
        choice4: '2001',
        answer: 1,
    },
    {
        question: 'Which company animated Attack on Titan season 4?',
        choice1: 'P.A.Works',
        choice2: 'Toei Animation',
        choice3: 'MAPPA',
        choice4: 'Ufotable',
        answer: 3,
    },
    {
        question: 'Who is the creator of Your Name/Kimi no na wa?',
        choice1: 'Mari Okada',
        choice2: 'Makoto Shinkai',
        choice3: 'Tsugumi Ohba',
        choice4: 'Masashi Kishimoto',
        answer: 2,
    },
    {
        question: 'What is Bourbons real name is Detective Conan?',
        choice1: 'Hattori Heiji',
        choice2: 'Kyogoku Makoto',
        choice3: 'Okiya Subaru',
        choice4: 'Furuya Rei',
        answer: 4,
    },
    {
        question: 'Which anime is NOT made by Ai Yazawa?',
        choice1: 'Princess Jellyfish',
        choice2: 'Nana',
        choice3: 'Paradise Kiss',
        choice4: 'Gokinjo Monogatari',
        answer: 1,
    },
    {
        question: 'What is the name of Edwards brother in Fullmetal Alchemist?',
        choice1: 'Alex',
        choice2: 'Alphonse',
        choice3: 'Isaac',
        choice4: 'Berthold',
        answer: 2,
    },
    {
        question: 'Who became the Avatar in Oban Star Racers?',
        choice1: 'Aikka',
        choice2: 'Sul',
        choice3: 'Canaletto',
        choice4: 'Jordan',
        answer: 4,
    },
    {
        question: 'Which devil fruit did Luffy eat in One Piece?',
        choice1: 'Fish-Fish fruit',
        choice2: 'Dark-Dark fruit',
        choice3: 'Gum-Gum fruit',
        choice4: 'Flower-Flower fruit',
        answer: 3,
    },
    {
        question: 'How is Marnie related to Anna in When Marnie Was There?',
        choice1: 'Marnie is Annas sister',
        choice2: 'Marnie is Annas grandmother',
        choice3: 'Marnie is Annas friend',
        choice4: 'Marnie is Annas cousin',
        answer: 2,
    },
    {
        question: 'Who taught Rudy magic in Mushoku Tensei Jobless Reincarnation?',
        choice1: 'Paul Greyrat',
        choice2: 'Eris Boreas Greyrat',
        choice3: 'Ruijerd Superdia',
        choice4: 'Roxy Migurdia',
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