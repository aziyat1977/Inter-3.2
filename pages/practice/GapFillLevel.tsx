import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../contexts/SoundContext';
import { useTheme } from '../../contexts/ThemeContext';
import AutoFitText from '../../components/AutoFitText';
import TeacherNote from '../../components/TeacherNote';
import { CheckCircle2, XCircle, Terminal } from 'lucide-react';

// Data tailored for the Imposter/Corporate theme
const GAP_DATA: Record<string, { title: string; questions: { q: string; options: string[]; answer: string; hint: string }[] }> = {
  "1": {
    title: "PRESENT OBLIGATION",
    questions: [
      { q: "I ___ finish this report by 5 PM.", options: ["have to", "can"], answer: "have to", hint: "It's an external rule." },
      { q: "You ___ wear a uniform here.", options: ["must", "can"], answer: "must", hint: "Strong obligation." },
      { q: "Do you ___ work on weekends?", options: ["must", "have to"], answer: "have to", hint: "Question form." },
      { q: "She ___ attend the meeting.", options: ["has to", "musts"], answer: "has to", hint: "Third person." },
      { q: "We ___ be late.", options: ["mustn't", "don't have to"], answer: "mustn't", hint: "Prohibition." },
      { q: "You ___ call the boss.", options: ["have to", "must to"], answer: "have to", hint: "Grammar structure." },
      { q: "I ___ go now.", options: ["must", "have"], answer: "must", hint: "Internal feeling." },
      { q: "He ___ submit the files.", options: ["has to", "have to"], answer: "has to", hint: "He/She/It." },
      { q: "___ you have to sign this?", options: ["Do", "Must"], answer: "Do", hint: "Helper verb." },
      { q: "They ___ follow the protocol.", options: ["must", "can"], answer: "must", hint: "Rule." }
    ]
  },
  "2": {
    title: "PAST OBLIGATION",
    questions: [
      { q: "Yesterday, I ___ work late.", options: ["had to", "musted"], answer: "had to", hint: "Past of must." },
      { q: "We ___ leave the building.", options: ["had to", "have to"], answer: "had to", hint: "Past tense." },
      { q: "She ___ write a new code.", options: ["had to", "must"], answer: "had to", hint: "Yesterday." },
      { q: "I ___ lie to the interviewer.", options: ["had to", "musted"], answer: "had to", hint: "No such word as musted." },
      { q: "___ you have to wait long?", options: ["Did", "Do"], answer: "Did", hint: "Past question." },
      { q: "They ___ pay a fine.", options: ["had to", "musted"], answer: "had to", hint: "Past obligation." },
      { q: "I ___ take a taxi.", options: ["had to", "must"], answer: "had to", hint: "Past event." },
      { q: "He ___ restart the server.", options: ["had to", "has to"], answer: "had to", hint: "Last night." },
      { q: "We ___ wear suits yesterday.", options: ["had to", "have to"], answer: "had to", hint: "Past context." },
      { q: "Why ___ you have to go?", options: ["did", "do"], answer: "did", hint: "Past question." }
    ]
  },
  "3": {
    title: "PROHIBITION (PAST & PRESENT)",
    questions: [
      { q: "You ___ enter this room!", options: ["mustn't", "don't have to"], answer: "mustn't", hint: "Forbidden." },
      { q: "I ___ speak during the exam.", options: ["couldn't", "didn't must"], answer: "couldn't", hint: "Past prohibition." },
      { q: "We ___ take photos inside.", options: ["mustn't", "couldn't"], answer: "mustn't", hint: "Present rule." },
      { q: "She ___ use her phone yesterday.", options: ["couldn't", "mustn't"], answer: "couldn't", hint: "Past." },
      { q: "You ___ touch the red button.", options: ["mustn't", "don't have to"], answer: "mustn't", hint: "Danger!" },
      { q: "They ___ enter without ID.", options: ["couldn't", "didn't must"], answer: "couldn't", hint: "Past ability/permission." },
      { q: "I ___ tell anyone the secret.", options: ["mustn't", "couldn't"], answer: "mustn't", hint: "Present obligation." },
      { q: "He ___ drive the car (it was broken).", options: ["couldn't", "mustn't"], answer: "couldn't", hint: "Past inability." },
      { q: "Passengers ___ smoke here.", options: ["mustn't", "don't have to"], answer: "mustn't", hint: "Rule." },
      { q: "We ___ leave until 6 PM yesterday.", options: ["couldn't", "mustn't"], answer: "couldn't", hint: "Past restriction." }
    ]
  },
  "4": {
    title: "NO OBLIGATION (OPTIONAL)",
    questions: [
      { q: "You ___ come if you are busy.", options: ["don't have to", "mustn't"], answer: "don't have to", hint: "It's your choice." },
      { q: "I ___ cook yesterday.", options: ["didn't have to", "mustn't"], answer: "didn't have to", hint: "Past choice." },
      { q: "She ___ wear makeup.", options: ["doesn't have to", "mustn't"], answer: "doesn't have to", hint: "She can if she wants." },
      { q: "We ___ pay, it was free!", options: ["didn't have to", "had to"], answer: "didn't have to", hint: "Free." },
      { q: "He ___ wake up early today.", options: ["doesn't have to", "don't have to"], answer: "doesn't have to", hint: "He/She." },
      { q: "You ___ help me, I'm fine.", options: ["don't have to", "mustn't"], answer: "don't have to", hint: "No need." },
      { q: "I ___ study, I passed already.", options: ["didn't have to", "couldn't"], answer: "didn't have to", hint: "Not necessary." },
      { q: "They ___ bring gifts.", options: ["don't have to", "mustn't"], answer: "don't have to", hint: "Optional." },
      { q: "You ___ answer every email.", options: ["don't have to", "mustn't"], answer: "don't have to", hint: "Not mandatory." },
      { q: "We ___ run, we were early.", options: ["didn't have to", "couldn't"], answer: "didn't have to", hint: "We had time." }
    ]
  },
  "5": {
    title: "MIXED BAG (EXPERT)",
    questions: [
      { q: "Yesterday I ___ work, so I slept.", options: ["didn't have to", "mustn't"], answer: "didn't have to", hint: "No obligation." },
      { q: "You ___ smoke at a gas station.", options: ["mustn't", "don't have to"], answer: "mustn't", hint: "Dangerous/Prohibited." },
      { q: "I ___ go to the dentist yesterday.", options: ["had to", "musted"], answer: "had to", hint: "Past obligation." },
      { q: "We ___ wear a tie (it's casual).", options: ["don't have to", "mustn't"], answer: "don't have to", hint: "Optional." },
      { q: "I ___ open the file. It was encrypted.", options: ["couldn't", "didn't have to"], answer: "couldn't", hint: "Impossible." },
      { q: "She ___ finish it now.", options: ["has to", "have to"], answer: "has to", hint: "Grammar." },
      { q: "___ you have to pay?", options: ["Did", "Must"], answer: "Did", hint: "Past question." },
      { q: "You ___ be late for the interview!", options: ["mustn't", "don't have to"], answer: "mustn't", hint: "Very bad idea." },
      { q: "I ___ clean my room (Mom said so).", options: ["had to", "must"], answer: "had to", hint: "Past instruction." },
      { q: "You ___ be crazy!", options: ["must", "can"], answer: "must", hint: "Deduction." }
    ]
  }
};

const GapFillLevel: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const { playClick, playSuccess, playBuzzer, playHover } = useSound();
  const { isDark } = useTheme();
  
  const [qIndex, setQIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [status, setStatus] = useState<'IDLE' | 'CORRECT' | 'WRONG'>('IDLE');

  const data = GAP_DATA[level || "1"];
  const currentQ = data.questions[qIndex];

  useEffect(() => {
    setQIndex(0);
    setCompleted(false);
    setStatus('IDLE');
  }, [level]);

  const handleOption = (opt: string) => {
    if (status !== 'IDLE') return;

    if (opt === currentQ.answer) {
      playSuccess();
      setStatus('CORRECT');
      setTimeout(() => {
        if (qIndex < data.questions.length - 1) {
          setQIndex(prev => prev + 1);
          setStatus('IDLE');
        } else {
          setCompleted(true);
        }
      }, 1000);
    } else {
      playBuzzer();
      setStatus('WRONG');
      setTimeout(() => setStatus('IDLE'), 1000);
    }
  };

  if (!data) return <div>Level not found</div>;

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-4 relative overflow-hidden">
       {/* Background Grid */}
       <div className={`absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 ${isDark ? 'invert-0' : 'invert'}`} />

       {/* Header */}
       <div className="w-full flex justify-between items-center mb-8 relative z-10">
          <div className="flex items-center gap-2 text-neon-cyan">
             <Terminal size={24} />
             <span className="font-mono text-sm tracking-widest">GAP_FILL_0{level}</span>
          </div>
          <div className="font-display font-bold text-gray-400">
             {qIndex + 1} / {data.questions.length}
          </div>
       </div>

       <AnimatePresence mode="wait">
          {completed ? (
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="flex-grow flex flex-col items-center justify-center gap-6"
            >
               <CheckCircle2 size={80} className="text-neon-cyan" />
               <h2 className="text-4xl font-display font-bold">SEQUENCE COMPLETE</h2>
               <p className="text-gray-400">System updated.</p>
            </motion.div>
          ) : (
            <div className="flex-grow w-full max-w-3xl flex flex-col items-center justify-center gap-12 relative z-10">
               
               {/* Question Box */}
               <motion.div 
                 key={qIndex}
                 initial={{ x: 50, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 exit={{ x: -50, opacity: 0 }}
                 className="w-full bg-black/40 backdrop-blur-xl border-l-4 border-neon-cyan p-8 md:p-12 rounded-r-2xl shadow-2xl"
               >
                  <p className="text-2xl md:text-5xl font-sans leading-relaxed text-center">
                    {currentQ.q.split('___')[0]}
                    <span className={`inline-block border-b-4 border-dashed min-w-[100px] text-center mx-2 ${status === 'CORRECT' ? 'text-neon-cyan border-neon-cyan' : status === 'WRONG' ? 'text-red-500 border-red-500' : 'border-gray-500 text-gray-500'}`}>
                       {status === 'CORRECT' ? currentQ.answer : status === 'WRONG' ? 'ERROR' : '___'}
                    </span>
                    {currentQ.q.split('___')[1]}
                  </p>
                  
                  {status === 'WRONG' && (
                     <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm mt-4 text-center font-mono uppercase tracking-widest"
                     >
                        Hint: {currentQ.hint}
                     </motion.p>
                  )}
               </motion.div>

               {/* Options */}
               <div className="flex flex-wrap gap-4 justify-center w-full">
                  {currentQ.options.map((opt) => (
                     <motion.button
                        key={opt}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOption(opt)}
                        onMouseEnter={playHover}
                        disabled={status !== 'IDLE'}
                        className={`px-8 py-4 text-xl md:text-3xl font-display font-bold rounded-xl border-2 transition-all min-w-[200px] ${
                           status === 'IDLE' 
                             ? 'border-white/20 hover:border-neon-cyan hover:bg-neon-cyan/10' 
                             : status === 'CORRECT' && opt === currentQ.answer 
                               ? 'border-neon-cyan bg-neon-cyan text-black' 
                               : 'border-white/10 opacity-50'
                        }`}
                     >
                        {opt}
                     </motion.button>
                  ))}
               </div>
            </div>
          )}
       </AnimatePresence>

       <TeacherNote content={`Answers for Level ${level}: ${data.questions.map(q => q.answer).join(', ')}`} />
    </div>
  );
};

export default GapFillLevel;