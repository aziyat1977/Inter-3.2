import React from 'react';
import AutoFitText from '../../components/AutoFitText';
import TeacherNote from '../../components/TeacherNote';
import { AlertTriangle } from 'lucide-react';

const CommonErrors: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center bg-red-900/10">
      <div className="text-red-500 mb-8 animate-pulse">
        <AlertTriangle size="10vmin" />
      </div>

      <AutoFitText maxSize="10vw" className="text-red-500 mb-12">SYSTEM ERROR</AutoFitText>

      <div className="flex flex-col gap-8">
        <div className="relative">
            <p className="text-[5vmin] text-gray-400 line-through decoration-red-500 decoration-4">I musted go</p>
            <p className="text-[3vmin] text-green-400 font-bold mt-2">I had to go</p>
        </div>

        <div className="relative">
            <p className="text-[5vmin] text-gray-400 line-through decoration-red-500 decoration-4">I didn't must</p>
            <p className="text-[3vmin] text-green-400 font-bold mt-2">I didn't have to / I couldn't</p>
        </div>
      </div>

      <TeacherNote content="Drill this screen. Make them shout 'ERROR' if they hear 'Musted'." />
    </div>
  );
};

export default CommonErrors;