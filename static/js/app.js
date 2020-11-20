'{% block js %}'

const quiz = [
    {
        q : '{{ question }}' ,
        options : ['1','2','3'],
        answer :0,
    },
    {
      q : '{{ question }}' ,
      options : ['1','2','3'],
      answer :0,
  },
  {
    q : '{{ question }}' ,
    options : ['1','2','3'],
    answer :0,
  },
   ]
  
    alert('{{question}}')
    const Question_number = document.querySelector(".questionNumber")
    const Question = document.querySelector(".question")
    const optionContainer = document.querySelector('.choices')
    const Indicators_container = document.querySelector('.CorrectWrong')
    const QuizContainer = document.querySelector('.quizContainer')
    const ResultContainer = document.querySelector('.recordContainer')
    const StartBox = document.querySelector('.startContainer')
    const ProgressBar = document.querySelector(".quizContainer .ligneProgress div")
    const CprogressBar = document.querySelector(".quizContainer .ligneProgress")
    
    // Count The Number Of Questions
    let questionCounter = 0
    // For Current Question 
    let currentQuestion;
    // Set The Questions and the choices in the array
    let AvaliableQuestion = []
    let AvaliableOptions = []
    // Result 
    let AnsweredNumber = 0;
    let attempt = 0;
    // Push Question into Avalaible Question Array
    function SetAvalaibleQuestion() {
        const QuestionLen = quiz.length
        for(let i=0;i<QuestionLen;i++) {
            AvaliableQuestion.push(quiz[i]);
        }
    }
    /********************************************/
    // Set Questions and Choices , Number of Question
    function SetNewQuestion() {
        let animationDelay = 0.1
        Question_number.innerHTML = "Question "+ (  + 1)+" of " + '{{ questions_counter }}'
        let RandomQuestion = AvaliableQuestion[Math.floor(Math.random()*AvaliableQuestion.length)]
        currentQuestion = RandomQuestion
        Question.innerHTML = currentQuestion.q
        index1 = AvaliableQuestion.indexOf(RandomQuestion)
        AvaliableQuestion.splice(index1, 1)
        optionContainer.innerHTML = ""
        const OptionLen = currentQuestion.options.length
        /** Push The Options (Choices) **/
        for(let i=0;i<OptionLen;i++){
            AvaliableOptions.push(i)
        }
    
        for(let i=0;i<OptionLen;i++){
            let RandomOption = AvaliableOptions[Math.floor(Math.random()*AvaliableOptions.length)]
            index2 = AvaliableOptions.indexOf(RandomOption)
            AvaliableOptions.splice(index2, 1)
            const option = document.createElement('div')
            option.innerHTML = currentQuestion.options[RandomOption]
            option.id = RandomOption
            option.className = "option"
            option.style.animationDelay = animationDelay + 's'
            animationDelay += 0.1
            optionContainer.appendChild(option);
            option.setAttribute("onclick","getResult(this)")
        }
    /*********************************************/
        questionCounter++;
    }
    
    function getResult(element) {
        const id = parseInt(element.id)
        if(id === currentQuestion.answer) {
            element.classList.add("correct")
            setStatus("correct")
            AnsweredNumber++;
        }else {
            element.classList.add("wrong")
            setStatus("wrong")
            const OptionLen = optionContainer.children.length
            for(let i=0;i<OptionLen;i++){
                if(parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                    optionContainer.children[i].classList.add("correct")
                }
            }
        }
        clearInterval(TIMER)
        StatusDivProgress()
        attempt++;
        MakeOptionsUnclickable()
    }
    function StatusDivProgress() {
        CprogressBar.style.background = 'black'
        ProgressBar.style.background = 'black'
        CprogressBar.style.opacity = '50%'
        ProgressBar.style.opacity = '50%'
    }
    function setStatus(Status) {
        Indicators_container.children[questionCounter - 1].classList.add(Status)
    }
    function MakeOptionsUnclickable()
    {
        const OptionLen = optionContainer.children.length
    
        for(let i=0;i<OptionLen;i++){
            optionContainer.children[i].classList.add("DoneAnswered")
        }
    }
    function next() {
        if(questionCounter == quiz.length) {
            gameOver()
            SetResult()
        }else {
            ResetTimer()
            TIMER = setInterval(ProgressBr,1000)
            SetNewQuestion()
        }
    }
    function SetIndicators() {
        Indicators_container.innerHTML = ""
        NumberOfIndicators = quiz.length
        for(let i=0;i<NumberOfIndicators;i++) {
            const indicator = document.createElement('div')
            Indicators_container.appendChild(indicator)
        }
    }
    function gameOver() {
        QuizContainer.classList.add('hide')
        ResultContainer.classList.remove('hide')
    }
    function SetResult() {
        const TotalQeustions = document.querySelector('.total-question');
        const correctAnswers = document.querySelector('.Correct-Answers');
        const WrongAnswers = document.querySelector('.Wrong-Answers');
        const Attempt = document.querySelector('.Attempt');
        const Score = document.querySelector('.score');
        const persentage = document.querySelector('.percentage');
    
        TotalQeustions.innerHTML = quiz.length
        correctAnswers.innerHTML = AnsweredNumber
        Attempt.innerHTML = attempt
        Score.innerHTML = AnsweredNumber + " / " + quiz.length
        WrongAnswers.innerHTML = attempt - AnsweredNumber
        const percentag = (AnsweredNumber / quiz.length)*100
        persentage.innerHTML = percentag.toFixed(2)
    
    }
    
    function TryAgain() {
        ResultContainer.classList.add("hide")
        QuizContainer.classList.remove('hide')
        resetQuiz()
        ResetTimer()
        StartQuiz()
    }
    function GoHome() {
        ResultContainer.classList.add("hide")
        StartBox.classList.remove('hide')
        resetQuiz()
        ResetTimer()
    }
    function resetQuiz(){
         AnsweredNumber = 0;
         attempt = 0;
         questionCounter = 0
    }
    function StartQuiz (){
        StartBox.classList.add('hide')
        QuizContainer.classList.remove('hide')
        TIMER = setInterval(ProgressBr,1000)
        SetAvalaibleQuestion() 
        SetNewQuestion()
        SetIndicators()
    }
    function ResetTimer() {
        clearInterval(TIMER)
        count = 0
        ProgressBar.style.width = count + "%"
        ProgressBar.style.background = "green"
        CprogressBar.style.background = '#CACCCA'
        CprogressBar.style.opacity = '100%'
        ProgressBar.style.opacity = '100%'
    }
    /* TMER ENJOY FRIEND */
    let count = 0
    let TIMER;
    
    function ProgressBr() {
            count+= 10
            ProgressBar.style.width = count + "%"
            if(count == 100) {
                ResetTimer()
                next()
            }
            else if(count == 50) {
                ProgressBar.style.background = "orange"
            }else if (count >= 70){
                ProgressBar.style.background = "red"
            }
    }
    /* TMER ENJOY FRIEND */
    onload = function() {
        const nQ = document.querySelector('.numberQuestions')
        nQ.innerHTML = '{{ questions_counter }}'
    }


'{% endblock  %}'