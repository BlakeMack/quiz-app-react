import Answer from '../Answer/Answer'
import "./Quiz.css"
import PropTypes from "prop-types"

const Quiz = ({answers, selectAnswer, category, question}) => {

const answerElements = answers.map((a) => {
  return (
    <Answer value={a.answer} key={a.id} id={a.id} isSelected={a.isSelected} isCorrect={a.isCorrect} handleClick={selectAnswer}/>
  )
})

  return (
    <div className="quiz">
        <h2 className='category-text'>{category}</h2>
      <h3 className="quiz-question">{question}</h3>
      <div className="answers">
        {answerElements}
      </div>
      <hr className="break-question"/>
    </div>
  )
}

Quiz.PropTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
  selectAnswer: PropTypes.func,
  category: PropTypes.string,
  question: PropTypes.string
}

export default Quiz
