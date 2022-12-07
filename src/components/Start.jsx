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
            <option value="General Knowledge">General Knowledge</option>
            <option value="Entertainment: Books">Entertainment: Books</option>
            <option value="Entertainment: Film">Entertainment: Film</option>
            <option value="Entertainment: Music">Entertainment: Music</option>
            <option value="Entertainment: Musicals and Theatres">Entertainment: Musicals and Theatres</option>
            <option value="Entertainment: Television">Entertainment: Television</option>
            <option value="Entertainment: Video Games">Entertainment: Video Games</option>
            <option value="Entertainment: Board Games">Entertainment: Board Games</option>
            <option value="Science & Nature">Science & Nature</option>
            <option value="Science: Computers">Science: Computers</option>
            <option value="Science: Mathematics">Science: Mathematics</option>
            <option value="Mythology">Mythology</option>
            <option value="Sports">Sports</option>
            <option value="Geography">Geography</option>
            <option value="History">History</option>
            <option value="Politics">Politics</option>
            <option value="Art">Art</option>
            <option value="Celebrities">Celebrities</option>
            <option value="Animals">Animals</option>
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

    </form>

    <button className="btn-start" onClick={props.handleClick}>Start Quiz</button>
  </div>
  )
}
