import { useEffect, useState } from 'react'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'
import { nanoid } from 'nanoid'
import {decode} from 'html-entities'

function App() {
  const [start, setStart] = useState(false)
  const [quizData, setQuizData] = useState(false)
  const [score, setScore] = useState(0)
  const [isScored, setIsScored] = useState(false)
  const [formData, setFormData] = useState(
    {
        topic: "",
        difficulty: ""
    }
  )

  console.log(formData.topic)
  console.log(formData.difficulty)

  function findCategoryNumber(string) {
    if (string === "General Knowledge") {
      return 9
    } else if (string === "Entertainment: Books") {
      return 10
    } else if (string === "Entertainment: Film") {
      return 11
    } else if (string === "Entertainment: Music") {
      return 12
    } else if (string === "Entertainment: Musicals and Theatres") {
      return 13
    } else if (string === "Entertainment: Television") {
      return 14
    } else if (string === "Entertainment: Video Games") {
      return 15
    } else if (string === "Entertainment: Board Games") {
      return 16
    } else if (string === "Science & Nature") {
      return 17
    } else if (string === "Science: Computers") {
      return 18
    } else if (string === "Science: Mathematics") {
      return 19
    }else if (string === "Mythology") {
      return 20
    } else if (string === "Sports") {
      return 21
    } else if (string === "Geography") {
      return 22
    } else if (string === "History") {
      return 23
    } else if (string === "Politics") {
      return 24
    } else if (string === "Art") {
      return 25
    } else if (string === "Celebrities") {
      return 26
    } else if (string === "Animals") {
      return 27
    }
  }

  useEffect(() => { start &&
    fetch(`https://opentdb.com/api.php?amount=5&category=${findCategoryNumber(formData.topic)}&difficulty=${formData.difficulty}&type=multiple`)
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
    return (selectedAnswers.length === 5)
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
    // let shuffledAnswers = quiz.answers.sort(() => Math.random() - 0.5);
    return (
      <Quiz key={index} start={start} question={quiz.question} answers={quiz.answers} selectAnswer={selectAnswer} />
    )
  });


  const styles = {
    height: start ? "" : "1000px"
  };


  return (
    <div className='App' style={styles}>
      <div className='background-paint-yellow'></div>
      <div className='background-paint-blue'></div>
      {start ? quizElements || <h1 className='loading'>Loading Quiz...</h1> : < Start handleClick={startQuiz} handleChange={handleChange} handleSubmit={handleSubmit} value={formData}/>}
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
