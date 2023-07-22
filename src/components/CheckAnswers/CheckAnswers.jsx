import React from 'react';
import "./CheckAnswers.css"

const CheckAnswers = ({ isScored, checkAnswers }) => {
  return (
    <div className='btn-container'>
      {!isScored && <button className='btn-submit' onClick={checkAnswers}>Check Answers</button>}
    </div>
  );
};

export default CheckAnswers;
