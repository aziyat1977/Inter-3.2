import React from 'react';
import { motion } from 'framer-motion';
import TeacherNote from '../components/TeacherNote';
import { useSound } from '../contexts/SoundContext';
import Translator from '../components/Translator';
import { Target, Clock, Zap, Brain } from 'lucide-react';

const Skills: React.FC = () => {
  const { playHover } = useSound();
  const skills = [
    { 
        icon: <Target size="5vmin" />, 
        title: "Multitasking", 
        def: "Texting while doing homework.", 
        color: "text-neon-cyan",
        ru: "Многозадачность",
        uz: "Ko'p vazifalik"
    },
    { 
        icon: <Zap size="5vmin" />, 
        title: "Under Pressure", 
        def: "Starting the project 5 mins before class.", 
        color: "text-red-500",
        ru: "Под давлением",
        uz: "Bosim ostida"
    },
    { 
        icon: <Brain size="5vmin" />, 
        title: "Problem Solving", 
        def: "Turning the router off and on again.", 
        color: "text-purple-400",
        ru: "Решение проблем",
        uz: "Muammolarni hal qilish"
    },
    { 
        icon: <Clock size="5vmin" />, 
        title: "Reliable", 
        def: "Actually showing up on time.", 
        color: "text-neon-yellow",
        ru: "Надёжный",
        uz: "Ishonchli"
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-4 md:px-12">
       <div className="mb-8 md:mb-12 text-right">
         <h2 className="text-[4vmin] font-display font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-neon-cyan">
          02. SKILL DOWNLOAD
        </h2>
        <div className="h-1 w-[20vw] bg-neon-cyan ml-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-7xl mx-auto">
        {skills.map((skill, index) => (
            <motion.div
                key={index}
                onMouseEnter={playHover}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 md:gap-6 p-4 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all group"
            >
                <div className={`${skill.color} p-4 bg-white/5 rounded-full group-hover:scale-110 transition-transform`}>
                    {skill.icon}
                </div>
                <div>
                    <Translator 
                        en={<h3 className={`text-[3vmin] font-bold mb-1 ${skill.color}`}>{skill.title}</h3>}
                        ru={skill.ru}
                        uz={skill.uz}
                        className="items-start"
                    />
                    <p className="text-[2vmin] opacity-60 font-mono">{skill.def}</p>
                </div>
            </motion.div>
        ))}
      </div>

       <TeacherNote 
        content={
          <div>
            <p>Drill pronunciation, specifically stress patterns:</p>
            <ul className="list-disc pl-4 mt-2 font-mono text-xs">
                <li>Multi-TAS-king</li>
                <li>un-der-PRE-ssure</li>
                <li>PRO-blem sol-ving</li>
                <li>re-LI-a-ble</li>
            </ul>
          </div>
        }
      />
    </div>
  );
};

export default Skills;