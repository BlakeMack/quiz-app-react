import { useEffect, useState } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
  const [start, setStart] = useState(false)
  const [quizData, setQuizData] = useState({})
  const [questions, setQuestions] = useState([1, 2, 3, 4, 5])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
    .then(res => res.json())
    .then(data => setQuizData(data.results))
    console.log(quizData)
  }, [start])

  function startQuiz () {
    setStart(true)
  }

  function selectAnswer () {

  }

  function chooseAnswer() {
    setSelected(prev => prev.push())
  }


  const quizElements = start && quizData.map((result, index) => {
    result.incorrect_answers.push(result.correct_answer);
    const answers = result.incorrect_answers;
    console.log(answers);
    let shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    return (
      <Quiz key={index} start={start} question={result.question} answers={shuffledAnswers} isSelected={false}/>
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
