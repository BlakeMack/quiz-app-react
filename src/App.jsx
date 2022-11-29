import { useEffect, useState } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
  const [start, setStart] = useState(false)
  const [quizData, setQuizData] = useState(false)
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
    .then(res => res.json())
    .then(data => setQuizData(data.results));
  }, [start])


  // Goal: implement the isselcted functionality to the quiz component
  // method: add an iselected and iscorrect to each objects question
  // consider changing this second use effect or removing it
  // look into .map changing state unintentionally
  // try to implement the isSelected feature
  // consider the dice tenzies, for every die on page, there was a dice object, in this case there are multiple quiz objects containing questions
  // consider adding an isselected to the quiz data state directly, if not in a seperate quiz question state
  useEffect(() => {
    quizData &&
    quizData.map((quiz) => console.log(quiz))
  }, [quizData])



  function startQuiz () {
    setStart(true)
  }

  function selectAnswer () {

  }

  function chooseAnswer() {

  }


  const quizElements = start && quizData && quizData.map((quiz, index) => {
    const answers = [...quiz.incorrect_answers, quiz.correct_answer]
    let shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    return (
      <Quiz key={index} start={start} question={quiz.question} answers={shuffledAnswers} isSelected={false}/>
    )
  });


  const styles = {
    height: start ? "" : "800px"
  };


  return (
    <div className='App' style={styles}>
      {start ? quizElements : < Start handleClick={startQuiz}/>}
      { start && <div className='btn-container'>
        <button className='btn-submit'>Check Answers</button>
      </div>}
    </div>
  )
}

export default App
