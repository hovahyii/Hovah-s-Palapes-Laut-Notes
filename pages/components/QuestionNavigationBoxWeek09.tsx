// components/QuestionNavigationBox.tsx
import React from 'react';
import styles from './QuestionNavigationBox.module.css';

interface QuestionNavigationBoxProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  onQuestionClick: (index: number) => void;
}

const QuestionNavigationBoxWeek09: React.FC<QuestionNavigationBoxProps> = ({
  totalQuestions,
  currentQuestionIndex,
  onQuestionClick,
}) => {
  const mosCodeSection = Array.from({ length: 10 }, (_, index) => index);

  return (
    <div className={styles.navigationBox}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Morse Code</div>
        {mosCodeSection.map((index) => (
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

export default QuestionNavigationBoxWeek09;
