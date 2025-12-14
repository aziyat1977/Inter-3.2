import React from 'react';
import { motion } from 'framer-motion';
import TeacherNote from '../components/TeacherNote';
import { Rocket } from 'lucide-react';

const Cooler: React.FC = () => {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="mb-8 p-6 bg-purple-500/20 rounded-full text-purple-400 border border-purple-500/50"
        >
            <Rocket size={64} />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">THE MARTIAN SURVIVOR</h2>
        
        <p className="max-w-xl text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Pass the ball. Say one rule about your old school on Mars using <br />
            <span className="text-neon-pink font-bold">HAD TO</span> or <span className="text-neon-pink font-bold">COULDN'T</span>.
        </p>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl w-full">
            <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 border border-purple-500/30 rounded-2xl bg-gradient-to-b from-purple-900/20 to-transparent"
            >
                <p className="text-sm text-purple-400 uppercase tracking-widest mb-4">Example 1</p>
                <p className="text-2xl font-display">"We <span className="text-white font-bold">had to</span> eat rocks for lunch."</p>
            </motion.div>

            <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 border border-purple-500/30 rounded-2xl bg-gradient-to-b from-purple-900/20 to-transparent"
            >
                <p className="text-sm text-purple-400 uppercase tracking-widest mb-4">Example 2</p>
                <p className="text-2xl font-display">"We <span className="text-white font-bold">couldn't</span> breathe outside."</p>
            </motion.div>
        </div>

        <TeacherNote 
            content="This is a quick fire round. Keep the pace high. If they hesitate for more than 3 seconds, they are 'ejected from the airlock' (out of the game)."
        />
    </div>
  );
};

export default Cooler;