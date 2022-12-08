

export default function Start (props) {
  return (
  <div className="start-quiz">
    <h1 className="quizzical-title">Quizzical</h1>
    <p className="quizzical-text">Let's test your knowledge</p>

    <form onSubmit={props.handleSubmit} className="form-quiz">
      <div className="form-option">
        <label htmlFor="topic">
          Select the topic:
          <select id="topic" value={props.value.topic} name="topic" onChange={props.handleChange}>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals and Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
          </select>
        </label>
      </div>
      <div className="form-option">
        <label htmlFor="difficulty">
          Select difficulty:
          <select id="difficulty" value={props.value.difficulty} name="difficulty" onChange={props.handleChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
      <div className="form-option">
      <label htmlFor="amount">Number of questions (min 5 - max 50):
        <input type="number" min={5} max={50} name="amount" id="amount" value={props.value.amount} onChange={props.handleChange} />
      </label>
      </div>
    </form>

    <button className="btn-start" onClick={props.handleClick}>Start Quiz</button>
  </div>
  )
}
