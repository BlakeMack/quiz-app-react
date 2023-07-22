import "./Answer.css"

export default function Answer(props) {
  const { id, value, isCorrect, isSelected, handleClick } = props;

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
