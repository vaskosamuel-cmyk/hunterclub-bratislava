import { Link as RouterLink, LinkProps, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import WarningModal from './WarningModal';
import { useLanguage } from '../contexts/LanguageContext';

export default function Link({ to, onClick, ...props }: LinkProps) {
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const protectedRoutes = ['/cennik', '/som-profesional'];
  const isProtected = typeof to === 'string' && protectedRoutes.includes(to);

  // Automatically prepend language to absolute paths
  let resolvedTo = to;
  if (typeof to === 'string' && to.startsWith('/')) {
    resolvedTo = `/${language}${to === '/' ? '' : to}`;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isProtected) {
      const hasConfirmed = sessionStorage.getItem('zp_warning_confirmed');
      if (hasConfirmed !== 'true') {
        e.preventDefault();
        setShowWarning(true);
        return;
      }
    }
    if (onClick) {
      onClick(e);
    }
  };

  const handleConfirm = () => {
    sessionStorage.setItem('zp_warning_confirmed', 'true');
    setShowWarning(false);
    navigate(resolvedTo as string);
  };

  return (
    <>
      <RouterLink to={resolvedTo} onClick={handleClick} {...props} />
      <WarningModal 
        isOpen={showWarning} 
        onConfirm={handleConfirm} 
        onCancel={() => setShowWarning(false)} 
      />
    </>
  );
}
