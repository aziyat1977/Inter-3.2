import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../contexts/SoundContext';
import { useTheme } from '../../contexts/ThemeContext';
import AutoFitText from '../../components/AutoFitText';
import TeacherNote from '../../components/TeacherNote';
import { Zap, ShieldAlert, BadgeCheck } from 'lucide-react';

const QUIZ_DATA: Record<string, { title: string; questions: { q: string; correct: string; options: string[] }[] }> = {
  "1": {
    title: "LOGIC CHECK",
    questions: [
      { q: "It's a law.", correct: "Must", options: ["Must", "Can", "May", "Might"] },
      { q: "It's necessary.", correct: "Have to", options: ["Have to", "Mustn't", "Can", "Could"] },
      { q: "It's NOT necessary.", correct: "Don't have to", options: ["Don't have to", "Mustn't", "Couldn't", "Have not"] },
      { q: "It's forbidden.", correct: "Mustn't", options: ["Mustn't", "Don't have to", "Haven't to", "Needn't"] },
      { q: "I feel it is important.", correct: "Must", options: ["Must", "Have to", "Should", "Can"] },
      { q: "External obligation (Boss says so).", correct: "Have to", options: ["Have to", "Must", "Can", "May"] },
      { q: "Opposite of Mustn't?", correct: "Must", options: ["Must", "Don't have to", "Couldn't", "Did"] },
      { q: "He ___ go.", correct: "Has to", options: ["Has to", "Have to", "Musts", "Having to"] },
      { q: "___ you have to?", correct: "Do", options: ["Do", "Must", "Are", "Have"] },
      { q: "She ___ not enter.", correct: "Must", options: ["Must", "Has", "Does", "Is"] }
    ]
  },
  "2": {
    title: "TIME TRAVEL",
    questions: [
      { q: "Past of Must?", correct: "Had to", options: ["Had to", "Musted", "Must", "Did must"] },
      { q: "Past of Mustn't?", correct: "Couldn't", options: ["Couldn't", "Didn't must", "Mustn'ted", "Had not to"] },
      { q: "Past of Don't have to?", correct: "Didn't have to", options: ["Didn't have to", "Hadn't to", "Haven't", "Mustn't"] },
      { q: "Yesterday I ___ go.", correct: "Had to", options: ["Had to", "Must", "Have to", "Has to"] },
      { q: "We ___ enter yesterday.", correct: "Couldn't", options: ["Couldn't", "Mustn't", "Can't", "Don't"] },
      { q: "I ___ pay last night.", correct: "Didn't have to", options: ["Didn't have to", "Don't have to", "Mustn't", "Haven't"] },
      { q: "Correct: I ___ leave early.", correct: "Had to", options: ["Had to", "Musted", "Did must", "Must"] },
      { q: "Correct: He ___ help.", correct: "Didn't have to", options: ["Didn't have to", "Didn't had to", "No had to", "Mustn't"] },
      { q: "___ you have to work yesterday?", correct: "Did", options: ["Did", "Do", "Must", "Were"] },
      { q: "Why ___ she have to leave?", correct: "Did", options: ["Did", "Does", "Do", "Must"] }
    ]
  },
  "3": {
    title: "FORM & STRUCTURE",
    questions: [
      { q: "She ___ to go.", correct: "Has", options: ["Has", "Must", "Can", "Should"] },
      { q: "We ___ go.", correct: "Must", options: ["Must", "Have", "Has", "Must to"] },
      { q: "They ___ not pass.", correct: "Must", options: ["Must", "Don't", "Have", "Are"] },
      { q: "I don't ___ to go.", correct: "Have", options: ["Have", "Must", "Has", "Need"] },
      { q: "Did you ___ to go?", correct: "Have", options: ["Have", "Had", "Must", "Has"] },
      { q: "He doesn't ___ to work.", correct: "Have", options: ["Have", "Has", "Must", "Had"] },
      { q: "Must we ___?", correct: "Wait", options: ["Wait", "To wait", "Waiting", "Waited"] },
      { q: "They had ___ leave.", correct: "To", options: ["To", "Too", "Two", "For"] },
      { q: "You mustn't ___.", correct: "Smoke", options: ["Smoke", "To smoke", "Smoking", "Smoked"] },
      { q: "I couldn't ___.", correct: "Sleep", options: ["Sleep", "To sleep", "Sleeping", "Slept"] }
    ]
  },
  "4": {
    title: "CONTEXT CLUES",
    questions: [
      { q: "The sign says STOP.", correct: "Must", options: ["Must", "Don't have to", "Can", "Could"] },
      { q: "It's a holiday!", correct: "Don't have to work", options: ["Don't have to work", "Mustn't work", "Must work", "Couldn't work"] },
      { q: "The door was locked.", correct: "Couldn't enter", options: ["Couldn't enter", "Mustn't enter", "Didn't have to enter", "Shouldn't enter"] },
      { q: "My tooth hurt.", correct: "Had to see dentist", options: ["Had to see dentist", "Must see dentist", "Musted see dentist", "Have to see dentist"] },
      { q: "It's dangerous!", correct: "Mustn't touch", options: ["Mustn't touch", "Don't have to touch", "Didn't have to touch", "Have to touch"] },
      { q: "The museum was free.", correct: "Didn't have to pay", options: ["Didn't have to pay", "Mustn't pay", "Couldn't pay", "Had to pay"] },
      { q: "I broke my leg.", correct: "Couldn't walk", options: ["Couldn't walk", "Mustn't walk", "Didn't have to walk", "Don't walk"] },
      { q: "Uniform required.", correct: "Must wear", options: ["Must wear", "Can wear", "Don't have to wear", "Mustn't wear"] },
      { q: "Optional donation.", correct: "Don't have to pay", options: ["Don't have to pay", "Mustn't pay", "Can't pay", "Must pay"] },
      { q: "Secret agent.", correct: "Mustn't tell", options: ["Mustn't tell", "Don't have to tell", "Didn't tell", "Couldn't tell"] }
    ]
  },
  "5": {
    title: "MASTER LEVEL",
    questions: [
      { q: "I ___ lied. (Mistake)", correct: "Musted", options: ["Musted", "Had to", "Have to", "Must"] },
      { q: "I ___ have to go. (Past)", correct: "Didn't", options: ["Didn't", "Don't", "Doesn't", "Haven't"] },
      { q: "You ___ park here (Illegal).", correct: "Mustn't", options: ["Mustn't", "Don't have to", "Couldn't", "Won't"] },
      { q: "We ___ finish yesterday.", correct: "Had to", options: ["Had to", "Must", "Have to", "Did"] },
      { q: "She ___ wear a hat (Choice).", correct: "Doesn't have to", options: ["Doesn't have to", "Mustn't", "Hasn't to", "Don't have to"] },
      { q: "I ___ swim (No water).", correct: "Couldn't", options: ["Couldn't", "Mustn't", "Didn't have to", "Shouldn't"] },
      { q: "___ he have to sign?", correct: "Does", options: ["Does", "Do", "Must", "Is"] },
      { q: "They ___ pay last week.", correct: "Had to", options: ["Had to", "Have to", "Must", "Has to"] },
      { q: "You ___ be late! (Order)", correct: "Mustn't", options: ["Mustn't", "Don't have to", "Couldn't", "Aren't"] },
      { q: "I ___ worry.", correct: "Don't have to", options: ["Don't have to", "Mustn't", "Couldn't", "Haven't"] }
    ]
  }
};

const GrammarQuizLevel: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const { playClick, playSuccess, playBuzzer, playHover } = useSound();
  const { isDark } = useTheme();

  const [qIndex, setQIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const data = QUIZ_DATA[level || "1"];
  const currentQ = data.questions[qIndex];

  useEffect(() => {
    setQIndex(0);
    setCompleted(false);
    setScore(0);
  }, [level]);

  const handleAnswer = (opt: string) => {
    if (isAnswered) return;
    setIsAnswered(true);

    if (opt === currentQ.correct) {
      playSuccess();
      setScore(s => s + 1);
    } else {
      playBuzzer();
    }

    setTimeout(() => {
      setIsAnswered(false);
      if (qIndex < data.questions.length - 1) {
        setQIndex(prev => prev + 1);
      } else {
        setCompleted(true);
      }
    }, 1000);
  };

  if (!data) return <div>Level not found</div>;

  return (
    <div className="w-full h-full flex flex-col p-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <div>
           <p className="text-neon-pink font-mono text-xs tracking-widest uppercase">Simulation {level}</p>
           <h2 className="text-2xl font-display font-bold">{data.title}</h2>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
           <Zap size={18} className="text-yellow-400" />
           <span className="font-bold font-mono">{score}00 PTS</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {completed ? (
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex-grow flex flex-col items-center justify-center text-center gap-6"
          >
             <BadgeCheck size={100} className="text-neon-pink" />
             <h1 className="text-5xl font-display font-bold">ASSESSMENT COMPLETE</h1>
             <p className="text-2xl text-gray-400">Score: {score} / 10</p>
          </motion.div>
        ) : (
          <div className="flex-grow flex flex-col gap-4">
             {/* Progress */}
             <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                   className="h-full bg-neon-pink"
                   animate={{ width: `${((qIndex) / data.questions.length) * 100}%` }}
                />
             </div>

             {/* Question */}
             <motion.div
               key={qIndex}
               initial={{ x: 20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -20, opacity: 0 }}
               className="flex-grow flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-8 mb-4 shadow-xl relative overflow-hidden"
             >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-50" />
                <AutoFitText maxSize="8vw" className={isDark ? "text-white" : "text-gray-900"}>
                   {currentQ.q}
                </AutoFitText>
             </motion.div>

             {/* Options Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[40%]">
                {currentQ.options.map((opt, i) => {
                   let bgClass = "bg-white/5 border-white/10 hover:bg-neon-pink/10 hover:border-neon-pink";
                   if (isAnswered) {
                      if (opt === currentQ.correct) bgClass = "bg-green-500 text-black border-green-500";
                      else bgClass = "opacity-30 border-transparent";
                   }

                   return (
                      <motion.button
                         key={i}
                         onClick={() => handleAnswer(opt)}
                         disabled={isAnswered}
                         whileTap={{ scale: 0.98 }}
                         className={`border rounded-xl p-4 font-bold text-lg md:text-xl transition-all relative overflow-hidden flex items-center justify-center ${bgClass}`}
                      >
                         {opt}
                      </motion.button>
                   );
                })}
             </div>
          </div>
        )}
      </AnimatePresence>
      <TeacherNote content="Speed is key here. If they pause too long, encourage them to trust their gut." />
    </div>
  );
};

export default GrammarQuizLevel;