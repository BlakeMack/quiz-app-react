import { useEffect, useState } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'
import { nanoid } from 'nanoid'

function App() {
  const [start, setStart] = useState(false)
  const [quizData, setQuizData] = useState(false)
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState([])
  const [answers, setAnswers] = useState(false)

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
    .then(res => res.json())
    .then(data => setQuizData(data.results.map((result) => {
      return (
        {...result, answers: [
          {
            answer: result.incorrect_answers[0],
            isSelected: false,
            isCorrect: "undetermined",
            id: nanoid()
          },
          {
            answer: result.incorrect_answers[1],
            isSelected: false,
            isCorrect: "undetermined",
            id: nanoid()
          },
          {
            answer: result.incorrect_answers[2],
            isSelected: false,
            isCorrect: "undetermined",
            id: nanoid()
          },
          {
            answer: result.correct_answer,
            isSelected: false,
            isCorrect: "undetermined",
            id: nanoid()
          }
        ],
      }
      )
    }
    )
    )
    )
    setAnswers(quizData.answers)
  }, [start])

  function startQuiz () {
    setStart(true)
  }

  function selectAnswer (id) {
    console.log("select function ran onclick")
    setQuizData(prevdata => prevdata.map((result) => {
      const selectedAnswers = result.answers.some(function(e) {
        return e.id === id;
    });
      if (selectedAnswers) {
        return (
          {...result, answers:
            result.answers.map((answer) => {
            return (
                answer.id === id ? {...answer, isSelected: true} : {...answer, isSelected: false}
              // if that array of answers already contains an isSelected, just return the object, else select
              )
            })
          }
        )
      } else {
        return (
          {...result}
        )
      }
    }))
  }

  function checkAnswers () {
    let score = 0
    quizData.map((result) => {
      console.log(result.answers.find(({isSelected}) => isSelected === true).answer)
      console.log(result.correct_answer)
      const selectedAnswer = result.answers.find(({isSelected}) => isSelected === true).answer
      if (result.correct_answer === selectedAnswer) {
        setQuizData(prevdata => prevdata.map((result) => {
          return (
            {...result, answers: result.answers.map((answer) => {
              return (
                answer.isSelected ? {...answer, isCorrect: true} : {...answer, isCorrect: "not chosen"}
              )
            })}
          )
        }));
        console.log(result.answers)
      } else {
        setQuizData(prevdata => prevdata.map((result) => {
          return (
            {...result, answers: result.answers.map((answer) => {
              return (
                answer.isSelected ? {...answer, isCorrect: false} : {...answer, isCorrect: "unchosen"}
              )
            })}
          )
        }));
        console.log(result.answers)
      }
    })
  }

  const quizElements = start && quizData && quizData.map((quiz, index) => {
    // let shuffledAnswers = quiz.answers.sort(() => Math.random() - 0.5);
    return (
      <Quiz key={index} start={start} question={quiz.question} answers={quiz.answers} selectAnswer={selectAnswer} />
    )
  });


  const styles = {
    height: start ? "" : "800px"
  };


  return (
    <div className='App' style={styles}>
      {start ? quizElements : < Start handleClick={startQuiz}/>}
      { start && <div className='btn-container'>
        <button className='btn-submit' onClick={checkAnswers}>Check Answers</button>
      </div>}
    </div>
  )
}

export default App
