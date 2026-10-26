import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import GiftVoucherPopup from './components/GiftVoucherPopup';
import Home from './pages/Home';
const Strelnica = lazy(() => import('./pages/Strelnica'));
const Baliky = lazy(() => import('./pages/Baliky'));
const Kurzy = lazy(() => import('./pages/Kurzy'));
const TaktickyVycvik = lazy(() => import('./pages/TaktickyVycvik'));
const Cennik = lazy(() => import('./pages/Cennik'));
const Kontakt = lazy(() => import('./pages/Kontakt'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const BeginnerExperience = lazy(() => import('./pages/BeginnerExperience'));
const ProExperience = lazy(() => import('./pages/ProExperience'));
const ZbrojnyPreukaz = lazy(() => import('./pages/ZbrojnyPreukaz'));
const SportClub = lazy(() => import('./pages/SportClub'));
const Action = lazy(() => import('./pages/Action'));
const DarcekovyPoukaz = lazy(() => import('./pages/DarcekovyPoukaz'));
const Psychotesty = lazy(() => import('./pages/Psychotesty'));
const ZakladnyKurz = lazy(() => import('./pages/ZakladnyKurz'));
const TeoretickaPriprava = lazy(() => import('./pages/TeoretickaPriprava'));
const Teambuilding = lazy(() => import('./pages/Teambuilding'));
const Upload = lazy(() => import('./pages/Upload'));

import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function ActionRouteEnforcer() {
  const { lng } = useParams();
  if (!lng || !['sk', 'en', 'de', 'ru'].includes(lng)) {
    return <NotFoundRedirect />;
  }
  return <Action />;
}

function LanguageRouteEnforcer() {
  const { lng } = useParams();
  const location = useLocation();
  if (!lng || !['sk', 'en', 'de', 'ru'].includes(lng)) {
    return <NotFoundRedirect />;
  }
  return <Layout />;
}

function RootRedirect() {
  const { language } = useLanguage();
  return <Navigate to={`/${language}`} replace />;
}

function NotFoundRedirect() {
  const { language } = useLanguage();
  const location = useLocation();
  const path = location.pathname;
  if (path.startsWith('/sk/') || path.startsWith('/de/') || path.startsWith('/en/') || path.startsWith('/ru/')) {
    return <Navigate to={`/${language}`} replace />;
  }
  return <Navigate to={`/${language}${path}${location.search}`} replace />;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

function LanguageSync() {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const pathLang = location.pathname.split('/')[1];
    if (['sk', 'en', 'de', 'ru'].includes(pathLang)) {
      if (language !== pathLang) {
        setLanguage(pathLang as any);
      }
    }
  }, [location.pathname, language, setLanguage]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <PageTracker />
        <LanguageSync />
        <ScrollToTop />
              <Suspense fallback={<div className="min-h-screen bg-[var(--color-tactical)]" aria-busy="true" />}>
              <Routes>
                {/* Redirect root to current language */}
                <Route path="/" element={<RootRedirect />} />
                
                {/* Direct upload routes for the owner */}
                <Route path="/upload" element={<Upload />} />
                <Route path="/:lng/upload" element={<Upload />} />
                
                {/* Language prefixed routes */}
                <Route path="/:lng/action" element={<ActionRouteEnforcer />} />
                <Route path="/:lng" element={<LanguageRouteEnforcer />}>
                  <Route index element={<Home />} />
                  <Route path="strelnica" element={<Strelnica />} />
                  <Route path="strelecke-balicky" element={<Baliky />} />
                  <Route path="kurzy" element={<Kurzy />} />
                  <Route path="takticky-vycvik" element={<TaktickyVycvik />} />
                  <Route path="cennik" element={<Cennik />} />
                  <Route path="o-nas" element={<Navigate to="strelnica" replace />} />
                  <Route path="kontakt" element={<Kontakt />} />
                  <Route path="ochrana-osobnych-udajov" element={<PrivacyPolicy />} />
                  <Route path="obchodne-podmienky" element={<Terms />} />
                  <Route path="som-tu-prvykrat" element={<BeginnerExperience />} />
                  <Route path="som-profesional" element={<ProExperience />} />
                  <Route path="zbrojny-preukaz" element={<ZbrojnyPreukaz />} />
                  <Route path="sportovy-klub-hdi" element={<SportClub />} />
                  <Route path="darcekovy-poukaz" element={<DarcekovyPoukaz />} />
                  <Route path="psychotesty" element={<Psychotesty />} />
                  <Route path="zakladny-kurz" element={<ZakladnyKurz />} />
                  <Route path="teoreticka-priprava" element={<TeoretickaPriprava />} />
                  <Route path="teambuilding" element={<Teambuilding />} />
                </Route>
                <Route path="*" element={<NotFoundRedirect />} />
              </Routes>
              </Suspense>
      </Router>
    </LanguageProvider>
  );
}
