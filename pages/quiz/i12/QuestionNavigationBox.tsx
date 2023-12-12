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
  const mosCodeSection = Array.from({ length: 15 }, (_, index) => index);
  const semaphoreCodeSection = Array.from({ length: 10 }, (_, index) => index + 15);
  const weaponSection = Array.from({ length: 10 }, (_, index) => index + 25);

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
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Semaphore Code</div>
        {semaphoreCodeSection.map((index) => (
          <div
            key={index + 1}
            className={`${styles.questionNumber} ${index === currentQuestionIndex && styles.currentQuestion}`}
            onClick={() => onQuestionClick(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Weapon</div>
        {weaponSection.map((index) => (
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
