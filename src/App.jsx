import { useEffect, useState } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'
import CheckAnswers from './components/CheckAnswers'
import PlayAgain from './components/PlayAgain'
import { nanoid } from 'nanoid'
import {decode} from 'html-entities'


function App() {
  const [start, setStart] = useState(false)
  const [quizData, setQuizData] = useState(false)
  const [score, setScore] = useState(0)
  const [isScored, setIsScored] = useState(false)
  const [formData, setFormData] = useState(
    {
        topic: 9,
        difficulty: "easy",
        amount: 5
    }
  )

  console.log(formData.topic)
  console.log(formData.difficulty)
  console.log(formData.amount)

  useEffect(() => { start &&
    fetch(`https://opentdb.com/api.php?amount=${formData.amount}&category=${formData.topic}&difficulty=${formData.difficulty}&type=multiple`)
    .then(res => res.json())
    .then(data => setQuizData(data.results.map((result) => {
      return (
        {...result, question: decode(result.question), answers: [
          {
            answer: decode(result.incorrect_answers[0]),
            isSelected: false,
            isCorrect: "undetermined",
            id: nanoid()
          },
          {
            answer: decode(result.incorrect_answers[1]),
            isSelected: false,
            isCorrect: "undetermined",
            id: nanoid()
          },
          {
            answer: decode(result.incorrect_answers[2]),
            isSelected: false,
            isCorrect: "undetermined",
            id: nanoid()
          },
          {
            answer: decode(result.correct_answer),
            isSelected: false,
            isCorrect: "undetermined",
            id: nanoid()
          }
        ].sort( () => .5 - Math.random() ),
      }
      )
    }
    )
    )
    )
  }, [start])

  function handleChange(event) {
    console.log(event)
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
  }

  // determine why this handle submit is being used
  function handleSubmit(event) {
    event.preventDefault();
  }

  function startQuiz () {
    setStart(true)
  }

  function selectAnswer (id) {
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

  function checkSelected () {
    let selectedAnswers = []
    quizData.map((result) => {
      let selectedAnswer = result.answers.find(({isSelected}) => isSelected === true);
      if (selectedAnswer) {
        selectedAnswers.push(selectedAnswer)
      }
    })
    return (selectedAnswers.length === quizData.length)
  }

  function checkAnswers() {
    if (checkSelected()) {
      setIsScored(true)
      setQuizData(prevdata => prevdata.map((result) => {
        let selectedAnswer = result.answers.find(({isSelected}) => isSelected === true).answer;
        if (result.correct_answer === selectedAnswer) {
          setScore(prevscore => prevscore + 1)
          return {...result, answers: result.answers.map((answer) => {
            return (
              answer.isSelected ? {...answer, isCorrect: true} : {...answer, isCorrect: "not chosen"}
            )
          })}
        } else {
          return {...result, answers: result.answers.map((answer) => {
            return (
              answer.isSelected ? {...answer, isCorrect: false} : {...answer, isCorrect: "not chosen"}
            )
          })}
        }
      }));
    } else {
      alert("Please select all the answers first")
    }
  }


  function playAgain () {
    setStart(false)
    setQuizData(false)
    setScore(0)
    setIsScored(false)
  }

  const quizElements = start && quizData && quizData.map((quiz, index) => {
    return (
      <Quiz key={index} start={start} question={quiz.question} answers={quiz.answers} selectAnswer={selectAnswer} category={quiz.category} />
    )
  });


  // no fixed height for the html elements rendered when the quiz is false
  // a fixed height is added when the quiz has not started, which means the html form is being rendered
  const styles = {
    height: start ? "" : "1000px"
  };


  return (
    <div className='App' style={styles}>
      <div className='background-paint-yellow'></div>
      <div className='background-paint-blue'></div>
      {/* if the quiz has started, evaluate the or expression. render quiz elements if they are available, if not render the loading quiz html element. if the quiz has not started, render the start jsx component */}
      {start ? quizElements || <h1 className='loading'>Loading Quiz...</h1> : < Start handleClick={startQuiz} handleChange={handleChange} handleSubmit={handleSubmit} value={formData}/>}
      {/* Render the CheckAnswers button component */}
      {start && <CheckAnswers isScored={isScored} checkAnswers={checkAnswers} />}
      {/* Render the PlayAgainSection component */}
      <PlayAgain isScored={isScored} score={score} quizData={quizData} playAgain={playAgain} />
    </div>
  )
}

export default App
