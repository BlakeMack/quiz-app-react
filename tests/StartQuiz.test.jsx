import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent} from '@testing-library/react'
import App from '../src/App'
import StartQuiz from '../src/components/StartQuiz/StartQuiz'

describe('App', () => {
  // querying UI DOM node
  it('Quizzical to be in document', () => {
    render(<App/>)
    expect(screen.getByText('Quizzical')).toBeInTheDocument()
  })

  //testing a controlled component form.
  it('updates quizData when form inputs are changed', () => {
    const mockHandleChange = vi.fn()
    const quizData = {
      topic: '9',
      difficulty: 'easy',
      amount: '10',
    };

    render(<StartQuiz handleChange={mockHandleChange} quizData={quizData} />);

    const topicSelect = screen.getByLabelText('Select the topic:');
    fireEvent.change(topicSelect, { target: { value: '10' } });
    expect(mockHandleChange).toHaveBeenCalled;

    const difficultySelect = screen.getByLabelText('Select difficulty:');
    fireEvent.change(difficultySelect, { target: { value: 'medium' } });
    expect(mockHandleChange).toHaveBeenCalled;

    const amountInput = screen.getByLabelText('Number of questions:');
    fireEvent.change(amountInput, { target: { value: '15' } });
    expect(mockHandleChange).toHaveBeenCalled;
  });

  // testing the form submission logic
  it('triggers form submission when "Start Quiz" button is clicked', () => {
    const { getByText } = render(<App>
      <StartQuiz />
    </App>)

    expect(getByText(/Start Quiz/i).textContent).toBe("Start Quiz")

    fireEvent.click(getByText("Start Quiz"))

    expect(getByText(/Loading Quiz.../i).textContent).toBe("Loading Quiz...")
  });
})
