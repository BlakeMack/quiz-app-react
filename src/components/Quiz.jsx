import Answer from './Answer'
export default function Quiz (props) {

const answerElements = props.answers.map((a) => {
  return (
    <Answer value={a.answer} key={a.id} id={a.id} isSelected={a.isSelected} isCorrect={a.isCorrect} handleClick={props.selectAnswer}/>
  )
})

  return (
    <div className="quiz">
      <h3 className="quiz-question">{props.question}</h3>
      <div className="answers">
        {answerElements}
      </div>
      <hr className="break-question"/>
    </div>
  )
}
