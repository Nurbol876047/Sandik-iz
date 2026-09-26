import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

import { Home } from './pages/Home';
import { Theory } from './pages/Theory';
import { Rules } from './pages/Rules';
import { Results } from './pages/Results';
import { About } from './pages/About';
import { Achievements } from './pages/Achievements';
import { SimulationsIndex } from './pages/Simulations/index';

import { Detective } from './pages/Simulations/Detective';
import { ExifPhoto as Exif } from './pages/Simulations/Exif';
import { PostOrNot } from './pages/Simulations/PostOrNot';
import { PasswordCheck } from './pages/Simulations/PasswordCheck';
import { FootprintSize } from './pages/Simulations/FootprintSize';
import { FakeOrTrue } from './pages/Simulations/FakeOrTrue';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="theory" element={<Theory />} />
        <Route path="rules" element={<Rules />} />
        <Route path="results" element={<Results />} />
        <Route path="about" element={<About />} />
        <Route path="achievements" element={<Achievements />} />
        
        <Route path="simulations">
          <Route index element={<SimulationsIndex />} />
          <Route path="detective" element={<Detective />} />
          <Route path="exif" element={<Exif />} />
          <Route path="post-or-not" element={<PostOrNot />} />
          <Route path="password" element={<PasswordCheck />} />
          <Route path="footprint-size" element={<FootprintSize />} />
          <Route path="fake-or-true" element={<FakeOrTrue />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
