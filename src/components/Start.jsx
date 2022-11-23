export default function Start (props) {
  return (
  <div className="start-quiz">
    <h1>Quizzical</h1>
    <p>Let's test your general knowledge</p>

    <button className="btn-start" onClick={props.handleClick}>Start Quiz</button>
  </div>
  )
}
