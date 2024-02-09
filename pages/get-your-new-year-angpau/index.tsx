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
const CountdownTimer = ({ targetDate, onCountdownEnd, setShowCountdown }) => {
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
        console.log('Countdown ended in CountdownTimer');
        onCountdownEnd();
        setShowCountdown(false); // Set showCountdown to true when the countdown ends
      }
    }, 1000);
  
    // Check if the current time is already past the target time
    if (new Date().getTime() >= targetDate.getTime()) {
      console.log('Countdown ended immediately in CountdownTimer');
      onCountdownEnd();
      setShowCountdown(false); // Set showCountdown to true when the countdown ends
    }
  
    return () => clearTimeout(timer);
  }, []);
  
  
  return (
    <div className={styles.quizContainer}>
      <h1>Quiz starts in:</h1>
      <h2>{timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Minutes {timeLeft.seconds} Seconds</h2>
    </div>
  );
};


const QuizPage = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [timer, setTimer] = useState<number>(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);

  const targetDate = new Date(); // Current date by default
  targetDate.setDate(targetDate.getDate() + 0); // Set to tomorrow
  targetDate.setHours(9, 0, 0, 0); // Set to 2 AM

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

const handleCountdownEnd = () => {
  console.log('Countdown ended');
  setShowCountdown(false); // Set showCountdown to false when the countdown ends
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
      
      {!showCountdown && (
  <>
    <h2>{questionsData[currentQuestionIndex].question}</h2>
    <form>
      {questionsData[currentQuestionIndex].options.map((option, index) => (
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
      ))}
    </form>
  </>
)}


      {showNextButton && (
        <button onClick={handleNextClick} className={styles.nextButton}>Next</button>
      )}

{showCountdown && <CountdownTimer targetDate={targetDate} onCountdownEnd={handleCountdownEnd} setShowCountdown={setShowCountdown} />}


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
