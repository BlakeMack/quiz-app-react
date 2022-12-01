import { useEffect, useState } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'
import { nanoid } from 'nanoid'
import {decode} from 'html-entities';

function App() {
  const [start, setStart] = useState(false)
  const [quizData, setQuizData] = useState(false)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [isScored, setIsScored] = useState(false)

  useEffect(() => { start &&
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
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
        setAnswers(prevanswers => [...prevanswers, selectedAnswers])
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

  function checkAnswers() {
    console.log("checking answers....")
    if (answers.length === 10) {
      setIsScored(true)
      setQuizData(prevdata => prevdata.map((result) => {
        let selectedAnswer = result.answers.find(({isSelected}) => isSelected === true).answer;
        console.log(selectedAnswer);
        console.log(result.correct_answer);
        console.log(selectedAnswer === result.correct_answer);
        if (result.correct_answer === selectedAnswer) {
          setScore(prevscore => prevscore + 0.5)
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
      console.log("You need to select all the answers first")
    }
  }


  function playAgain () {
    setStart(false)
    setQuizData(false)
    setScore(0)
    setIsScored(false)
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
      { start && !isScored && <div className='btn-container'>
        <button className='btn-submit' onClick={checkAnswers}>Check Answers</button>
      </div>
    }
    <div className='play-again'>
        { start && isScored &&
        <h1 className='score-counter'>You scored {score}/5 correct answers</h1>
      }
      { start && isScored &&
        <button className='btn-play' onClick={playAgain}>Play again</button>
    }
    </div>
    </div>
  )
}

export default App
