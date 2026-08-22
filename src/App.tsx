import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import GiftVoucherPopup from './components/GiftVoucherPopup';
import Home from './pages/Home';
import Strelnica from './pages/Strelnica';
import Baliky from './pages/Baliky';
import Kurzy from './pages/Kurzy';
import TaktickyVycvik from './pages/TaktickyVycvik';
import Cennik from './pages/Cennik';
import Kontakt from './pages/Kontakt';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import BeginnerExperience from './pages/BeginnerExperience';
import ProExperience from './pages/ProExperience';
import ZbrojnyPreukaz from './pages/ZbrojnyPreukaz';
import SportClub from './pages/SportClub';
import Action from './pages/Action';
import DarcekovyPoukaz from './pages/DarcekovyPoukaz';
import Psychotesty from './pages/Psychotesty';
import ZakladnyKurz from './pages/ZakladnyKurz';
import TeoretickaPriprava from './pages/TeoretickaPriprava';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // 0.6 second loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <PageTracker />
        <LanguageSync />
        <ScrollToTop />
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loading" />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                {/* Redirect root to current language */}
                <Route path="/" element={<RootRedirect />} />
                
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
                </Route>
                <Route path="*" element={<NotFoundRedirect />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </Router>
    </LanguageProvider>
  );
}
