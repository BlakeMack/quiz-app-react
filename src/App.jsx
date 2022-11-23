import { useEffect, useState } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
  const [start, setStart] = useState(false)
  const [quizData, setQuizData] = useState({})
  const [questions, setQuestions] = useState([1, 2, 3, 4, 5])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
    .then(res => res.json())
    .then(data => setQuizData(data))
    console.log(quizData)
  }, [start])

  function startQuiz () {
    setStart(true)
  }
  const quizElements = questions.map((question, index) =>
    <Quiz key={index} start={start}/>
  );

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
