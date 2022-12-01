export default function Answer (props) {

  // props.isSelected ? "#D6DBF5" : "#F5F7FB"
//   const styles = {
//     backgroundColor: props.isSelected ? "#D6DBF5" : "#F5F7FB"
// }

  const styles = {
    // background ternary checks game state, before answer check only change color based on selected, after answer check do the 2nd nested ternary
    backgroundColor: props.isCorrect === "undetermined" ? props.isSelected ? "#D6DBF5" : "#F5F7FB" :  props.isSelected ? props.isCorrect ? "#94D7A2" : "#F8BCBC" : "#F5F7FB",
    // change the answers opacity instead of the color, this is what is given the correct answer vs all answer objects effect in the figma
    opacity: props.isCorrect === "undetermined" ? "" : props.isCorrect === true ? "" : "50%"
  }

  return (
    <button className="btn-answer" style={styles} onClick={() => props.handleClick(props.id)}>{props.value}</button>
  )
}
