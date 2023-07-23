import React from 'react';
import "./CheckAnswers.css"
import PropTypes from "prop-types"

const CheckAnswers = ({ isScored, checkAnswers }) => {
  return (
    <div className='btn-container'>
      {!isScored && <button className='btn-submit' onClick={checkAnswers}>Check Answers</button>}
    </div>
  );
};

CheckAnswers.PropTypes = {
  isScored: PropTypes.bool,
  checkAnswers: PropTypes.func
}

export default CheckAnswers;
