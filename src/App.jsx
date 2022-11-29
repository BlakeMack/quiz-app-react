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
    .then(data => setQuizData(data.results.map((result) => {
      return (
        {...result, answers: [
          {
            answer: result.incorrect_answers[0],
            isSelected: false,
            isCorrect: false,
          },
          {
            answer: result.incorrect_answers[1],
            isSelected: false,
            isCorrect: false,
          },
          {
            answer: result.incorrect_answers[2],
            isSelected: false,
            isCorrect: false,
          },
          {
            answer: result.correct_answer,
            isSelected: false,
            isCorrect: true
          }
        ],
      }
      )
    })));
  }, [start])


  // Goal: implement the isselcted functionality to the quiz component
  // method: add an iselected and iscorrect to each objects question
  // consider the dice tenzies, for every die on page, there was a dice object, in this case there are multiple quiz objects containing questions
  // consider adding an isselected to the quiz data state directly, if not in a seperate quiz question state

  function startQuiz () {
    setStart(true)
  }

  function selectAnswer () {

  }

  const quizElements = start && quizData && quizData.map((quiz, index) => {
    // let shuffledAnswers = quiz.answers.sort(() => Math.random() - 0.5);
    return (
      <Quiz key={index} start={start} question={quiz.question} answers={quiz.answers} isSelected={false}/>
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
