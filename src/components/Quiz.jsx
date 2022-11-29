export default function Quiz (props) {

  const styles = {
    backgroundColor: props.isSelected ? "#D6DBF5" : "#F5F7FB"
}

  return (
    <div className="quiz">
      <h3 className="quiz-question">{props.question}</h3>
      <div className="answers">
        <button className="btn-answer" style={styles} onClick={props.select}>{props.answers[0].answer}</button>
        <button className="btn-answer" style={styles} onClick={props.select}>{props.answers[1].answer}</button>
        <button className="btn-answer" style={styles} onClick={props.select}>{props.answers[2].answer}</button>
        <button className="btn-answer" style={styles} onClick={props.select}>{props.answers[3].answer}</button>
      </div>
      <hr className="break-question"/>
    </div>
  )
}
