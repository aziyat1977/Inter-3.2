import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/ThemeContext';
import { SoundProvider } from './contexts/SoundContext';
import MainLayout from './layout/MainLayout';
import Welcome from './pages/Welcome';
import Intro from './pages/Intro';
import Identity from './pages/Identity';
import Detector from './pages/Detector';
import Cooler from './pages/Cooler';

// Skill Pages
import SkillIntro from './pages/Skills';
import Multitasking from './pages/skills/Multitasking';
import UnderPressure from './pages/skills/UnderPressure';
import ProblemSolving from './pages/skills/ProblemSolving';
import Reliable from './pages/skills/Reliable';
import SkillQuiz from './pages/skills/SkillQuiz';

// Grammar Pages
import GrammarIntro from './pages/grammar/GrammarIntro';
import Obligation from './pages/grammar/Obligation';
import ObligationPast from './pages/grammar/ObligationPast';
import Prohibition from './pages/grammar/Prohibition';
import ProhibitionPast from './pages/grammar/ProhibitionPast';
import Optional from './pages/grammar/Optional';
import OptionalPast from './pages/grammar/OptionalPast';
import CommonErrors from './pages/grammar/CommonErrors';

// Practice Pages
import PracticeIntro from './pages/practice/PracticeIntro';
import GapFillLevel from './pages/practice/GapFillLevel';
import GrammarQuizLevel from './pages/practice/GrammarQuizLevel';

const App: React.FC = () => {
  return (
    <AppProvider>
      <SoundProvider>
        <HashRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/intro" element={<Intro />} />
              <Route path="/identity" element={<Identity />} />
              
              {/* Skills Section */}
              <Route path="/skills/intro" element={<SkillIntro />} />
              <Route path="/skills/multitasking" element={<Multitasking />} />
              <Route path="/skills/pressure" element={<UnderPressure />} />
              <Route path="/skills/problem-solving" element={<ProblemSolving />} />
              <Route path="/skills/reliable" element={<Reliable />} />
              <Route path="/skills/quiz" element={<SkillQuiz />} />
              
              {/* Grammar Section */}
              <Route path="/grammar/intro" element={<GrammarIntro />} />
              <Route path="/grammar/obligation" element={<Obligation />} />
              <Route path="/grammar/obligation-past" element={<ObligationPast />} />
              <Route path="/grammar/prohibition" element={<Prohibition />} />
              <Route path="/grammar/prohibition-past" element={<ProhibitionPast />} />
              <Route path="/grammar/optional" element={<Optional />} />
              <Route path="/grammar/optional-past" element={<OptionalPast />} />
              <Route path="/grammar/error" element={<CommonErrors />} />

              {/* New Practice Section */}
              <Route path="/practice/intro" element={<PracticeIntro />} />
              <Route path="/practice/gap/:level" element={<GapFillLevel />} />
              <Route path="/practice/quiz/:level" element={<GrammarQuizLevel />} />

              <Route path="/interrogation" element={<Detector />} />
              <Route path="/cooler" element={<Cooler />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </SoundProvider>
    </AppProvider>
  );
};

export default App;