import React from 'react';
import { motion } from 'framer-motion';
import TeacherNote from '../components/TeacherNote';
import { AlertTriangle } from 'lucide-react';

const Grammar: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-8 md:mb-12">
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-4 md:mb-6 text-white">03. THE RULES</h2>
            <p className="text-base md:text-xl max-w-2xl mx-auto opacity-70">
                The verb "MUST" is a time traveler. But when it travels to the past, it changes its face completely.
            </p>
        </div>

        {/* Scrollable Container for Table */}
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl overflow-x-auto"
        >
            <div className="min-w-[600px]"> {/* Ensures table has minimum width to trigger scroll */}
                <div className="grid grid-cols-3 text-center border-b border-white/10">
                    <div className="p-4 md:p-8 font-bold text-gray-400 tracking-[0.2em] text-xs md:text-base">FUNCTION</div>
                    <div className="p-4 md:p-8 font-bold text-neon-cyan tracking-[0.2em] bg-neon-cyan/5 text-xs md:text-base">PRESENT (NOW)</div>
                    <div className="p-4 md:p-8 font-bold text-neon-pink tracking-[0.2em] bg-neon-pink/5 text-xs md:text-base">PAST (THEN)</div>
                </div>

                {/* Row 1 */}
                <div className="grid grid-cols-3 text-center border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <div className="p-6 md:p-8 flex flex-col justify-center items-center">
                        <span className="font-bold text-sm md:text-xl">OBLIGATION</span>
                        <span className="text-[10px] md:text-xs text-gray-500 mt-1 uppercase">No Choice</span>
                    </div>
                    <div className="p-6 md:p-8 flex items-center justify-center text-sm md:text-2xl">Must / Have to</div>
                    <div className="p-6 md:p-8 flex items-center justify-center text-lg md:text-4xl font-bold text-neon-pink group-hover:scale-110 transition-transform">HAD TO</div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-3 text-center border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <div className="p-6 md:p-8 flex flex-col justify-center items-center">
                        <span className="font-bold text-sm md:text-xl">PROHIBITED</span>
                        <span className="text-[10px] md:text-xs text-gray-500 mt-1 uppercase">Forbidden</span>
                    </div>
                    <div className="p-6 md:p-8 flex items-center justify-center text-sm md:text-2xl">Mustn't</div>
                    <div className="p-6 md:p-8 flex items-center justify-center text-lg md:text-4xl font-bold text-neon-pink group-hover:scale-110 transition-transform">COULDN'T</div>
                </div>

                 {/* Row 3 */}
                 <div className="grid grid-cols-3 text-center hover:bg-white/5 transition-colors group">
                    <div className="p-6 md:p-8 flex flex-col justify-center items-center">
                        <span className="font-bold text-sm md:text-xl">OPTIONAL</span>
                        <span className="text-[10px] md:text-xs text-gray-500 mt-1 uppercase">Not Necessary</span>
                    </div>
                    <div className="p-6 md:p-8 flex items-center justify-center text-sm md:text-2xl">Don't have to</div>
                    <div className="p-6 md:p-8 flex items-center justify-center text-lg md:text-4xl font-bold text-neon-pink group-hover:scale-110 transition-transform">DIDN'T HAVE TO</div>
                </div>
            </div>
        </motion.div>

        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 border border-red-500/30 bg-red-900/10 rounded-xl flex items-center gap-6 max-w-2xl mx-4"
        >
            <div className="p-4 bg-red-500/20 rounded-full text-red-500 animate-pulse hidden md:block">
                <AlertTriangle size={32} />
            </div>
            <div>
                <h4 className="text-red-500 font-bold mb-1 tracking-widest text-sm md:text-base">SYSTEM ERROR: INVALID SYNTAX</h4>
                <p className="text-gray-300 text-sm md:text-base">
                    <span className="line-through decoration-red-500 decoration-2 opacity-50 mr-4 block md:inline">I musted go</span>
                    <span className="line-through decoration-red-500 decoration-2 opacity-50 block md:inline">I didn't must</span>
                </p>
            </div>
        </motion.div>

        <TeacherNote 
            content={
                <p>Concept Check: "If I say 'I didn't have to go', did I go?" (Maybe/No). <br/> "If I say 'I couldn't go', did I go?" (No). <br/>Remind them that <strong>Must</strong> has no past form.</p>
            }
        />
    </div>
  );
};

export default Grammar;