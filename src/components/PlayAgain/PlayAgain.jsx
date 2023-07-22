import React from 'react';
import "./PlayAgain.css"

const PlayAgain = ({ isScored, score, quizData, playAgain }) => {
  return (
    <div className='play-again'>
      {isScored &&
        <>
          <h1 className='score-counter'>You scored {score}/{quizData.length} correct answers</h1>
          <button className='btn-play' onClick={playAgain}>Play again</button>
        </>
      }
    </div>
  );
};

export default PlayAgain;
