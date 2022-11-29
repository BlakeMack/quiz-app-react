export default function Answer (props) {

  const styles = {
    backgroundColor: props.isSelected ? "#D6DBF5" : "#F5F7FB"
}

  return (
    <button className="btn-answer" style={styles} onClick={props.handleClick}>{props.value}</button>
  )
}
