import { BrowserRouter } from 'react-router-dom';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import RootLayout from './RootLayout.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <RootLayout />
        </MotionConfig>
      </LazyMotion>
    </BrowserRouter>
  );
}
