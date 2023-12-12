// components/QuestionNavigationBox.tsx
import React from 'react';
import styles from '../../components/Quiz/QuestionNavigationBox.module.css';

interface QuestionNavigationBoxProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  onQuestionClick: (index: number) => void;
}

const QuestionNavigationBox: React.FC<QuestionNavigationBoxProps> = ({
  totalQuestions,
  currentQuestionIndex,
  onQuestionClick,
}) => {
  const questionNumbers = Array.from({ length: totalQuestions }, (_, index) => index);

  return (
    <div className={styles.navigationBox}>
      <div className={styles.section}>
        {questionNumbers.map((index) => (
          <div
            key={index + 1}
            className={`${styles.questionNumber} ${index === currentQuestionIndex && styles.currentQuestion}`}
            onClick={() => onQuestionClick(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigationBox;
