import "./Answer.css"
import PropTypes from "prop-types"

 function Answer({ id, value, isCorrect, isSelected, handleClick }) {

  let backgroundColor;
  if (isSelected) {
    if (isCorrect === true) {
      backgroundColor = "#94D7A2"; // Correct answer selected
    } else if (isCorrect === false) {
      backgroundColor = "#F8BCBC"; // Incorrect answer selected
    } else {
      backgroundColor = "#D6DBF5"; // Answer selected but correctness is undetermined
    }
  } else {
    backgroundColor = "#F5F7FB"; // Unselected answer
  }

  const answerStyles = {
    backgroundColor,
    opacity: isCorrect !== "undetermined" && !isCorrect ? "50%" : "",
  };

  const handleAnswerClick = () => {
    handleClick(id);
  };

  return (
    <button className="btn-answer" style={answerStyles} onClick={handleAnswerClick}>
      {value}
    </button>
  );
}

Answer.PropTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  isCorrect: PropTypes.bool,
  isSelected: PropTypes.bool,
  handleClick: PropTypes.func
}

export default Answer
