import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/shared/LoadingSpinner';

// Lazy-loaded pages — each becomes a separate chunk
const Home = lazy(() => import('./pages/Home'));
const SquadRoster = lazy(() => import('./pages/SquadRoster'));
const MatchCenter = lazy(() => import('./pages/MatchCenter'));
const TheDen = lazy(() => import('./pages/TheDen'));
const TeamHistory = lazy(() => import('./pages/TeamHistory'));
const FanZone = lazy(() => import('./pages/FanZone'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="squad" element={<SquadRoster />} />
            <Route path="matches" element={<MatchCenter />} />
            <Route path="den" element={<TheDen />} />
            <Route path="history" element={<TeamHistory />} />
            <Route path="fanzone" element={<FanZone />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
