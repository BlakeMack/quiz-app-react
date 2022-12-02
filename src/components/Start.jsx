export default function Start (props) {
  return (
  <div className="start-quiz">
    <h1 className="quizzical-title">Quizzical</h1>
    <p className="quizzical-text">Let's test your general knowledge</p>

    <button className="btn-start" onClick={props.handleClick}>Start Quiz</button>
  </div>
  )
}
