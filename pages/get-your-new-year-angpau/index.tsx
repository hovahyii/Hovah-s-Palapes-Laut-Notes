import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import questionsData from './questions.json';
import styles from './quiz.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Modal from 'react-modal';

Modal.setAppElement('body');

// Countdown Timer Component
const CountdownTimer = ({ targetDate, onCountdownEnd }) => {
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
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
  
      const now = new Date();
      if (now.getTime() >= targetDate.getTime()) {
        onCountdownEnd();
      }
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []);
  
  
  return (
    <div className={styles.quizContainer}>
      <h1 className={styles.countdownHeader}>Quiz starts in:</h1>
      <h2 className={styles.countdownContent}>
        {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Minutes {timeLeft.seconds} Seconds
      </h2>
    </div>
  );
};

// Penalty Countdown Timer Component
const PenaltyCountdown = ({ penaltyDuration, onPenaltyCountdownEnd }) => {
  const [timeLeft, setTimeLeft] = useState(penaltyDuration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onPenaltyCountdownEnd();
    }
  }, [timeLeft, onPenaltyCountdownEnd]);

  return (
    <div className={styles.penaltyCountdown}>
      <h3>Penalty Countdown ⏲: {Math.floor(timeLeft / 60)} Minutes {timeLeft % 60} Seconds</h3>
    </div>
  );
};


const QuizPage = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [penaltyDuration, setPenaltyDuration] = useState(60); // Initial penalty duration in seconds
  const [showNextButton, setShowNextButton] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [penaltyActive, setPenaltyActive] = useState(false); // Track penalty active state

  const quizTargetDate = new Date();
  quizTargetDate.setDate(quizTargetDate.getDate() + 0); // Set to tomorrow
  quizTargetDate.setHours(2, 0, 0, 0); // Set to 2 AM

  useEffect(() => {
    if (incorrectAttempts > 0) {
      setShowQuiz(true);
    }
  }, [incorrectAttempts]);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    const isCorrect = answerId === questionsData[currentQuestionIndex].correctAnswer;
    setShowNextButton(isCorrect);
    if (!isCorrect) {
      const penalties = [60, 300, 900, 1500, 2400]; // Penalty durations in seconds: 1 min, 5 mins, 15 mins, 25 mins, 40 mins
      const newIncorrectAttempts = incorrectAttempts + 1;
      setIncorrectAttempts(newIncorrectAttempts);
      const penaltyIndex = Math.min(newIncorrectAttempts - 1, penalties.length - 1);
      setPenaltyDuration(penalties[penaltyIndex]);
      setPenaltyActive(true); // Activate penalty
    } else if (currentQuestionIndex === questionsData.length - 1) {
      setModalIsOpen(true);
    }
  };

  const handleNextClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setShowNextButton(false);
    setSelectedAnswer(null);
  };

  const handlePenaltyCountdownEnd = () => {
    setPenaltyActive(false); // Deactivate penalty
  };

  // Meta tags for WhatsApp
  const metaTitle = 'Happy New Year | Claim Your Angpao';
  const metaDescription = 'Happy New Year 2024, claim your angpao by answering the questions correctly!';
  const metaImage = '/quiz/CNY-2024-Banner.gif';
  const currentUrl = 'https://palapes-laut-notes.vercel.app/get-your-new-year-angpau';

  return (
    <div className={styles.quizContainer}>
      <Head>
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={currentUrl} />
      </Head>

      <Link className={styles.banner} href="https://leica-store.my/pages/lny-gift-guide" target="_blank">
        <Image width={1000} height={200} src="https://cdn.shopify.com/s/files/1/0278/3651/4404/files/CNY.png?v=1704808935" alt="advertisement" />
      </Link>
      
      {!showQuiz && (
        <CountdownTimer targetDate={quizTargetDate} onCountdownEnd={() => setShowQuiz(true)} />
      )}

      {showQuiz && (
        <>
          <h2>{questionsData[currentQuestionIndex].question}</h2>
          <form>
            {questionsData[currentQuestionIndex].options.map((option, index) => (
              penaltyActive ? ( // Hide options when penalty active
                null
              ) : (
                <label key={index} className={styles.optionLabel}>
                  <input
                    type="radio"
                    name="answer"
                    value={option.id}
                    checked={selectedAnswer === option.id}
                    onChange={() => handleAnswerSelect(option.id)}
                  />
                  {option.text}
                </label>
              )
            ))}
          </form>
          {showNextButton && (
            <button onClick={handleNextClick} className={styles.nextButton}>Next</button>
          )}
          {penaltyActive && (
            <PenaltyCountdown
              penaltyDuration={penaltyDuration}
              onPenaltyCountdownEnd={handlePenaltyCountdownEnd}
            />
          )}
        </>
      )}

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
        <Image width={800} height={200} src="/quiz/advertisement.gif" alt="advertisement" />
      </Link>
    </div>
  );
};

export default QuizPage;
