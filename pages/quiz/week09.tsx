// pages/quiz.tsx
import React, { useState } from 'react';
import questionsData from './questions-week-09.json';
import styles from './quiz.module.css';
import QuestionNavigationBoxWeek09 from '../components/QuestionNavigationBoxWeek09';

const Week09: React.FC = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showPunishment, setShowPunishment] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowPunishment(true);

    if (answerId === questions[currentQuestionIndex].correctAnswer) {
      setShowBadge(true);
    } else {
      setShowBadge(false);
    }
  };

  const handleNextClick = () => {
    setShowBadge(false);
    setSelectedAnswer(null);
    setShowPunishment(false);

    if (currentQuestionIndex === questions.length - 1) {
      // User is on the last question, show congratulations message
      alert('Congratulations! You answered all the questions.');
    } else {
      // Move to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousClick = () => {
    setShowBadge(false);
    setSelectedAnswer(null);
    setShowPunishment(false);
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleQuestionClick = (index: number) => {
    setShowBadge(false);
    setSelectedAnswer(null);
    setShowPunishment(false);
    setCurrentQuestionIndex(index);
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.questionContainer}>
        <h2 className={styles.questionText}>{questions[currentQuestionIndex].question}</h2>
        <div>
          {questions[currentQuestionIndex].options.map((option) => (
            <div key={option.id}>
              <label className={styles.optionLabel}>
                <input
                  type="radio"
                  name="answer"
                  value={option.id}
                  checked={selectedAnswer === option.id}
                  onChange={() => handleAnswerSelect(option.id)}
                />
                {option.text}
              </label>
            </div>
          ))}
        </div>
        {showPunishment && (
          <p className={styles.punishmentText}>
            {selectedAnswer === questions[currentQuestionIndex].correctAnswer && showBadge
              ? 'Correct: '
              : `Wrong: ${questions[currentQuestionIndex].punishment}`}
            {showBadge && <span className={styles.badgeText}> Good Job!</span>}
          </p>
        )}
        <div className={styles.buttonContainer}>
          <button className={styles.previousButton} onClick={handlePreviousClick} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button className={styles.nextButton} onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
      <QuestionNavigationBoxWeek09
        totalQuestions={questions.length}
        currentQuestionIndex={currentQuestionIndex}
        onQuestionClick={handleQuestionClick}
      />
    </div>
  );
};

export default Week09;
