export default function Quiz (props) {

  const styles = {
    backgroundColor: props.isSelected ? "#D6DBF5" : "#F5F7FB"
}

  return (
    <div className="quiz">
      <h3 className="quiz-question">{props.question}</h3>
      <div className="answers">
        <button className="btn-answer" style={styles}>{props.answers[0]}</button>
        <button className="btn-answer" style={styles}>{props.answers[1]}</button>
        <button className="btn-answer" style={styles}>{props.answers[2]}</button>
        <button className="btn-answer" style={styles}>{props.answers[3]}</button>
      </div>
      <hr className="break-question"/>
    </div>
  )
}
