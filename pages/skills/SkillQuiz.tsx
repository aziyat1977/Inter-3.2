import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../contexts/SoundContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Target, Zap, Brain, Clock, HelpCircle, RefreshCcw } from 'lucide-react';
import AutoFitText from '../../components/AutoFitText';
import TeacherNote from '../../components/TeacherNote';

// Question Data Bank (20 questions, 5 per word)
const QUESTION_BANK = [
    // Multitasking
    { id: 1, text: "Doing homework and texting at the same time is...", correct: "Multitasking", options: ["Multitasking", "Focusing", "Sleeping", "Driving"] },
    { id: 2, text: "Can the human brain truly multitask?", correct: "No, it switches tasks", options: ["No, it switches tasks", "Yes, perfectly", "Only if you are smart", "Only on Tuesdays"] },
    { id: 3, text: "Which job requires multitasking?", correct: "Receptionist", options: ["Receptionist", "Sleeping", "Watching TV", "Walking"] },
    { id: 4, text: "The opposite of multitasking is...", correct: "Focus", options: ["Focus", "Chaos", "Speed", "Reliable"] },
    { id: 5, text: "Listening to music while reading is an example of...", correct: "Multitasking", options: ["Multitasking", "Problem Solving", "Pressure", "Obligation"] },
    
    // Under Pressure
    { id: 6, text: "Working with 1 minute left on the clock!", correct: "Under Pressure", options: ["Under Pressure", "Reliable", "Bored", "Asleep"] },
    { id: 7, text: "How do you feel 'Under Pressure'?", correct: "Stressed", options: ["Stressed", "Happy", "Relaxed", "Hungry"] },
    { id: 8, text: "Complete the song: 'Under ____'", correct: "Pressure", options: ["Pressure", "Water", "Cover", "Ground"] },
    { id: 9, text: "When you have too much work and too little time.", correct: "Under Pressure", options: ["Under Pressure", "Problem Solving", "Multitasking", "Fun"] },
    { id: 10, text: "To survive 'Under Pressure', you must stay...", correct: "Calm", options: ["Calm", "Angry", "Sad", "Loud"] },

    // Problem Solving
    { id: 11, text: "Fixing the WiFi router involves...", correct: "Problem Solving", options: ["Problem Solving", "Cooking", "Dancing", "Singing"] },
    { id: 12, text: "You lost your keys but found a window to open.", correct: "Problem Solving", options: ["Problem Solving", "Stealing", "Multitasking", "Lying"] },
    { id: 13, text: "Finding a solution to a difficult issue.", correct: "Problem Solving", options: ["Problem Solving", "Creating Problems", "Ignoring it", "Crying"] },
    { id: 14, text: "Synonym for 'Fixing'.", correct: "Solving", options: ["Solving", "Breaking", "Hiding", "Running"] },
    { id: 15, text: "If Plan A fails, you make Plan B. This is...", correct: "Problem Solving", options: ["Problem Solving", "Giving Up", "Multitasking", "Bad Luck"] },

    // Reliable
    { id: 16, text: "Someone you can always trust is...", correct: "Reliable", options: ["Reliable", "Funny", "Fast", "Scary"] },
    { id: 17, text: "If a car never breaks down, it is...", correct: "Reliable", options: ["Reliable", "Expensive", "Red", "Fast"] },
    { id: 18, text: "The opposite of 'Reliable'.", correct: "Unreliable", options: ["Unreliable", "Strong", "Smart", "Friendly"] },
    { id: 19, text: "Someone who always arrives late is NOT...", correct: "Reliable", options: ["Reliable", "Cool", "Busy", "Happy"] },
    { id: 20, text: "A synonym for 'Trustworthy'.", correct: "Reliable", options: ["Reliable", "Rich", "Famous", "Tired"] },
];

const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-600'];
const ICONS = [HelpCircle, Target, Zap, Brain, Clock];

const SkillQuiz: React.FC = () => {
  const { playClick, playSuccess, playBuzzer, playHover } = useSound();
  const { isDark } = useTheme();
  
  // Game State
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'RESULT'>('START');
  const [timer, setTimer] = useState(15);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);
  const [lastCorrect, setLastCorrect] = useState<boolean>(false);

  // Shuffle questions on mount
  useEffect(() => {
    shuffleQuestions();
  }, []);

  // Timer Logic
  useEffect(() => {
    if (gameState === 'PLAYING' && !showAnswerFeedback) {
      if (timer > 0) {
        const interval = setInterval(() => setTimer(t => t - 1), 1000);
        return () => clearInterval(interval);
      } else {
        handleTimeOut();
      }
    }
  }, [timer, gameState, showAnswerFeedback]);

  const shuffleQuestions = () => {
    const shuffled = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
    const processed = shuffled.map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5)
    }));
    setQuestions(processed);
    setScore(0);
    setCurrentQIndex(0);
  };

  const startGame = () => {
    playSuccess();
    setGameState('PLAYING');
    setTimer(15);
    setScore(0);
    setCurrentQIndex(0);
  };

  const handleAnswer = (option: string) => {
    if (showAnswerFeedback) return;
    
    const currentQ = questions[currentQIndex];
    const isCorrect = option === currentQ.correct;
    
    if (isCorrect) {
      playSuccess();
      setScore(s => s + 100 + (timer * 10)); 
      setLastCorrect(true);
    } else {
      playBuzzer();
      setLastCorrect(false);
    }

    setShowAnswerFeedback(true);
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleTimeOut = () => {
    playBuzzer();
    setLastCorrect(false);
    setShowAnswerFeedback(true);
    setTimeout(() => {
        nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    setShowAnswerFeedback(false);
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setTimer(15);
    } else {
      setGameState('RESULT');
      playSuccess();
    }
  };

  const currentQuestion = questions[currentQIndex];
  const RandomIcon = useMemo(() => ICONS[Math.floor(Math.random() * ICONS.length)], [currentQIndex]);

  if (gameState === 'START') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center gap-8 py-4">
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="p-6 md:p-8 bg-neon-cyan/20 rounded-full border-4 border-neon-cyan"
        >
            <HelpCircle size={48} className="text-neon-cyan md:w-16 md:h-16" />
        </motion.div>
        <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">SKILL CHECK</h2>
            <p className="text-base md:text-xl text-gray-400">20 Questions. Speed matters. Are you ready?</p>
        </div>
        <button 
            onClick={startGame}
            className="px-12 py-4 bg-neon-cyan text-black font-bold font-display text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,243,255,0.5)]"
        >
            START QUIZ
        </button>
      </div>
    );
  }

  if (gameState === 'RESULT') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center gap-8 py-4">
        <h2 className="text-4xl font-display font-bold text-gray-400">FINAL SCORE</h2>
        <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-pink"
        >
            {score}
        </motion.div>
        <p className="text-xl">
            {score > 1500 ? "IMPOSTER LEVEL: MASTER" : "IMPOSTER LEVEL: ROOKIE"}
        </p>
        <button 
            onClick={() => { shuffleQuestions(); startGame(); }}
            className="flex items-center gap-2 px-8 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
        >
            <RefreshCcw size={20} /> TRY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 p-2 md:p-4 max-w-6xl mx-auto overflow-hidden">
      
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center shrink-0">
        <div className="bg-white/10 px-3 py-1 md:px-4 md:py-2 rounded-full font-mono text-sm md:text-xl">
            {currentQIndex + 1} / {questions.length}
        </div>
        <div className="text-lg md:text-2xl font-black text-neon-yellow">
            SCORE: {score}
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full h-2 md:h-4 bg-gray-800 rounded-full overflow-hidden shrink-0">
        <motion.div 
            initial={{ width: '100%' }}
            animate={{ width: `${(timer / 15) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
            className={`h-full ${timer < 5 ? 'bg-red-500' : 'bg-neon-cyan'}`}
        />
      </div>

      {/* Question Area - Fills available space */}
      <div className="flex-1 w-full relative min-h-0 flex flex-col">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-8 rounded-2xl w-full h-full flex items-center justify-center shadow-2xl relative overflow-hidden">
            
            {/* Feedback Overlay */}
            <AnimatePresence>
                {showAnswerFeedback && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 z-20 flex items-center justify-center ${lastCorrect ? 'bg-green-500/90' : 'bg-red-500/90'}`}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg">
                            {lastCorrect ? "CORRECT!" : "WRONG!"}
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>

            <AutoFitText maxSize="8vh" className={isDark ? "text-white" : "text-gray-900"}>
                {currentQuestion.text}
            </AutoFitText>
        </div>
        
        {/* Random decorative icon floating near question */}
        <div className="absolute -bottom-4 -right-4 md:bottom-4 md:right-4 p-4 opacity-20 pointer-events-none">
             <RandomIcon size={64} />
        </div>
      </div>

      {/* Answer Grid - Constrained height (approx 40% of viewport or fit content) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 w-full shrink-0 h-[45%] md:h-[35%]">
        {currentQuestion.options.map((opt: string, idx: number) => (
            <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(opt)}
                disabled={showAnswerFeedback}
                className={`${COLORS[idx]} p-3 md:p-4 rounded-xl shadow-lg flex items-center justify-between group transition-all relative overflow-hidden h-full`}
            >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                
                {/* Shapes */}
                <div className="bg-black/20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded font-black text-white/50 text-base md:text-xl relative z-10 shrink-0">
                    {idx === 0 && "▲"}
                    {idx === 1 && "◆"}
                    {idx === 2 && "●"}
                    {idx === 3 && "■"}
                </div>

                <span className="text-base md:text-xl lg:text-2xl font-bold text-white relative z-10 text-center flex-grow shadow-black drop-shadow-md leading-tight px-2 break-words line-clamp-2">
                    {opt}
                </span>
            </motion.button>
        ))}
      </div>

      <TeacherNote content="Encourage students to shout the answers (Red! Blue!). This brings energy to the room." />
    </div>
  );
};

export default SkillQuiz;