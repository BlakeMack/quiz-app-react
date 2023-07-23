import { useEffect, useState } from 'react'
import './App.css'
import Quiz from './components/Quiz/Quiz'
import CheckAnswers from './components/CheckAnswers/CheckAnswers'
import PlayAgain from './components/PlayAgain/PlayAgain'
import { nanoid } from 'nanoid'
import {decode} from 'html-entities'
import StartQuiz from './components/StartQuiz/StartQuiz'


const App = () => {
  const [start, setStart] = useState(false)
  const [quizData, setQuizData] = useState(false)
  const [score, setScore] = useState(0)
  const [isScored, setIsScored] = useState(false)
  const [quizFormData, setquizFormData] = useState(
    {
        topic: 9,
        difficulty: "easy",
        amount: 5
    }
  )
  const [error, setError] = useState(null); // State for storing the error message

  console.log(quizFormData.topic)
  console.log(quizFormData.difficulty)
  console.log(quizFormData.amount)

  // generate quizdata from a get request made to the OTDB quiz api, using user submitted form data
  useEffect(() => {
    if (start) {
      fetch(`https://opentdb.com/api.php?amount=${quizFormData.amount}&category=${quizFormData.topic}&difficulty=${quizFormData.difficulty}&type=multiple`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          if (data.results.length === 0) {
            setError('No quiz data available for the selected criteria. Please refresh the page and try different settings.');
            setQuizData([]); // Set an empty quiz data array
          } else {
            setQuizData(
              data.results.map((result) => ({
                ...result,
                question: decode(result.question),
                answers: [
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
                ].sort(() => 0.5 - Math.random()),
              }))
            );
          }
        })
        .catch((error) => {
          console.error('Error fetching quiz data:', error);
          setError('Failed to fetch quiz data. Please try again later.');
        });
    }
  }, [start]);

  function handleChange(event) {
    console.log(event)
    const {name, value, type, checked} = event.target
    setquizFormData(prevquizFormData => {
        return {
            ...prevquizFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
  }

  // prevent the page from refreshing if form submission is triggerred
  // triggers the useffect to generate form data, by setting the start state to true
  function handleQuizStart(event) {
    event.preventDefault();
    setStart(true)
  }

  function selectAnswer(id) {
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


  // no fixed height for the html elements rendered when the quiz information is rendered
  // a fixed height is added when the quiz has not started, which means the html form is being rendered
  const styles = {
    height: start ? "" : "1000px"
  };


  return (

    <div className='App' style={styles}>
      {/* Render the error message if there's an error */}
      {error && <div className="error-message">{error}</div>}

      <div className='background-paint-yellow'></div>
      <div className='background-paint-blue'></div>
      {/* if the quiz has started, evaluate the or expression. render quiz elements if they are available, if not render the loading quiz html element.
      If the quiz has not started, render the start jsx component */}
      {start ? quizElements || <h1 className='loading'>Loading Quiz...</h1> : < StartQuiz handleChange={handleChange} handleSubmit={handleQuizStart} quizData={quizFormData}/>}
      {start && <CheckAnswers isScored={isScored} checkAnswers={checkAnswers} />}
      <PlayAgain isScored={isScored} score={score} quizData={quizData} playAgain={playAgain} />
    </div>
  )
}

export default App
