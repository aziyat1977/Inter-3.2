import React from 'react';
import { motion } from 'framer-motion';
import TeacherNote from '../components/TeacherNote';
import { useSound } from '../contexts/SoundContext';
import { Target, Clock, Zap, Brain } from 'lucide-react';

const Skills: React.FC = () => {
  const { playHover } = useSound();
  const skills = [
    { icon: <Target size={40} />, title: "Multitasking", def: "Texting while doing homework.", color: "text-neon-cyan" },
    { icon: <Zap size={40} />, title: "Under Pressure", def: "Starting the project 5 mins before class.", color: "text-red-500" },
    { icon: <Brain size={40} />, title: "Problem Solving", def: "Turning the router off and on again.", color: "text-purple-400" },
    { icon: <Clock size={40} />, title: "Reliable", def: "Actually showing up on time.", color: "text-neon-yellow" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
       <div className="mb-16 text-right">
         <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-neon-cyan">
          02. SKILL DOWNLOAD
        </h2>
        <div className="h-1 w-32 bg-neon-cyan ml-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
            <motion.div
                key={index}
                onMouseEnter={playHover}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-6 p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all group"
            >
                <div className={`${skill.color} p-4 bg-white/5 rounded-full group-hover:scale-110 transition-transform`}>
                    {skill.icon}
                </div>
                <div>
                    <h3 className={`text-3xl font-bold mb-2 ${skill.color}`}>{skill.title}</h3>
                    <p className="text-lg opacity-60 font-mono">{skill.def}</p>
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