import React, { useState, useEffect } from 'react';
import './QuizApp.css';
import foto1 from './assets/logo192.png'

const questions = [
  {
    question: "Qual seu desenho favorito?",
    answers: ["Shrek", "Dragon ball Z", "Barbie"],
    correct: "Shrek",
  },
  {
    question: "Qual seriado você mais gosta?",
    answers: ["Spartacus", "Strange things", "Greys anatomy"],
    correct: "Greys anatomy",
  },
  {
    question: "Qual é a melhor leitura?",
    answers: ["Harry potter", "Trono de vidro", "Café com Deus pai"],
    correct: "Trono de vidro",
  },
  {
    question: "Qual é o garoto mais feio, chato e que tu odeia no mundo?",
    answers: ["Alex", "Alex", "Alex"],
    correct: "Alex",
  },
  {
    question: "Quem é a mulher que mexe com o coração de mô?",
    answers: ["Carla", "Sabrina", "Paolla Oliveira"],
    correct: "Carla",
  },
];

export default function QuizApp() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setVH();
  window.addEventListener('resize', setVH);

  return () => {
    window.removeEventListener('resize', setVH);
  };
}, []);

  const handleAnswer = (answer) => {
    if (selected !== null) return;
    console.log(answer)
    setSelected(answer);
    if (answer === questions[current].correct) {
      setScore(score + 1);
    }
  };

  useEffect(() => {
    if (selected !== null) {
      const timeout = setTimeout(() => {
        if (current + 1 < questions.length) {
          setCurrent(current + 1);
          setSelected(null);
        } else {
          setIsFinished(true);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [selected]);

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="quiz-finished">
        {score === questions.length ? (
          
            <h2 className="quiz-title">
              Fico feliz por você ter acertado todas, feliz dia dos namorados, meu amor.
              <div  id='heart' alt="Foto romântica" />
            </h2>
            
            
        ) : (
          <>
            <h2 className="quiz-title">
              Você não acertou as perguntas, talvez tenhamos um impostor usando a aplicação.
            </h2>
            <button onClick={() => resetQuiz()} className='quiz-reset-btn'>Reiniciar</button>
          </>
        )}
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-container">
      <h2 className="quiz-question">{q.question}</h2>
      <div className="quiz-answers">
        {q.answers.map((ans, id) => {
          const isCorrect = ans === q.correct;
          const isSelected = selected === ans;
          let className = 'quiz-button';
          if (isSelected) {
            className += isCorrect ? ' correct' : ' wrong'
          }
          return (
            <button
              key={id}
              onClick={() => handleAnswer(ans)}
              disabled={selected !== null}
              className={className}
            >
              {ans}
            </button>
          );
        })}
      </div>
    </div>
  );
}
