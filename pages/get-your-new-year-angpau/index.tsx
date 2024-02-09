import React, { useState, useEffect } from 'react';
import questionsData from './questions.json';
import styles from './quiz.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Modal from 'react-modal';

Modal.setAppElement('body');

// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.quizContainer}>
      <h1>Quiz starts in:</h1>
      <h2>{timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Minutes {timeLeft.seconds} Seconds</h2>
    </div>
  );
};

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [timer, setTimer] = useState<number>(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const targetDate = new Date(); // Current date by default
  targetDate.setDate(targetDate.getDate() + 0); // Set to tomorrow
  targetDate.setHours(9, 0, 0, 0); // Set to 9 AM

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    const isCorrect = answerId === questionsData[currentQuestionIndex].correctAnswer;
    setShowNextButton(isCorrect);
    if (!isCorrect) {
      const penaltyTimes = [60, 300, 600]; // 1 min, 5 mins, 10 mins
      const newIncorrectAttempts = incorrectAttempts + 1;
      setIncorrectAttempts(newIncorrectAttempts);
      const penaltyIndex = Math.min(newIncorrectAttempts - 1, penaltyTimes.length - 1);
      setTimer(penaltyTimes[penaltyIndex]);
    } else if (currentQuestionIndex === questionsData.length - 1) {
      setModalIsOpen(true); // Open modal on last correct answer
    }
  };

  const handleNextClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setShowNextButton(false);
    setSelectedAnswer(null);
    setTimer(0);
  };

  return (
    <div className={styles.quizContainer}>
      <Link className={styles.banner} href="https://leica-store.my/pages/lny-gift-guide" target="_blank">
        <Image width={1000} height={200} src="https://cdn.shopify.com/s/files/1/0278/3651/4404/files/CNY.png?v=1704808935" alt="advertisement" />
      </Link>
      
      {showNextButton && (
        <button onClick={handleNextClick} className={styles.nextButton}>Next</button>
      )}

<CountdownTimer targetDate={targetDate} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Grand Prize Modal"
        className={styles.customModal}
        overlayClassName={styles.customOverlay}
      >
        <div className={styles.modalContent}>
          <Image width={1000} height={300} src="/quiz/CNY-2024-Banner.gif" alt="advertisement" />
          <h2>Congratulations!</h2>
          <p>You have answered all questions correctly.</p>
          <a href="https://onelink.tngd.my/8mmV/MONEYPACKET?p=9aabaf6801373befe8bbbd5dbe857c802f611f8b8f2bb6e53d9700a9f17c757ee9e1a64ba2c04ffea828bb67b9410b291888b8bb55afd7fed5947ffe98a2504f3309afbb13ec07905ed10ce6b0cd8fa3">Click here for your TouchNGo 🧧</a>
        </div>
      </Modal>
      <Link href="https://milkteaplus.vercel.app/bm/service" target="_blank" className={styles.banner}>
        <Image width={1000} height={200} src="/quiz/advertisement.gif" alt="advertisement" />
      </Link>

    </div>
  );
};

export default QuizPage;
